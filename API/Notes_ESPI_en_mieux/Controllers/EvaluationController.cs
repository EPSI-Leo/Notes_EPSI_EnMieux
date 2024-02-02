using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Notes_ESPI_en_mieux.Entities;

namespace Notes_ESPI_en_mieux.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EvaluationController : ControllerBase
    {
        private readonly NotesEpsiEnMieuxContext _dbContext;

        public EvaluationController(NotesEpsiEnMieuxContext dbContext)
        {
            _dbContext = dbContext;
        }

        // GET: api/Evaluation
        [HttpGet]
        public IActionResult GetEvaluations()
        {
            var evaluations = _dbContext.Evaluations.ToList();
            return Ok(evaluations);
        }

        // GET: api/Evaluation/5
        [HttpGet("{id}")]
        public IActionResult GetEvaluationById(int id)
        {
            var evaluation = _dbContext.Evaluations.Find(id);

            if (evaluation == null)
            {
                return NotFound("Évaluation non trouvée.");
            }

            return Ok(evaluation);
        }

        // POST: api/Evaluation
        [HttpPost]
        public IActionResult CreateEvaluation([FromBody] Evaluation evaluation)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _dbContext.Evaluations.Add(evaluation);
            _dbContext.SaveChanges();

            return CreatedAtAction(nameof(GetEvaluationById), new { id = evaluation.Id }, evaluation);
        }

        // PUT: api/Evaluation/5
        [HttpPut("{id}")]
        public IActionResult UpdateEvaluation(int id, [FromBody] Evaluation evaluation)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != evaluation.Id)
            {
                return BadRequest("L'ID de l'évaluation ne correspond pas à l'ID dans la requête.");
            }

            _dbContext.Entry(evaluation).State = EntityState.Modified;

            try
            {
                _dbContext.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_dbContext.Evaluations.Any(e => e.Id == id))
                {
                    return NotFound("Évaluation non trouvée.");
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // DELETE: api/Evaluation/5
        [HttpDelete("{id}")]
        public IActionResult DeleteEvaluation(int id)
        {
            var evaluation = _dbContext.Evaluations.Find(id);

            if (evaluation == null)
            {
                return NotFound("Évaluation non trouvée.");
            }

            _dbContext.Evaluations.Remove(evaluation);
            _dbContext.SaveChanges();

            return NoContent();
        }

        // GET: api/Evaluation/GetEvaluationsByCoursId/{coursId}
        [HttpGet("GetEvaluationsByCoursId/{coursId}")]
        public IActionResult GetEvaluationsByCoursId(int coursId)
        {
            var evaluationsByCours = _dbContext.Evaluations
                .Where(e => e.IdCours == coursId)
                .ToList();

            return Ok(evaluationsByCours);
        }

    }
}
