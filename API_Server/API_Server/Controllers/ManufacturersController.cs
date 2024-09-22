using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using API_Server.Data;
using API_Server.Models;
using static Microsoft.Extensions.Logging.EventSource.LoggingEventSource;

namespace API_Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ManufacturersController : ControllerBase
    {
        private readonly APIServerContext _context;

        public ManufacturersController(APIServerContext context)
        {
            _context = context;
        }

        [HttpGet]
        [Route("search")]
        public async Task<ActionResult<IEnumerable<Manufacturer>>> GetManufacturer(string Name)
        {
            var manufacturer = await _context.Manufacturers
                .Where(p => string.IsNullOrEmpty(Name) || p.Name.Contains(Name))
                .ToListAsync();
            return manufacturer;
        }

        [HttpGet]
        [Route("searchs")]
        public async Task<ActionResult<IEnumerable<Manufacturer>>> GetManufacturer(string Name, string address, string email, string phoneNumber)
        {
            var manufacturers = await _context.Manufacturers
            .Where(p =>
             
             ( string.IsNullOrEmpty(Name) || p.Name.Contains(Name)) &&
             (string.IsNullOrEmpty(address) || p.Address.Contains(address)) &&
             (string.IsNullOrEmpty(phoneNumber) || p.Phone.Replace(" ", "").Replace("-", "").Contains(phoneNumber)) &&  // Chuẩn hóa số điện thoại trong cơ sở dữ liệu trước khi so sánh
             (string.IsNullOrEmpty(email) || p.Email.Contains(email))
         )
         .ToListAsync();

            return manufacturers.Any() ? manufacturers : new List<Manufacturer>();
        }

        // GET: api/Manufacturers
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Manufacturer>>> GetManufacturers()
        {
            return await _context.Manufacturers.ToListAsync();
        }

        // GET: api/Manufacturers/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Manufacturer>> GetManufacturer(int id)
        {
            var manufacturer = await _context.Manufacturers.FindAsync(id);

            if (manufacturer == null)
            {
                return NotFound();
            }

            return manufacturer;
        }

        // PUT: api/Manufacturers/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutManufacturer(int id, Manufacturer manufacturer)
        {
            if (id != manufacturer.Id)
            {
                return BadRequest();
            }

            _context.Entry(manufacturer).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ManufacturerExists(id))
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

        // POST: api/Manufacturers
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Manufacturer>> PostManufacturer(string name, string address, string phone, string email, bool status)
        {
            Manufacturer manufacturer = new Manufacturer()
            {
                Name = name,
                Address = address,
                Phone = phone,
                Email = email,
                Status = status
            };  
            _context.Manufacturers.Add(manufacturer);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetManufacturer", new { id = manufacturer.Id }, manufacturer);
        }

        // DELETE: api/Manufacturers/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteManufacturer(int id)
        {
            var manufacturer = await _context.Manufacturers.FindAsync(id);
            if (manufacturer == null)
            {
                return NotFound();
            }

            _context.Manufacturers.Remove(manufacturer);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ManufacturerExists(int id)
        {
            return _context.Manufacturers.Any(e => e.Id == id);
        }
    }
}
