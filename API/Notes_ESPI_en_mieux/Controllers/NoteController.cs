using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Notes_ESPI_en_mieux.Entities;

namespace Notes_ESPI_en_mieux.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NoteController : ControllerBase
    {
        private readonly NotesEpsiEnMieuxContext _dbContext;

        public NoteController(NotesEpsiEnMieuxContext dbContext)
        {
            _dbContext = dbContext;
        }

        // GET: api/Note
        [HttpGet]
        public IActionResult GetNotes()
        {
            var notes = _dbContext.Notes.ToList();
            return Ok(notes);
        }

        // GET: api/Note/5
        [HttpGet("{id}")]
        public IActionResult GetNoteById(int id)
        {
            var note = _dbContext.Notes.Find(id);

            if (note == null)
            {
                return NotFound("Note non trouvée.");
            }

            return Ok(note);
        }

        // POST: api/Note
        [HttpPost]
        public IActionResult CreateNote([FromBody] Note note)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _dbContext.Notes.Add(note);
            _dbContext.SaveChanges();

            return CreatedAtAction(nameof(GetNoteById), new { id = note.Id }, note);
        }

        // PUT: api/Note/5
        [HttpPut("{id}")]
        public IActionResult UpdateNote(int id, [FromBody] Note note)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != note.Id)
            {
                return BadRequest("L'ID de la note ne correspond pas à l'ID dans la requête.");
            }

            _dbContext.Entry(note).State = EntityState.Modified;

            try
            {
                _dbContext.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_dbContext.Notes.Any(n => n.Id == id))
                {
                    return NotFound("Note non trouvée.");
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // DELETE: api/Note/5
        [HttpDelete("{id}")]
        public IActionResult DeleteNote(int id)
        {
            var note = _dbContext.Notes.Find(id);

            if (note == null)
            {
                return NotFound("Note non trouvée.");
            }

            _dbContext.Notes.Remove(note);
            _dbContext.SaveChanges();

            return NoContent(); 
        }

        //GET: api/Note/GetNotesByEleveId/1
        [HttpGet("GetNoteByEleveId/{eleveId}")]
        public IActionResult GetNotesByEleveId(int eleveId)
        {
            var notesByEleve = _dbContext.Notes.Where(n => n.IdUser == eleveId).ToList();
            return Ok(notesByEleve);
        }

        //GET api/Note/GetNoteByCoursId
        [HttpGet("GetNotesByCoursId/{coursId}")]
        public IActionResult GetNotesByCoursId(int coursId)
        {
            var notesByCours = _dbContext.Notes
                .Join(
                    _dbContext.Evaluations,
                    note => note.IdEvaluation,
                    evaluation => evaluation.Id,
                    (note, evaluation) => new { Note = note, Evaluation = evaluation }
                )
                .Join(
                    _dbContext.Cours,
                    combined => combined.Evaluation.IdCours,
                    cours => cours.Id,
                    (combined, cours) => new { combined.Note, Cours = cours }
                )
                .Where(result => result.Cours.Id == coursId)
                .Select(result => result.Note)
                .ToList();

            return Ok(notesByCours);
        }

    }


}
