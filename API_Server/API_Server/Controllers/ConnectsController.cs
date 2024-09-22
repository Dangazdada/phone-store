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
    public class ConnectsController : ControllerBase
    {
        private readonly APIServerContext _context;

        public ConnectsController(APIServerContext context)
        {
            _context = context;
        }

        // GET: api/Connects
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Connect>>> GetConnects()
        {
            return await _context.Connects.ToListAsync();
        }

        // GET: api/Connects/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Connect>> GetConnect(int id)
        {
            var connect = await _context.Connects.FindAsync(id);

            if (connect == null)
            {
                return NotFound();
            }

            return connect;
        }

        // PUT: api/Connects/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutConnect(int id, Connect connect)
        {
            if (id != connect.Id)
            {
                return BadRequest();
            }

            _context.Entry(connect).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ConnectExists(id))
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

        // POST: api/Connects
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Connect>> PostConnect(Connect connect)
        {
            _context.Connects.Add(connect);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetConnect", new { id = connect.Id }, connect);
        }

        // DELETE: api/Connects/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteConnect(int id)
        {
            var connect = await _context.Connects.FindAsync(id);
            if (connect == null)
            {
                return NotFound();
            }

            _context.Connects.Remove(connect);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ConnectExists(int id)
        {
            return _context.Connects.Any(e => e.Id == id);
        }
    }
}
