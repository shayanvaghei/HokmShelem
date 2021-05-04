using API.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Services.IServices
{
    public interface ITokenService
    {
        string CreateToken(AppUser user);
    }
}
