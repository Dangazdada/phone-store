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
    public class GeneralInformationsController : ControllerBase
    {
        private readonly APIServerContext _context;

        public GeneralInformationsController(APIServerContext context)
        {
            _context = context;
        }

        // GET: api/GeneralInformations
        [HttpGet]
        public async Task<ActionResult<IEnumerable<GeneralInformation>>> GetGeneralInformations()
        {
            return await _context.GeneralInformations.ToListAsync();
        }

        // GET: api/GeneralInformations/5
        [HttpGet("{id}")]
        public async Task<ActionResult<GeneralInformation>> GetGeneralInformation(int id)
        {
            var generalInformation = await _context.GeneralInformations.FindAsync(id);

            if (generalInformation == null)
            {
                return NotFound();
            }

            return generalInformation;
        }

        // PUT: api/GeneralInformations/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutGeneralInformation(int id, GeneralInformation generalInformation)
        {
            if (id != generalInformation.Id)
            {
                return BadRequest();
            }

            _context.Entry(generalInformation).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!GeneralInformationExists(id))
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

        // POST: api/GeneralInformations
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<GeneralInformation>> PostGeneralInformation(GeneralInformation generalInformation)
        {
            _context.GeneralInformations.Add(generalInformation);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetGeneralInformation", new { id = generalInformation.Id }, generalInformation);
        }

        // DELETE: api/GeneralInformations/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteGeneralInformation(int id)
        {
            var generalInformation = await _context.GeneralInformations.FindAsync(id);
            if (generalInformation == null)
            {
                return NotFound();
            }

            _context.GeneralInformations.Remove(generalInformation);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool GeneralInformationExists(int id)
        {
            return _context.GeneralInformations.Any(e => e.Id == id);
        }
    }
}
