using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Notes_ESPI_en_mieux.Entities;

namespace Notes_EPSI_EnMieux.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TestController : ControllerBase
    {
        private readonly NotesEpsiEnmieuxContext _dbContext;

        public TestController(NotesEpsiEnmieuxContext dbContext)
        {
            _dbContext = dbContext;
        }

        //test db connection
        [HttpGet("testdbconnection")]
        public IActionResult TestDbConnection()
        {
            try
            {
                _dbContext.Database.OpenConnection();
                _dbContext.Database.CloseConnection();
                return Ok("Database connection successful!");
            }
            catch (Exception ex)
            {
                return BadRequest($"Database connection failed: {ex.Message}");
            }
        }
    }
}
