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
    public class FavouritesController : ControllerBase
    {
        private readonly APIServerContext _context;

        public FavouritesController(APIServerContext context)
        {
            _context = context;
        }

        // GET: api/Favourites
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Favourite>>> GetFavorites()
        {
            return await _context.Favorites.ToListAsync();
        }

        //user

        [HttpGet("user")]
        public async Task<IActionResult> GetUserFavorites(string id)
        {
            var query = from favorites in _context.Favorites
                        join productdetails in _context.ProductDetails on favorites.ProductDetailId equals productdetails.Id
                        join memoryandStorage in _context.MemoryAndStorages on productdetails.MemoryandStorageId equals memoryandStorage.Id
                        join color in _context.Colors on productdetails.ColorId equals color.Id
                        join product in _context.Products on productdetails.ProductId equals product.Id


                        select new
                        {
                            id = favorites.Id,
                            productDetailId = productdetails.Id,
                            Image = productdetails.MainUrl,
                            ProductName = product.Name,
                            ProductColor = color.Name,
                            Ram = memoryandStorage.RAM,
                            Rom = memoryandStorage.Storagecapacity,
                            UnitPrice = productdetails.UnitPrice,
                            UserId = favorites.UserId,
                            Promotions = _context.Promotions
                        .Where(p => p.ProductId == product.Id)
                        .Select(p => new
                        {
                            dateEnd = p.DateEnd,
                            description = p.Description,
                            value = p.Value,
                            prmotiontype = p.Promotiontype
                        }
                        ).ToList()
                        };

            var result = await query.ToListAsync();

            return Ok(result);
        }

        // GET: api/Favourites/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Favourite>> GetFavourite(int id)
        {
            var favourite = await _context.Favorites.FindAsync(id);

            if (favourite == null)
            {
                return NotFound();
            }

            return favourite;
        }

        // PUT: api/Favourites/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutFavourite(int id, Favourite favourite)
        {
            if (id != favourite.Id)
            {
                return BadRequest();
            }

            _context.Entry(favourite).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!FavouriteExists(id))
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

        // POST: api/Favourites
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Favourite>> PostFavourite(Favourite favourite)
        {
            _context.Favorites.Add(favourite);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetFavourite", new { id = favourite.Id }, favourite);
        }

        // DELETE: api/Favourites/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteFavourite(int id)
        {
            var favourite = await _context.Favorites.FindAsync(id);
            if (favourite == null)
            {
                return NotFound();
            }

            _context.Favorites.Remove(favourite);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> DeleteFavouriteByProductAndUser(int productDetailId, string userid)
        {
            var favourite = await _context.Favorites
                                          .FirstOrDefaultAsync(p => p.ProductDetailId == productDetailId && p.UserId == userid);
            if (favourite == null)
            {
                return NotFound();
            }

            _context.Favorites.Remove(favourite);
            await _context.SaveChangesAsync();

            return NoContent();
        }


        private bool FavouriteExists(int id)
        {
            return _context.Favorites.Any(e => e.Id == id);
        }
    }
}
