using API.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

namespace API.Data.SeedDataBase
{
    public class Seed
    {
        public static async Task SeedUsers(StoreContext context)
        {
            // check if we have any users then don execute the seed
            if (await context.Users.AnyAsync()) return;

            // if we continue then that means we dont have any use in the database
            var userData = await System.IO.File.ReadAllTextAsync("Data/SeedDataBase/SeedUser.json");

            // we user JsonSerilizer because we want to get json out of this
            var users = JsonSerializer.Deserialize<List<AppUser>>(userData);

            // we are going to add them into the database
            foreach (var user in users)
            {
                using var hmac = new HMACSHA512();

                user.UserName = user.UserName.ToLower();
                user.PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes("Pa$$w0rd"));
                user.PasswordSalt = hmac.Key;

                context.Users.Add(user);
            }

            await context.SaveChangesAsync();
        }
    }
}
