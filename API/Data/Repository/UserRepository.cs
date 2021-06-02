using API.Data.Repository.interfaces;
using API.DTOs;
using API.Entities;
using API.Helpers;
using API.Utility;
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

        public async Task<PagedList<MemberDto>> GetMembersAsyc(UserParams userParams)
        {
            // we don't need to have Include since we are using projection
            // because the entityframework is going to workout the correct query to join the database and get the proper information

            // old code
            //return await _context.Users.ProjectTo<MemberDto>(_mapper.ConfigurationProvider)
            //    .ToListAsync();


            // new code

            // we remove ToListAsync()
            // when we are going to get entity from entityframewrok, entityframework is going to apply
            // tracking to this entities
            // since we are going to read from and not going to do anything we specify as NoTracking
            // this turns off Tracking in the entityframework. all we need to do is to read this

            // AsQueryable gives us the opportunity to filter by
            var query = _context.Users.AsQueryable();

            // we are filtering our query here
            if (!string.IsNullOrEmpty(userParams.Badge))
            {
                query = userParams.Badge switch
                {
                    SD.BadgePink => query.Where(u => u.Badge == SD.BadgePink),
                    SD.BadgePurple => query.Where(u => u.Badge == SD.BadgePurple),
                    SD.BadgeRed => query.Where(u => u.Badge == SD.BadgeRed),
                    SD.BadgeGreen => query.Where(u => u.Badge == SD.BadgeGreen),
                    SD.BadgeBrown => query.Where(u => u.Badge == SD.BadgeBrown),
                    SD.BadgeBlue => query.Where(u => u.Badge == SD.BadgeBlue),
                    SD.BadgeGrey => query.Where(u => u.Badge == SD.BadgeGrey),
                    SD.BadgeOrange => query.Where(u => u.Badge == SD.BadgeOrange),
                    SD.BadgeDiamond => query.Where(u => u.Badge == SD.BadgeDiamond),
                    SD.BadgeGold => query.Where(u => u.Badge == SD.BadgeGold),
                    _ => query
                };
            }

            if (!string.IsNullOrEmpty(userParams.OrderBy))
            {
                query = userParams.OrderBy switch
                {
                    SD.OrderByHokmScore => query.OrderByDescending(u => u.HokmScore),
                    SD.OrderByShelemScore => query.OrderByDescending(u => u.ShelemScore),
                    SD.OrderByWins => query.OrderByDescending(u => u.GamesWon),
                    SD.OrderByLoses => query.OrderByDescending(u => u.GamesLost),
                    SD.OrderByLefts => query.OrderByDescending(u => u.GamesLeft),
                    _ => query
                };
            }

            if (!string.IsNullOrEmpty(userParams.Country))
            {
                query = query.Where(u => u.Country == userParams.Country);
            }

            if (!string.IsNullOrEmpty(userParams.SearchForName))
            {
                query = query.Where(u => u.Name.ToLower().Contains(userParams.SearchForName));
            }

            // after we built our expression tree then we project query from AppUser to MemberDto
            // so now we return PagedList and we pass in MemberDto as type
            // we call the static methor inside that and we pass in query, PageNumber and PageSize
            // we're still not executing anything here in this method, because that's being taken care
            // of inside CreateAsync method
            return await PagedList<MemberDto>.CreateAsync(
                query.ProjectTo<MemberDto>(_mapper.ConfigurationProvider).AsNoTracking(),
                userParams.PageNumber, userParams.PageSize);
        }

        public async Task<AppUser> GetUserByIdAsync(int id)
        {
            return await _context.Users.FindAsync(id);
        }

        public async Task<AppUser> GetUserByUsernameAsync(string username)
        {
            return await _context.Users.Include(p => p.Photos).SingleOrDefaultAsync(x => x.UserName.ToLower() == username.ToLower());
        }

        public async Task<AppUser> GetUserForUserUpdateAsync(string username)
        {
            return await _context.Users.SingleOrDefaultAsync(x => x.UserName.ToLower() == username.ToLower());
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

        public async Task<UserUpdateDto> GetUserForUpdate(string username)
        {
            var user = await _context.Users.SingleOrDefaultAsync(u => u.UserName.ToLower() == username.ToLower());
            return (user == null) ? null : _mapper.Map<UserUpdateDto>(user);
        }


        public async Task<bool> NameExistsAsync(string newName)
        {
            return await _context.Users.AnyAsync(x => x.Name.ToLower() == newName.ToLower());
        }
    }
}
