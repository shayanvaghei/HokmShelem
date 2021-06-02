using API.Data.Repository.interfaces;
using API.Extensions;
using Microsoft.AspNetCore.Mvc.Filters;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

// we manually import to get use of "GetService"
using Microsoft.Extensions.DependencyInjection;

namespace API.Helpers
{
    // we need to add this as a service to make use of this
    public class LogUserActivity : IAsyncActionFilter
    {
        // context of the action that is executing, whats going to happen next after action is executed
        public async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
        {
            // we can access to Controller, ModelState Result with context

            // after action is executed
            var resultContext = await next();

            // if user has not authenticated then we simply return and do nothing
            if (!resultContext.HttpContext.User.Identity.IsAuthenticated)
                return;

            // if user is authenticated then we update last active of the user
            var userId = resultContext.HttpContext.User.GetUserId();

            // we need to access to our repository
            var repo = resultContext.HttpContext.RequestServices.GetService<IUserRepository>();

            var user = await repo.GetUserByIdAsync(userId);

            user.LastActive = DateTime.Now;
            await repo.SaveAllAsync();
        }
    }
}
