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
    public class BatteryandChargersController : ControllerBase
    {
        private readonly APIServerContext _context;

        public BatteryandChargersController(APIServerContext context)
        {
            _context = context;
        }

        // GET: api/BatteryandChargers
        [HttpGet]
        public async Task<ActionResult<IEnumerable<BatteryandCharger>>> GetBatteryandChargers()
        {
            return await _context.BatteryandChargers.ToListAsync();
        }

        // GET: api/BatteryandChargers/5
        [HttpGet("{id}")]
        public async Task<ActionResult<BatteryandCharger>> GetBatteryandCharger(int id)
        {
            var batteryandCharger = await _context.BatteryandChargers.FindAsync(id);

            if (batteryandCharger == null)
            {
                return NotFound();
            }

            return batteryandCharger;
        }

        // PUT: api/BatteryandChargers/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutBatteryandCharger(int id, BatteryandCharger batteryandCharger)
        {
            if (id != batteryandCharger.Id)
            {
                return BadRequest();
            }

            _context.Entry(batteryandCharger).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BatteryandChargerExists(id))
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

        // POST: api/BatteryandChargers
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<BatteryandCharger>> PostBatteryandCharger(BatteryandCharger batteryandCharger)
        {
            _context.BatteryandChargers.Add(batteryandCharger);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetBatteryandCharger", new { id = batteryandCharger.Id }, batteryandCharger);
        }

        // DELETE: api/BatteryandChargers/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBatteryandCharger(int id)
        {
            var batteryandCharger = await _context.BatteryandChargers.FindAsync(id);
            if (batteryandCharger == null)
            {
                return NotFound();
            }

            _context.BatteryandChargers.Remove(batteryandCharger);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool BatteryandChargerExists(int id)
        {
            return _context.BatteryandChargers.Any(e => e.Id == id);
        }
    }
}
