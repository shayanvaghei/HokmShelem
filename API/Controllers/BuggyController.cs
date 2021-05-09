using API.Data;
using API.DTOs;
using API.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Controllers
{
    public class BuggyController : BaseApiController
    {
        private readonly StoreContext _context;

        public BuggyController(StoreContext context)
        {
            _context = context;
        }

        [Authorize]
        [HttpGet("auth")]
        public ActionResult<string> GetSecret()
        {
            return "super secret text";
        }

        [HttpGet("not-found")]
        public ActionResult<AppUser> GetNotFound()
        {
            var fetchObj = _context.Users.Find(-1);
            if (fetchObj == null) return NotFound();

            return Ok(fetchObj);
        }

        [HttpGet("bad-request")]
        public ActionResult<string> GetBadRequest()
        {
            return BadRequest("This is a bad request");
        }

        [HttpPost("register")]
        public ActionResult<AppUser> Register(RegisterDto user)
        {
            return new AppUser();
        }

        [HttpGet("server-error")]
        public ActionResult<string> GetServerError()
        {
            var fetchObj = _context.Users.Find(-1);
            var toString = fetchObj.ToString(); // throws null reference exception
            return toString;
        }
    }
}
