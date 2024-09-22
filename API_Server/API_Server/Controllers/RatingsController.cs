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
    public class RatingsController : ControllerBase
    {
        private readonly APIServerContext _context;

        public RatingsController(APIServerContext context)
        {
            _context = context;
        }

        // GET: api/Ratings
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Rating>>> GetRatings()
        {
            return await _context.Ratings
                .Include(r => r.ProductDetail)
                .Include(r => r.InvoiceDetail)
                .Select(r => new Rating
                {
                    // Copy các trường từ đối tượng Rating
                    Id = r.Id,
                    ProductDetailId = r.ProductDetailId,
                    InvoiceDetailId = r.InvoiceDetailId,
                    InvoiceDetail = r.InvoiceDetailId.HasValue
                    ? new InvoiceDetail
                    {
                        Id = r.InvoiceDetail.Id,
                        InvoiceId = r.InvoiceDetail.InvoiceId
                    }
                    : null,
                    InvoiceId = r.InvoiceId,
                    Review = r.Review,
                    Score = r.Score,
                    RatingTime = r.RatingTime,
                    Status = r.Status,
                    User = new User { UserName = r.User.UserName, FirstName = r.User.FirstName, LastName = r.User.LastName }
                    

                })
                .ToListAsync();
        }

  [HttpGet]
  [Route("search")]
  public async Task<ActionResult<IEnumerable<Rating>>> GetRatings(string review)
  {
   var ratings = await _context.Ratings
       .Include(r => r.ProductDetail)
       .Include(r => r.InvoiceDetail)
        .Where(p => string.IsNullOrEmpty(review) || p.Review.Contains(review))
       .Select(r => new
       {
        // Copy các trường từ đối tượng Rating
        Id = r.Id,
        ProductDetailId = r.ProductDetailId,

        ProductDetail = _context.ProductDetails
                              .Where(pd => pd.Id == r.ProductDetailId)
                              .Select(pd => new
                              {
                               ProductName = _context.Products
                                             .Where(p => p.Id == pd.ProductId)
                                             .Select(p => p.Name)
                                             .FirstOrDefault()

                              })
                              .FirstOrDefault(),

        InvoiceDetailId = r.InvoiceDetailId,
        InvoiceDetail = r.InvoiceDetailId.HasValue
           ? new InvoiceDetail
           {
            Id = r.InvoiceDetail.Id,
            InvoiceId = r.InvoiceDetail.InvoiceId
           }
           : null,
        InvoiceId = r.InvoiceId,
        Review = r.Review,
        Score = r.Score,
        RatingTime = r.RatingTime,
        Status = r.Status,
        User = new User { UserName = r.User.UserName, FirstName = r.User.FirstName, LastName = r.User.LastName }


       })
       .ToListAsync();
   return Ok(ratings);
  }

  // Get rating admin
  [HttpGet]
  [Route("admin")]
  public async Task<ActionResult<IEnumerable<Rating>>> GetRatingsAdmin()
  {
   var ratings =  await _context.Ratings
       .Include(r => r.ProductDetail)
       .Include(r => r.InvoiceDetail)
       .Select(r => new 
       {
        // Copy các trường từ đối tượng Rating
        Id = r.Id,
        ProductDetailId = r.ProductDetailId,
        
        ProductDetail= _context.ProductDetails
                              .Where( pd => pd.Id == r.ProductDetailId)
                              .Select(pd => new
                              {
                               ProductName = _context.Products
                                             .Where(p => p.Id == pd.ProductId)
                                             .Select( p => p.Name)
                                             .FirstOrDefault()
                                             
                              })
                              .FirstOrDefault(),
                 
        InvoiceDetailId = r.InvoiceDetailId,
        InvoiceDetail = r.InvoiceDetailId.HasValue
           ? new InvoiceDetail
           {
            Id = r.InvoiceDetail.Id,
            InvoiceId = r.InvoiceDetail.InvoiceId
           }
           : null,
        InvoiceId = r.InvoiceId,
        Review = r.Review,
        Score = r.Score,
        RatingTime = r.RatingTime,
        Status = r.Status,
        User = new User { UserName = r.User.UserName, FirstName = r.User.FirstName, LastName = r.User.LastName }


       })
       .ToListAsync();
   return Ok(ratings);
  }

  // GET: api/Ratings/5
  [HttpGet("{id}")]
        public async Task<ActionResult<Rating>> GetRating(int id)
        {
            var rating = await _context.Ratings.FindAsync(id);

            if (rating == null)
            {
                return NotFound();
            }

            return rating;
        }

        // PUT: api/Ratings/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutRating(int id, Rating rating)
        {
            if (id != rating.Id)
            {
                return BadRequest();
            }

            _context.Entry(rating).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!RatingExists(id))
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
  [HttpPut("{id}/admin")]
  public async Task<IActionResult> PutRatingApproval(int id)
  {
   var rating = await _context.Ratings.FindAsync(id);
   if (rating == null)
   {
    return NotFound();
   }
   rating.Status = true;
   _context.Ratings.Update(rating);

   try
   {
    await _context.SaveChangesAsync();
   }
   catch (DbUpdateConcurrencyException)
   {
    if (!RatingExists(id))
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
  [HttpPut("{id}/DeleteContent")]
  public async Task<IActionResult> DeleContent(int id)
  {
   var rating = await _context.Ratings.FindAsync(id);
   if (rating == null)
   {
    return NotFound();
   }
   rating.Review = null;
   _context.Ratings.Update(rating);

   try
   {
    await _context.SaveChangesAsync();
   }
   catch (DbUpdateConcurrencyException)
   {
    if (!RatingExists(id))
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

  // POST: api/Ratings
  // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
  [HttpPost]
        public async Task<ActionResult<Rating>> PostRating(Rating rating)
        {
           
            _context.Ratings.Add(rating);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetRating", new { id = rating.Id }, rating);
        }

        // DELETE: api/Ratings/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteRating(int id)
        {
            var rating = await _context.Ratings.FindAsync(id);
            if (rating == null)
            {
                return NotFound();
            }

            _context.Ratings.Remove(rating);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool RatingExists(int id)
        {
            return _context.Ratings.Any(e => e.Id == id);
        }
    }
}
