using API.ErrorHandling.Errors;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text.Json;
using System.Threading.Tasks;

namespace API.ErrorHandling.Middleware
{
    public class ExceptionMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly ILogger<ExceptionMiddleware> _logger;
        private readonly IHostEnvironment _env;
        // RequestDelegate is whats coming next in our pipeline
        // ILogger lets us to log the exeptions to the terminal, we give our own class to that ILogger
        // IHostEnvironment lets us to check what environment we are running at either development or production
        public ExceptionMiddleware(RequestDelegate next, ILogger<ExceptionMiddleware> logger, IHostEnvironment env)
        {
            _next = next;
            _logger = logger;
            _env = env;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            try
            {
                // get our context and pass it to the next piece of our middleware
                // this piece of middleware can stay at the very top of our middleware
                // and anything below this, if we have 17 middleware below this
                // all are going to be invoke as next at some point
                // and if any of them gets any exeptions, they are going to throw the exeption up and up and up
                // until we handle that exception
                // and because our exeption middleware is going to be at the top of other middlewares then catch the
                // exceptions inside here
                await _next(context);
            }
            catch (Exception ex)
            {
                // if we dont write the following statement, then the exception will be silent in our terminal
                _logger.LogError(ex, ex.Message);
                // we are writing out the exeption to the response
                context.Response.ContentType = "application/json";
                context.Response.StatusCode = (int)HttpStatusCode.InternalServerError; // efectively it is going to be 500 status code

                var response = _env.IsDevelopment()
                    ? new ApiException(context.Response.StatusCode, ex.Message, ex.StackTrace?.ToString()) // if it is in development environment
                    : new ApiException(context.Response.StatusCode, "Internale Server Error"); // if it is in production environment we dont say much

                // this is going to ensure that our response just goes back as normal json formatted response in camelcase
                var options = new JsonSerializerOptions { PropertyNamingPolicy = JsonNamingPolicy.CamelCase };

                // we serialize the response we created earlier and pass in the options which are in camelcase
                var json = JsonSerializer.Serialize(response, options);

                await context.Response.WriteAsync(json);
            }
        }
    }
}
