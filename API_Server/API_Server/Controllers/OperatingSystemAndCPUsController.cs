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
    public class OperatingSystemAndCPUsController : ControllerBase
    {
        private readonly APIServerContext _context;

        public OperatingSystemAndCPUsController(APIServerContext context)
        {
            _context = context;
        }

        // GET: api/OperatingSystemAndCPUs
        [HttpGet]
        public async Task<ActionResult<IEnumerable<OperatingSystemAndCPU>>> GetOperatingSystemsAndCPUs()
        {
            return await _context.OperatingSystemsAndCPUs.ToListAsync();
        }

        // GET: api/OperatingSystemAndCPUs/5
        [HttpGet("{id}")]
        public async Task<ActionResult<OperatingSystemAndCPU>> GetOperatingSystemAndCPU(int id)
        {
            var operatingSystemAndCPU = await _context.OperatingSystemsAndCPUs.FindAsync(id);

            if (operatingSystemAndCPU == null)
            {
                return NotFound();
            }

            return operatingSystemAndCPU;
        }

        // PUT: api/OperatingSystemAndCPUs/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutOperatingSystemAndCPU(int id, OperatingSystemAndCPU operatingSystemAndCPU)
        {
            if (id != operatingSystemAndCPU.Id)
            {
                return BadRequest();
            }

            _context.Entry(operatingSystemAndCPU).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!OperatingSystemAndCPUExists(id))
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

        // POST: api/OperatingSystemAndCPUs
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<OperatingSystemAndCPU>> PostOperatingSystemAndCPU(OperatingSystemAndCPU operatingSystemAndCPU)
        {
            _context.OperatingSystemsAndCPUs.Add(operatingSystemAndCPU);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetOperatingSystemAndCPU", new { id = operatingSystemAndCPU.Id }, operatingSystemAndCPU);
        }

        // DELETE: api/OperatingSystemAndCPUs/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteOperatingSystemAndCPU(int id)
        {
            var operatingSystemAndCPU = await _context.OperatingSystemsAndCPUs.FindAsync(id);
            if (operatingSystemAndCPU == null)
            {
                return NotFound();
            }

            _context.OperatingSystemsAndCPUs.Remove(operatingSystemAndCPU);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool OperatingSystemAndCPUExists(int id)
        {
            return _context.OperatingSystemsAndCPUs.Any(e => e.Id == id);
        }
    }
}
