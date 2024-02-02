using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Notes_ESPI_en_mieux.Entities;

namespace Notes_ESPI_en_mieux.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CoursController : ControllerBase
    {
        private readonly NotesEpsiEnMieuxContext _dbContext;

        public CoursController(NotesEpsiEnMieuxContext dbContext)
        {
            _dbContext = dbContext;
        }

        // GET: api/Cour
        [HttpGet]
        public IActionResult GetCours()
        {
            var cours = _dbContext.Cours.ToList();
            return Ok(cours);
        }

        // GET: api/Cour/5
        [HttpGet("{id}")]
        public IActionResult GetCourById(int id)
        {
            var cour = _dbContext.Cours.Find(id);

            if (cour == null)
            {
                return NotFound("Cours non trouvé.");
            }

            return Ok(cour);
        }

        // GET: api/Cour/ByIdProf/5
        [HttpGet("ByIdProf/{idProf}")]
        public IActionResult GetCourByIdProf(int idProf)
        {
            var cours = _dbContext.Cours.Where(c => c.IdProf == idProf).ToList();

            if (cours == null || cours.Count == 0)
            {
                return NotFound("Cours non trouvé pour cet ID de professeur.");
            }

            return Ok(cours);
        }


        // POST: api/Cour
        [HttpPost]
        public IActionResult CreateCour([FromBody] Cours cour)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _dbContext.Cours.Add(cour);
            _dbContext.SaveChanges();

            return CreatedAtAction(nameof(GetCourById), new { id = cour.Id }, cour);
        }

        // PUT: api/Cour/5
        [HttpPut("{id}")]
        public IActionResult UpdateCour(int id, [FromBody] Cours cour)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != cour.Id)
            {
                return BadRequest("L'ID du cours ne correspond pas à l'ID dans la requête.");
            }

            _dbContext.Entry(cour).State = EntityState.Modified;

            try
            {
                _dbContext.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_dbContext.Cours.Any(c => c.Id == id))
                {
                    return NotFound("Cours non trouvé.");
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // DELETE: api/Cour/5
        [HttpDelete("{id}")]
        public IActionResult DeleteCour(int id)
        {
            var cour = _dbContext.Cours.Find(id);

            if (cour == null)
            {
                return NotFound("Cours non trouvé.");
            }

            _dbContext.Cours.Remove(cour);
            _dbContext.SaveChanges();

            return NoContent();
        }

        // GET: api/Cours/ID_cours
        [HttpGet("GetUsersByCoursId/{id}")]
        public IActionResult GetUsersByCoursId(int id)
        {
            // Assurez-vous que CoursClasses est bien inclus dans votre modèle EF
            var classe = _dbContext.CoursClasses
                .Where(cc => cc.ID_Cours == id)
                .Include(cc => cc.Classe)
                .FirstOrDefault()?.Classe;

            if (classe == null)
            {
                return NotFound("Classe non trouvée pour le cours spécifié.");
            }

            // Assurez-vous que User est bien inclus dans votre modèle EF
            var eleves = GetElevesByClasseId(classe.ID);

            return Ok(eleves);
        }



    }



}
