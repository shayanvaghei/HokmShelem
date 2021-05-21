using API.Data;
using API.Data.Repository.interfaces;
using API.DTOs;
using API.Entities;
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

        public UsersController(IUserRepository userRepository, IMapper mapper)
        {
            _userRepository = userRepository;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<MemberDto>>> GetUsers()
        {
            var users = await _userRepository.GetMembersAsyc();
            return Ok(users);
        }
        [HttpGet("{username}")]
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
                    return BadRequest(string.Format("Error, {0} aleady exists, try other names", userUpdateDto.Name));
                }
            }

            _mapper.Map(userUpdateDto, user);
            _userRepository.Update(user);

            // true
            if (await _userRepository.SaveAllAsync())
                return NoContent();

            return BadRequest("Failed to update user profile");
        }
    }
}
