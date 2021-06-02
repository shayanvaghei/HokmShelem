using API.DTOs;
using API.Entities;
using API.Helpers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Data.Repository.interfaces
{
    public interface IUserRepository
    {
        void Update(AppUser user);
        Task<bool> SaveAllAsync();
        Task<IEnumerable<AppUser>> GetUsersAsync();
        Task<AppUser> GetUserByIdAsync(int id);
        Task<AppUser> GetUserByUsernameAsync(string username);

        Task<AppUser> GetUserForUserUpdateAsync(string username);

        // for optimization we create the following two methods
        // instead of returning AppUser we are returning MemberDto
        // now instead of returning IEnumerable we return PagedList which is derived from
        // List of type T
        // this method now takes userParams
        Task<PagedList<MemberDto>> GetMembersAsyc(UserParams userParams);
        Task<MemberDto> GetMemberAsync(string username);
        Task<UserUpdateDto> GetUserForUpdate(string username);

        Task<bool> NameExistsAsync(string newName);
    }
}
