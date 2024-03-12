using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Notes_ESPI_en_mieux.Entities;
using Notes_ESPI_en_mieux.Models;

namespace Notes_ESPI_en_mieux.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CoursController : ControllerBase
    {
        private readonly NotesEpsiEnmieuxContext _dbContext;

        public CoursController(NotesEpsiEnmieuxContext dbContext)
        {
            _dbContext = dbContext;
        }

        // GET: api/Cours
        [HttpGet]
        public IActionResult GetCours()
        {
            var cours = _dbContext.Cours.ToList();
            return Ok(cours);
        }

        // GET: api/Cours/5
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

        // GET: api/Cours/ByIdProf/5
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


        // POST: api/Cours
        [HttpPost]
        public IActionResult CreateCour([FromBody] CreateCoursModel createCoursModel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var cour = new Cours
            {
                IdProf = createCoursModel.IdProf,
                Titre = createCoursModel.Titre,
                Description = createCoursModel.Description
            };

            _dbContext.Cours.Add(cour);
            _dbContext.SaveChanges();

            // Créer les liens entre le cours et les classes
            foreach (var idClasse in createCoursModel.IdClasses)
            {
                var coursClasse = new Coursclasse
                {
                    IdCours = cour.Id,
                    IdClasse = idClasse
                };

                _dbContext.Coursclasses.Add(coursClasse);
            }

            _dbContext.SaveChanges();

            return CreatedAtAction(nameof(GetCourById), new { id = cour.Id }, cour);
        }






        // PUT: api/Cours/5
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

        // DELETE: api/Cours/5
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

        

        // GET: api/Cours/GetElevesByClasseId/5
        [HttpGet("GetElevesByClasseId/{id}")]
        public IActionResult GetElevesByClasseId(int id)
        {
            
            var eleves = _dbContext.Users
                .Where(u => u.IdClasse == id && u.Role == "Eleve")
                .ToList();

            return Ok(eleves);
        }

        // GET: api/Cours/GetUsersByCoursId/{id}
        [HttpGet("GetUsersByCoursId/{id}")]
        public IActionResult GetUsersByCoursId(int id)
        {
            var classeId = _dbContext.Coursclasses
                .Where(cc => cc.IdCours == id)
                .Select(cc => cc.IdClasse)  
                .FirstOrDefault();

            if (classeId == null)
            {
                return NotFound("Classe non trouvée pour le cours spécifié.");
            }
                      
            var eleves = GetElevesByClasseId(classeId); 

            return Ok(eleves);
        }

    }



}
