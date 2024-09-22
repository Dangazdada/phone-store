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
    public class MemoryandStoragesController : ControllerBase
    {
        private readonly APIServerContext _context;

        public MemoryandStoragesController(APIServerContext context)
        {
            _context = context;
        }

        // GET: api/MemoryandStorages
        [HttpGet]
        public async Task<ActionResult<IEnumerable<MemoryandStorage>>> GetMemoryAndStorages()
        {
            return await _context.MemoryAndStorages.ToListAsync();
        }

        // GET: api/MemoryandStorages/5
        [HttpGet("{id}")]
        public async Task<ActionResult<MemoryandStorage>> GetMemoryandStorage(int id)
        {
            var memoryandStorage = await _context.MemoryAndStorages.FindAsync(id);

            if (memoryandStorage == null)
            {
                return NotFound();
            }

            return memoryandStorage;
        }

        // PUT: api/MemoryandStorages/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutMemoryandStorage(int id, MemoryandStorage memoryandStorage)
        {
            if (id != memoryandStorage.Id)
            {
                return BadRequest();
            }

            _context.Entry(memoryandStorage).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MemoryandStorageExists(id))
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

        // POST: api/MemoryandStorages
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<MemoryandStorage>> PostMemoryandStorage(MemoryandStorage memoryandStorage)
        {
            _context.MemoryAndStorages.Add(memoryandStorage);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetMemoryandStorage", new { id = memoryandStorage.Id }, memoryandStorage);
        }

        // DELETE: api/MemoryandStorages/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteMemoryandStorage(int id)
        {
            var memoryandStorage = await _context.MemoryAndStorages.FindAsync(id);
            if (memoryandStorage == null)
            {
                return NotFound();
            }

            _context.MemoryAndStorages.Remove(memoryandStorage);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool MemoryandStorageExists(int id)
        {
            return _context.MemoryAndStorages.Any(e => e.Id == id);
        }
    }
}
