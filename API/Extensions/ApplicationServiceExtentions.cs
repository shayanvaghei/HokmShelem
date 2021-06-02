using API.Data;
using API.Data.Repository;
using API.Data.Repository.interfaces;
using API.Helpers;
using API.Services;
using API.Services.IServices;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace API.Extentions
{
    public static class ApplicationServiceExtentions
    {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services, IConfiguration config)
        {
            // configuring CloudinarySettings
            services.Configure<CloudinarySettings>(config.GetSection("CloudinarySettings"));
            services.AddScoped<ITokenService, TokenService>();
            services.AddScoped<IUserRepository, UserRepository>();
            services.AddScoped<IPhotoService, PhotoService>();
            // adding LogUserActivity into our service for updating last active of the user
            services.AddScoped<LogUserActivity>();
            // we need to make the automapper as dependency injection so we add the services here
            // inside the parameter goes and find the profile that we have created
            services.AddAutoMapper(typeof(AutoMapperProfiles).Assembly);
            services.AddDbContext<StoreContext>(options =>
            {
                options.UseSqlServer(config.GetConnectionString("DefaultConnection"));
            });

            return services;
        }
    }
}
