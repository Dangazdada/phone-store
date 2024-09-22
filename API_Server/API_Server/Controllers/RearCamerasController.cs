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
    public class RearCamerasController : ControllerBase
    {
        private readonly APIServerContext _context;

        public RearCamerasController(APIServerContext context)
        {
            _context = context;
        }

        // GET: api/RearCameras
        [HttpGet]
        public async Task<ActionResult<IEnumerable<RearCamera>>> GetRearCameras()
        {
            return await _context.RearCameras.ToListAsync();
        }

        // GET: api/RearCameras/5
        [HttpGet("{id}")]
        public async Task<ActionResult<RearCamera>> GetRearCamera(int id)
        {
            var rearCamera = await _context.RearCameras.FindAsync(id);

            if (rearCamera == null)
            {
                return NotFound();
            }

            return rearCamera;
        }

        // PUT: api/RearCameras/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutRearCamera(int id, RearCamera rearCamera)
        {
            if (id != rearCamera.Id)
            {
                return BadRequest();
            }

            _context.Entry(rearCamera).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!RearCameraExists(id))
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

        // POST: api/RearCameras
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<RearCamera>> PostRearCamera(RearCamera rearCamera)
        {
            _context.RearCameras.Add(rearCamera);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetRearCamera", new { id = rearCamera.Id }, rearCamera);
        }

        // DELETE: api/RearCameras/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteRearCamera(int id)
        {
            var rearCamera = await _context.RearCameras.FindAsync(id);
            if (rearCamera == null)
            {
                return NotFound();
            }

            _context.RearCameras.Remove(rearCamera);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool RearCameraExists(int id)
        {
            return _context.RearCameras.Any(e => e.Id == id);
        }
    }
}
