using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Notes_ESPI_en_mieux.Entities;

namespace Notes_ESPI_en_mieux.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly NotesEpsiEnMieuxContext _dbContext;

        public AuthController(NotesEpsiEnMieuxContext dbContext)
        {
            _dbContext = dbContext;
        }

        [HttpPost("login")]
        public IActionResult Login([FromBody] UserLogin credentials)
        {
            var user = GetUser(credentials);

            if (user != null)
            {
                return Ok(new { Message = "Authentication successful.", User = user });
            }
            else
            {
                return Unauthorized("Invalid username or password.");
            }
        }

        private User GetUser(UserLogin credentials)
        {
            return _dbContext.Users.SingleOrDefault(u => u.Username == credentials.Username && u.Password == credentials.Password);
        }
    }
}
