using API.Data;
using API.Data.Repository.interfaces;
using API.DTOs;
using API.Entities;
using API.Services.IServices;
using API.Utility;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace API.Controllers
{
    public class AccountController : BaseApiController
    {
        private readonly StoreContext _context;
        private readonly ITokenService _tokenService;
        private readonly IMapper _mapper;
        private readonly IUserRepository _userRepository;

        public AccountController(StoreContext context, ITokenService tokenService, IMapper mapper, IUserRepository userRepository)
        {
            _context = context;
            _tokenService = tokenService;
            _mapper = mapper;
            _userRepository = userRepository;
        }

        [HttpPost("register")]
        public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto)
        {
            if (await UserExists(registerDto.Username))
                return BadRequest("Username is taken");

            if (await _userRepository.NameExistsAsync(registerDto.Name))
            {
                return BadRequest(string.Format("{0} is taken, try other names", registerDto.Name));
            }

            var user = _mapper.Map<AppUser>(registerDto);

            // using will dispose correctely after we use
            // we garantee as soon as we finish this will be disposed because the root base class is from IDesposable
            using var hmac = new HMACSHA512();

            user.UserName = registerDto.Username.ToLower();
            user.PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(registerDto.Password));
            user.PasswordSalt = hmac.Key;

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return new UserDto
            {
                Username = user.UserName,
                Token = _tokenService.CreateToken(user),
                Name = user.Name
            };
        }

        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
        {
            var user = await _context.Users.Include(p => p.Photos).SingleOrDefaultAsync(x => x.UserName == loginDto.Username.ToLower());

            if (user == null) return Unauthorized("Invalid username");

            user.Status = SD.UserStatus_Online;
            await _context.SaveChangesAsync();

            using var hmac = new HMACSHA512(user.PasswordSalt);

            var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(loginDto.Password));

            for (int i = 0; i < computedHash.Length; i++)
            {
                if (computedHash[i] != user.PasswordHash[i]) return Unauthorized("Invalid password");
            }

            return new UserDto
            {
                Username = user.UserName,
                Token = _tokenService.CreateToken(user),
                PhotoUrl = user.Photos.FirstOrDefault(x => x.IsMain)?.Url,
                Name = user.Name
            };
        }

        private async Task<bool> UserExists(string username)
        {
            return await _context.Users.AnyAsync(x => x.UserName == username.ToLower());
        }

        [Authorize]
        [HttpPost("logout")]
        public async Task<ActionResult<LogoutDto>> Logout(LogoutDto logoutDto)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.UserName.ToLower() == logoutDto.Username.ToLower());
            if (user == null)
                return BadRequest("Not logged in!");

            user.Status = SD.UserStatus_Offline;
            await _context.SaveChangesAsync();

            return new LogoutDto
            {
                Username = user.UserName
            };
        }


    }
}
