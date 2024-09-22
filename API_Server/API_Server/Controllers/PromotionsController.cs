using API_Server.Data;
using API_Server.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API_Server.Controllers
{
 [Route("api/[controller]")]
    [ApiController]
    public class PromotionsController : ControllerBase
    {
        private readonly APIServerContext _context;

        public PromotionsController(APIServerContext context)
        {
            _context = context;
        }

        // GET: api/Promotions
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Promotion>>> GetPromotions()
        {
            return await _context.Promotions.ToListAsync();
        }

        // GET: api/Promotions/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Promotion>> GetPromotion(int id)
        {
            var promotion = await _context.Promotions.FindAsync(id);

            if (promotion == null)
            {
                return NotFound();
            }

            return promotion;
        }

        [HttpGet("{id}/byproduct")]
        public async Task<ActionResult<Promotion>> GetPromotionsByProduct(int id)
        {
         var promotions = await _context.Promotions
                                .Where(p => p.ProductId == id)
                                .Select(promotion => new
                                {
                                 ProductName = _context.Products
                                               .Where(p => p.Id == id)
                                               .Select( p => p.Name)
                                               .FirstOrDefault(),
                                 PromotionId = promotion.Id,
                                 Value = promotion.Value,
                                 Desciption = promotion.Description,
                                 PromotionType = promotion.Promotiontype,
                                 PromotionCode  = promotion.Promotioncode,
                                 StartDate = promotion.DateStart,
                                 EndDate = promotion.DateEnd,
                                 Status = promotion.Status

                                })
                                .ToListAsync();

         if (promotions == null)
         {
          return NotFound();
         }

         return Ok(promotions);
        }

        // PUT: api/Promotions/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPromotion(int id, Promotion promotion)
        {
             var promotionT = await _context.Promotions.FindAsync(id);
             if(promotionT == null)
                {
                 return NotFound();
                }
             promotion.Promotiontype = promotion.Promotiontype;
             promotionT.Value = promotion.Value;
             promotionT.Description = promotion.Description;
             promotionT.DateStart = promotion.DateStart;
             promotionT.DateEnd = promotion.DateEnd;
             _context.Promotions.Update(promotionT);

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PromotionExists(id))
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

        // POST: api/Promotions
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Promotion>> PostPromotion(Promotion promotion)
        {
            _context.Promotions.Add(promotion);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetPromotion", new { id = promotion.Id }, promotion);
        }

        // DELETE: api/Promotions/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePromotion(int id)
        {
            var promotion = await _context.Promotions.FindAsync(id);
            if (promotion == null)
            {
                return NotFound();
            }

            _context.Promotions.Remove(promotion);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool PromotionExists(int id)
        {
            return _context.Promotions.Any(e => e.Id == id);
        }
    }
}
