using API.Data.Repository.interfaces;
using API.DTOs;
using API.Entities;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Data.Repository
{
    public class UserRepository : IUserRepository
    {
        private readonly StoreContext _context;
        private readonly IMapper _mapper;

        public UserRepository(StoreContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        public async Task<MemberDto> GetMemberAsync(string username)
        {
            // manually populating MemberDto based on AppUser withoud getting helped from automapper
            //var memberDto = await _context.Users.Where(x => x.UserName == username)
            //    .Select(user => new MemberDto
            //    {
            //        Id = user.Id,
            //        Username = user.UserName
            //    }).SingleOrDefaultAsync();


            // since we dont want to include extra elements such as password hash and password salt in our select statement

            return await _context.Users
                .Where(x => x.UserName == username.ToLower())
                // we project to MemberDto
                // with ConfigurationProvider it is going to get the configuration we provided in our AutoMapperProfiles class
                .ProjectTo<MemberDto>(_mapper.ConfigurationProvider)
                .SingleOrDefaultAsync();
        }

        public async Task<IEnumerable<MemberDto>> GetMembersAsyc()
        {
            // we don't need to have Include since we are using projection
            // because the entityframework is going to workout the correct query to join the database and get the proper information
            return await _context.Users.ProjectTo<MemberDto>(_mapper.ConfigurationProvider)
                .ToListAsync();
        }

        public async Task<AppUser> GetUserByIdAsync(int id)
        {
            return await _context.Users.FindAsync(id);
        }

        public async Task<AppUser> GetUserByUsername(string username)
        {
            return await _context.Users.Include(p => p.Photos).SingleOrDefaultAsync(x => x.UserName.ToLower() == username.ToLower());
        }

        public async Task<IEnumerable<AppUser>> GetUsersAsync()
        {
            return await _context.Users.Include(p => p.Photos).ToListAsync();
        }

        public async Task<bool> SaveAllAsync()
        {
            // returns false if no changes
            // returns true if any changes
            return await _context.SaveChangesAsync() > 0; // we are making sure that greater than 0 changes have been saved into our database
        }

        public void Update(AppUser user)
        {
            // this will add a flag to the entity to indicate that was modified
            _context.Entry(user).State = EntityState.Modified;
        }
    }
}
