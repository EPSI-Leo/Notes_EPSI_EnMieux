using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Notes_ESPI_en_mieux.Entities;

namespace Notes_ESPI_en_mieux.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClasseController : ControllerBase
    {
        private readonly NotesEpsiEnmieuxContext _dbContext;

        public ClasseController(NotesEpsiEnmieuxContext dbContext)
        {
            _dbContext = dbContext;
        }

        // GET: api/Classe
        [HttpGet]
        public IActionResult GetClasses()
        {
            var classes = _dbContext.Classes.ToList();
            return Ok(classes);
        }

        // GET: api/Classe/5
        [HttpGet("{id}")]
        public IActionResult GetClasseById(int id)
        {
            var classe = _dbContext.Classes.Find(id);

            if (classe == null)
            {
                return NotFound("Classe non trouvée.");
            }

            return Ok(classe);
        }

        // POST: api/Classe
        [HttpPost]
        public IActionResult CreateClasse([FromBody] Classe classe)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _dbContext.Classes.Add(classe);
            _dbContext.SaveChanges();

            return CreatedAtAction(nameof(GetClasseById), new { id = classe.Id }, classe);
        }

        // PUT: api/Classe/5
        [HttpPut("{id}")]
        public IActionResult UpdateClasse(int id, [FromBody] Classe classe)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != classe.Id)
            {
                return BadRequest("L'ID de la classe ne correspond pas à l'ID dans la requête.");
            }

            _dbContext.Entry(classe).State = EntityState.Modified;

            try
            {
                _dbContext.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_dbContext.Classes.Any(c => c.Id == id))
                {
                    return NotFound("Classe non trouvée.");
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // DELETE: api/Classe/5
        [HttpDelete("{id}")]
        public IActionResult DeleteClasse(int id)
        {
            var classe = _dbContext.Classes.Find(id);

            if (classe == null)
            {
                return NotFound("Classe non trouvée.");
            }

            _dbContext.Classes.Remove(classe);
            _dbContext.SaveChanges();

            return NoContent(); // Status 204 No Content
        }
    }
}
