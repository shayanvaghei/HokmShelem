using API.Data;
using API.Data.Repository.interfaces;
using API.DTOs;
using API.Entities;
using API.Extensions;
using API.Helpers;
using API.Services.IServices;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace API.Controllers
{
    [Authorize]
    public class UsersController : BaseApiController
    {
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;
        private readonly IPhotoService _photoService;
        private readonly StoreContext _context;

        public UsersController(IUserRepository userRepository, IMapper mapper, IPhotoService photoService, StoreContext context)
        {
            _userRepository = userRepository;
            _mapper = mapper;
            _photoService = photoService;
            _context = context;
        }

        [HttpGet]
        // [FromQuery] this means that we are taking the parameters from the query string
        public async Task<ActionResult<IEnumerable<MemberDto>>> GetUsers([FromQuery] UserParams userParams)
        {
            //var userss = await _context.Users.Include(x => x.Photos).ContainsAsync(u => u.n)

            // now our users is of type PagedList of MemberDto
            var users = await _userRepository.GetMembersAsyc(userParams);

            // we always have access to Http Response inside our controller
            // we are calling our static method
            Response.AddPaginationHeader(users.CurrentPage, users.PageSize, users.TotalCount, users.TotalPages);

            return Ok(users);
        }
        [HttpGet("{username}", Name = "GetUser")]
        public async Task<ActionResult<MemberDto>> GetUser(string username)
        {
            return await _userRepository.GetMemberAsync(username);
        }

        [HttpGet("user-edit-profile/{username}")]
        public async Task<ActionResult<UserUpdateDto>> GetUserForUpdate(string username)
        {
            return  await _userRepository.GetUserForUpdate(username);
        }

        [HttpPut("user-edit-profile")]
        public async Task<ActionResult> UpdateUser(UserUpdateDto userUpdateDto)
        {
            var username = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (username == null)
            {
                return BadRequest("Invalid username");
            }

            var user = await _userRepository.GetUserByUsernameAsync(username);

            if (user.Name != userUpdateDto.Name)
            {
                if (await _userRepository.NameExistsAsync(userUpdateDto.Name))
                {
                    return BadRequest(string.Format("{0} is taken, try other names", userUpdateDto.Name));
                }
            }

            _mapper.Map(userUpdateDto, user);
            _userRepository.Update(user);

            // true
            if (await _userRepository.SaveAllAsync())
                return NoContent();

            return BadRequest("Failed to update user profile");
        }

        [HttpPost("add-photo")]
        public async Task<ActionResult<PhotoDto>> AddPhoto(IFormFile file)
        {
            // retreives the user
            var user = await _userRepository.GetUserByUsernameAsync(User.GetUsername());

            if (user.Photos.Count > 6)
            {
                return BadRequest((string.Format("You can have up to {0} photos only", 6)));
            }

            // adding photo to Cloudinary
            var result = await _photoService.AddPhotoAsync(file);

            // if fails then return BadRequest
            if (result.Error != null)
                return BadRequest(result.Error.Message);

            // initializing Photo object
            var photo = new Photo
            {
                Url = result.SecureUrl.AbsoluteUri,
                PublicId = result.PublicId
            };

            // setting the current photo as user profile if there are no other photos for that user
            if (user.Photos.Count == 0)
            {
                photo.IsMain = true;
            }

            // adding the photo of the user to db
            user.Photos.Add(photo);

            if (await _userRepository.SaveAllAsync())
            {
                // the following returns 200, but we want to return 201 for creation
                // return _mapper.Map<PhotoDto>(photo);


                // now we return a 201
                // we are telling the user in the header
                // wher to get the photo
                // which in this case is https://localhost:5003/api/Users/lisa
                // GetUser api call and passing username to that

                // this shows the user where to head after successfully completion of this API call in the headers
                // WHY API
                return CreatedAtRoute("GetUser", new { username = user.UserName }, _mapper.Map<PhotoDto>(photo));
            }

            return BadRequest("Problem adding photo");
        }

        [HttpPut("set-main-photo/{photoId}")]
        public async Task<ActionResult> SetMainPhoto(int photoId)
        {
            var user = await _userRepository.GetUserByUsernameAsync(User.GetUsername());

            // this is not an asyn method because we have our user from memory
            // and we are not taking that from the database
            // retreiving photo
            var photo = user.Photos.FirstOrDefault(x => x.Id == photoId);

            if (photo.IsMain) return BadRequest("This is already your main photo!");

            // fetching main photo of the user
            var currentMainPhoto = user.Photos.FirstOrDefault(x => x.IsMain);

            // setting the current main photo as false
            if (currentMainPhoto != null) 
                currentMainPhoto.IsMain = false;

            photo.IsMain = true;

            if (await _userRepository.SaveAllAsync())
                return NoContent();

            return BadRequest("Failed to set main photo");
        }

        [HttpDelete("delete-photo/{photoId}")]
        public async Task<ActionResult> DeletePhoto(int photoId)
        {
            var user = await _userRepository.GetUserByUsernameAsync(User.GetUsername());

            var photo = user.Photos.SingleOrDefault(p => p.Id == photoId);
            if (photo == null)
                return NotFound();

            // delete the photo from Cloudinary
            if (photo.PublicId != null)
            {
                var result = await _photoService.DeletePhotoAsync(photo.PublicId);
                // if it fails deleting it from Cloudinary
                if (result.Error != null)
                    return BadRequest(result.Error.Message);
            }

            user.Photos.Remove(photo);
            if (await _userRepository.SaveAllAsync())
                return Ok();

            return BadRequest("Failed to delete photo");
        }

        [HttpGet("get-user-mainPhotoUrl")]
        public async Task<ActionResult<PhotoDto>> GetUserProfileUrl()
        {
            var user = await _userRepository.GetUserByUsernameAsync(User.GetUsername());

            if (user != null)
            {
                var mainPhoto = user.Photos.SingleOrDefault(p => p.IsMain);

                if (mainPhoto != null)
                {
                    return _mapper.Map<PhotoDto>(mainPhoto);
                }

                return null;
            }
            return BadRequest("User not found");
        }
    }
}
