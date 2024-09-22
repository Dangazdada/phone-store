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
    public class FrontCamerasController : ControllerBase
    {
        private readonly APIServerContext _context;

        public FrontCamerasController(APIServerContext context)
        {
            _context = context;
        }

        // GET: api/FrontCameras
        [HttpGet]
        public async Task<ActionResult<IEnumerable<FrontCamera>>> GetFrontCameras()
        {
            return await _context.FrontCameras.ToListAsync();
        }

        // GET: api/FrontCameras/5
        [HttpGet("{id}")]
        public async Task<ActionResult<FrontCamera>> GetFrontCamera(int id)
        {
            var frontCamera = await _context.FrontCameras.FindAsync(id);

            if (frontCamera == null)
            {
                return NotFound();
            }

            return frontCamera;
        }

        // PUT: api/FrontCameras/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutFrontCamera(int id, FrontCamera frontCamera)
        {
            if (id != frontCamera.Id)
            {
                return BadRequest();
            }

            _context.Entry(frontCamera).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!FrontCameraExists(id))
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

        // POST: api/FrontCameras
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<FrontCamera>> PostFrontCamera(FrontCamera frontCamera)
        {
            _context.FrontCameras.Add(frontCamera);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetFrontCamera", new { id = frontCamera.Id }, frontCamera);
        }

        // DELETE: api/FrontCameras/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteFrontCamera(int id)
        {
            var frontCamera = await _context.FrontCameras.FindAsync(id);
            if (frontCamera == null)
            {
                return NotFound();
            }

            _context.FrontCameras.Remove(frontCamera);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool FrontCameraExists(int id)
        {
            return _context.FrontCameras.Any(e => e.Id == id);
        }
    }
}
