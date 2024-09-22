using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using API_Server.Data;
using API_Server.Models;
using NuGet.Packaging.Signing;

namespace API_Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductViewsController : ControllerBase
    {
        private readonly APIServerContext _context;

        public ProductViewsController(APIServerContext context)
        {
            _context = context;
        }

        // GET: api/ProductViews
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ProductView>>> GetProductViews()
        {
            return await _context.ProductViews.ToListAsync();
        }

        // GET: api/ProductViews/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ProductView>> GetProductView(int id)
        {
            var productView = await _context.ProductViews.FindAsync(id);

            if (productView == null)
            {
                return NotFound();
            }

            return productView;
        }

  //[HttpGet("Top10")]
  //public async Task<ActionResult<ProductView>>  GetTop10ProductViews()
  //{
  // // Lấy top 10 sản phẩm có lượt truy cập nhiều nhất
  // var topProducts = await _context.ProductViews
  //     .GroupBy(pv => pv.ProductDetailId)
  //     .Select(g => new
  //     {
  //      ProductDetailId = g.Key,
  //      productDetail = _context.ProductDetails
  //      .Where(pd => pd.Id == g.Key)
  //      .Select(pd => new {
  //       pd.ProductId,
  //       Storage = _context.MemoryAndStorages
  //       .Where(p => p.Id == pd.MemoryandStorageId)
  //       .Select(p => new
  //       {
  //        ram = p.RAM,
  //        rom = p.Storagecapacity
  //       })
  //       .FirstOrDefault(),
  //       ProductName = _context.Products
  //       .Where(p => p.Id == pd.ProductId)
  //       .Select(p => p.Name)
  //       .FirstOrDefault()
  //      })
  //      .FirstOrDefault(),


  //      TotalViews = g.Count()
  //     })
  //     .OrderByDescending(g => g.TotalViews)
  //     .Take(10)
  //     .ToListAsync();



  // return Ok(topProducts);
  //}
 


  [HttpGet("Top10")]
  public async Task<ActionResult<ProductView>> GetTop10ProductViews()
  {
   var topProducts = await _context.ProductViews
       .GroupBy(pv => pv.ProductDetailId)
       .Select(g => new
       {
        ProductDetailId = g.Key,
        TotalViews = g.Count()
       })
       .OrderByDescending(g => g.TotalViews)
       .Take(10)
       .Join(
           _context.ProductDetails,
           tp => tp.ProductDetailId,
           pd => pd.Id,
           (tp, pd) => new
           {
            ProductDetailId = tp.ProductDetailId,
            ProductName = pd.Product.Name,
            RAM = _context.MemoryAndStorages
                       .Where(ms => ms.Id == pd.MemoryandStorageId)
                       .Select(ms => ms.RAM)
                       .FirstOrDefault(),
            ROM = _context.MemoryAndStorages
                       .Where(ms => ms.Id == pd.MemoryandStorageId)
                       .Select(ms => ms.Storagecapacity)
                       .FirstOrDefault(),
            TotalViews = tp.TotalViews
           }
       )
       .ToListAsync();

   return Ok(topProducts);
  }




  // PUT: api/ProductViews/5
  // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
  [HttpPut("{id}")]
        public async Task<IActionResult> PutProductView(int id, ProductView productView)
        {
            if (id != productView.Id)
            {
                return BadRequest();
            }

            _context.Entry(productView).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProductViewExists(id))
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

        // POST: api/ProductViews
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<ProductView>> PostProductView(int productDetailId)
        {

           if(productDetailId == null)
             {
              return BadRequest();
             }
            ProductView productView = new ProductView()
            {
             ProductDetailId = productDetailId,
             TimeStamp = DateTime.UtcNow.ToLocalTime(),
            };
            _context.ProductViews.Add(productView);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetProductView", new { id = productView.Id }, productView);
        }

        // DELETE: api/ProductViews/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProductView(int id)
        {
            var productView = await _context.ProductViews.FindAsync(id);
            if (productView == null)
            {
                return NotFound();
            }

            _context.ProductViews.Remove(productView);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ProductViewExists(int id)
        {
            return _context.ProductViews.Any(e => e.Id == id);
        }
    }
}
