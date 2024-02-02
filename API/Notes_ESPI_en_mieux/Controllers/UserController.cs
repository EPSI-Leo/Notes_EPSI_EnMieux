using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Notes_ESPI_en_mieux.Entities; 

namespace Notes_ESPI_en_mieux.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly NotesEpsiEnMieuxContext _dbContext; 

        public UsersController(NotesEpsiEnMieuxContext dbContext)
        {
            _dbContext = dbContext;
        }

        // GET: api/Users
        [HttpGet]
        public IActionResult GetUsers()
        {
            var users = _dbContext.Users.ToList();
            return Ok(users);
        }

        // GET: api/Users/5
        [HttpGet("{id}")]
        public IActionResult GetUserById(int id)
        {
            var user = _dbContext.Users.Find(id);

            if (user == null)
            {
                return NotFound("Utilisateur non trouvé.");
            }

            return Ok(user);
        }

        // POST: api/Users
        [HttpPost]
        public IActionResult CreateUser([FromBody] User user)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _dbContext.Users.Add(user);
            _dbContext.SaveChanges();

            return CreatedAtAction(nameof(GetUserById), new { id = user.Id }, user);
        }

        // PUT: api/Users/5
        [HttpPut("{id}")]
        public IActionResult UpdateUser(int id, [FromBody] User user)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != user.Id)
            {
                return BadRequest("L'ID de l'utilisateur ne correspond pas à l'ID dans la requête.");
            }

            _dbContext.Entry(user).State = EntityState.Modified;

            try
            {
                _dbContext.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_dbContext.Users.Any(u => u.Id == id))
                {
                    return NotFound("Utilisateur non trouvé.");
                }
                else
                {
                    throw;
                }
            }

            return NoContent(); 
        }

        // DELETE: api/Users/5
        [HttpDelete("{id}")]
        public IActionResult DeleteUser(int id)
        {
            var user = _dbContext.Users.Find(id);

            if (user == null)
            {
                return NotFound("Utilisateur non trouvé.");
            }

            _dbContext.Users.Remove(user);
            _dbContext.SaveChanges();

            return NoContent(); // Status 204 No Content
        }
    }
}
