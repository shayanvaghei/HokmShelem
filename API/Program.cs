using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.Data.SeedDataBase;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

namespace API
{
    public class Program
    {
        // everything here happens before the application is getting started
        // when we are in the main method, we are outside of our middleware
        // so we don't have access to any of the exception handler here
        public static async Task Main(string[] args)
        {
            var host = CreateHostBuilder(args).Build();
            // we are creating scope for the services that we are going to use here
            using var scope = host.Services.CreateScope();

            var services = scope.ServiceProvider;

            // so we use try catch block to catch any exception happens during our seeding the database
            try
            {
                var context = services.GetRequiredService<StoreContext>();
                // this applies any pending migration to the database or create the database if it is not existed
                await context.Database.MigrateAsync();
                // we are calling our own created method called Seed to seed the database
                await Seed.SeedUsers(context);
            }
            catch(Exception ex)
            {
                // getting logger
                var logger = services.GetRequiredService<ILogger<Program>>();
                logger.LogError(ex, "An error occured during migration");
            }

            // running our host
            await host.RunAsync();
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseStartup<Startup>();
                });
    }
}
