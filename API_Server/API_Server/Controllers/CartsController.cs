using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using API_Server.Data;
using API_Server.Models;
using Newtonsoft.Json.Linq;

namespace API_Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CartsController : ControllerBase
    {
        private readonly APIServerContext _context;

        public CartsController(APIServerContext context)
        {
            _context = context;
        }

        // GET: api/Carts
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Cart>>> GetCarts()
        {
            return await _context.Carts.ToListAsync();
        }

        // GET: api/Carts/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Cart>> GetCart(int id)
        {
            var cart = await _context.Carts.FindAsync(id);

            if (cart == null)
            {
                return NotFound();
            }

            return cart;
        }
  [HttpGet("user")]
  public async Task<IActionResult> GetUserCarts(string id)
  {
   var query = from carts in _context.Carts
               join productdetails in _context.ProductDetails on carts.ProductDetailId equals productdetails.Id
               join memoryandStorage in _context.MemoryAndStorages on productdetails.MemoryandStorageId equals memoryandStorage.Id
               join color in _context.Colors on productdetails.ColorId equals color.Id
               join product in _context.Products on productdetails.ProductId equals product.Id
               

               select new
               {
                id = carts.Id,
                productDetailId = productdetails.Id,
                Image = productdetails.MainUrl,
                ProductName = product.Name,
                ProductColor = color.Name,
                Ram = memoryandStorage.RAM,
                Rom = memoryandStorage.Storagecapacity,
                UnitPrice = productdetails.UnitPrice,
                Quantity = carts.Quantity,
                quantitydetail = productdetails.Quantity,
                UserId = carts.UserId,
               Promotions = _context.Promotions
               .Where(p => p.ProductId == product.Id && p.DateStart <= DateTime.Now  && p.DateEnd >= DateTime.Now)
               .Select(p => new
               {
                dateEnd = p.DateEnd,
                description = p.Description,
                value = p.Value,
                prmotiontype = p.Promotiontype,
                StartDate = p.DateStart,
                EndDate = p.DateEnd
               } 
               ).ToList()
               };

   var result = await query.ToListAsync();

   return Ok(result);
  }





  // PUT: api/Carts/5
  // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
  [HttpPut("{id}")]
        public async Task<IActionResult> PutCart(int id, Cart cart)
        {
           

            var temp = await _context.Carts.FindAsync(id);
            if (temp == null)
            {
              return NotFound();
            }
            else
            {
             temp.Quantity = cart.Quantity;
             _context.Carts.Update(temp);
            }

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CartExists(id))
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

        // POST: api/Carts
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Cart>> PostCart(Cart cart)
        {
            var cartAvailable = await _context.Carts
             .Where(c => c.UserId == cart.UserId)
             .Where(C => C.ProductDetailId == cart.ProductDetailId).FirstOrDefaultAsync();
            if(cartAvailable == null)
            {
             _context.Carts.Add(cart);
            }
            else
            {
            cartAvailable.Quantity = cartAvailable.Quantity + 1;
            _context.Carts.Update(cartAvailable);
            }

            await _context.SaveChangesAsync();

           return NoContent();
        }

        // DELETE: api/Carts/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCart(int id)
        {
            var cart = await _context.Carts.FindAsync(id);
            if (cart == null)
            {
                return NotFound();
            }

            _context.Carts.Remove(cart);
            await _context.SaveChangesAsync();

            return NoContent();
        }
  [HttpDelete("user/{userId}")]
  public async Task<IActionResult> DeleteCartByUser(string userId)
  {
   var cartsToRemove = await _context.Carts
     .Where(c => c.UserId == userId)
     .ToListAsync();

   // Sử dụng RemoveRangeAsync để xóa danh sách cartsToRemove
  foreach (var cart in cartsToRemove)
   {
    _context.Carts.Remove(cart);
   }
    

    await _context.SaveChangesAsync();


   return NoContent();
  }




  private bool CartExists(int id)
        {
            return _context.Carts.Any(e => e.Id == id);
        }
    }
}
