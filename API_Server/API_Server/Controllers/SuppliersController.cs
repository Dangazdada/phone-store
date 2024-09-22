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
    public class SuppliersController : ControllerBase
    {
        private readonly APIServerContext _context;

        public SuppliersController(APIServerContext context)
        {
            _context = context;
        }

        // GET: api/Suppliers
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Supplier>>> GetSuppliers()
        {
            return await _context.Suppliers.ToListAsync();
        }

        [HttpGet]
        [Route("search")]
        public async Task<ActionResult<IEnumerable<Supplier>>> GetSupplier(string Name)
        {
         var supplier = await _context.Suppliers
             .Where(p => string.IsNullOrEmpty(Name) || p.Name.Contains(Name))
             .ToListAsync();
         return supplier;
        } 

        [HttpGet]
        [Route("searchs")]
        public async Task<ActionResult<IEnumerable<Supplier>>> GetSupplier(string Name, string address, string email, string phoneNumber)
        {
            var suppliers = await _context.Suppliers
            .Where(p =>

             (string.IsNullOrEmpty(Name) || p.Name.Contains(Name)) &&
             (string.IsNullOrEmpty(address) || p.Address.Contains(address)) &&
             (string.IsNullOrEmpty(phoneNumber) || p.Phone.Replace(" ", "").Replace("-", "").Contains(phoneNumber)) &&  // Chuẩn hóa số điện thoại trong cơ sở dữ liệu trước khi so sánh
             (string.IsNullOrEmpty(email) || p.Email.Contains(email))
         )
         .ToListAsync();

            return suppliers.Any() ? suppliers : new List<Supplier>();
        }
        // GET: api/Suppliers/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Supplier>> GetSupplier(int id)
        {
            var supplier = await _context.Suppliers.FindAsync(id);

            if (supplier == null)
            {
                return NotFound();
            }

            return supplier;
        }

        // PUT: api/Suppliers/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutSupplier(int id, Supplier supplier)
        {
            if (id != supplier.Id)
            {
                return BadRequest();
            }

            _context.Entry(supplier).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SupplierExists(id))
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

        // POST: api/Suppliers
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Supplier>> PostSupplier(string name, string address, string phone, string email, bool status)
        {
            Supplier  supplier= new Supplier()
            {
                Name = name,
                Address = address,
                Phone = phone,
                Email = email,
                Status = status,
            };
            _context.Suppliers.Add(supplier);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetSupplier", new { id = supplier.Id }, supplier);
        }

        // DELETE: api/Suppliers/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSupplier(int id)
        {
            var supplier = await _context.Suppliers.FindAsync(id);
            if (supplier == null)
            {
                return NotFound();
            }

            _context.Suppliers.Remove(supplier);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool SupplierExists(int id)
        {
            return _context.Suppliers.Any(e => e.Id == id);
        }
    }
}
