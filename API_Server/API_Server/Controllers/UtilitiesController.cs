using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using API_Server.Data;
using API_Server.Models;

namespace API_Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UtilitiesController : ControllerBase
    {
        private readonly APIServerContext _context;

        public UtilitiesController(APIServerContext context)
        {
            _context = context;
        }

        // GET: api/Utilities
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Utility>>> GetUtilities()
        {
            return await _context.Utilities.ToListAsync();
        }

        // GET: api/Utilities/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Utility>> GetUtility(int id)
        {
            var utility = await _context.Utilities.FindAsync(id);

            if (utility == null)
            {
                return NotFound();
            }

            return utility;
        }

        // PUT: api/Utilities/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUtility(int id, Utility utility)
        {
            if (id != utility.Id)
            {
                return BadRequest();
            }

            _context.Entry(utility).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UtilityExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Utilities
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Utility>> PostUtility(Utility utility)
        {
            _context.Utilities.Add(utility);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetUtility", new { id = utility.Id }, utility);
        }

        // DELETE: api/Utilities/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUtility(int id)
        {
            var utility = await _context.Utilities.FindAsync(id);
            if (utility == null)
            {
                return NotFound();
            }

            _context.Utilities.Remove(utility);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool UtilityExists(int id)
        {
            return _context.Utilities.Any(e => e.Id == id);
        }
    }
}
