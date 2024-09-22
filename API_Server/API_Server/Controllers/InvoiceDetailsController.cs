using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using API_Server.Data;
using API_Server.Models;
using Humanizer;

namespace API_Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class InvoiceDetailsController : ControllerBase
    {
        private readonly APIServerContext _context;

        public InvoiceDetailsController(APIServerContext context)
        {
            _context = context;
        }
 
   // GET: api/InvoiceDetails
        [HttpGet]
        public async Task<ActionResult<IEnumerable<InvoiceDetail>>> GetInvoicesDetails()
        {
            return await _context.InvoicesDetails.ToListAsync();
        }

        // GET: api/InvoiceDetails/5
        [HttpGet("{id}")]
        public async Task<ActionResult<InvoiceDetail>> GetInvoiceDetail(int id)
        {
            var invoiceDetail = await _context.InvoicesDetails.FindAsync(id);

            if (invoiceDetail == null)
            {
                return NotFound();
            }

            return invoiceDetail;
        }
  // Lấy 10 sản phẩm bán chạy nhất
     [HttpGet("topProductDetail")]
     public async Task<ActionResult<IEnumerable<InvoiceDetail>>> GetBestSellProduct()
     {
   var query = (from invoiceDetail in _context.InvoicesDetails
               join productDetail in _context.ProductDetails on invoiceDetail.ProductDetailId equals productDetail.Id
               join product in _context.Products on productDetail.ProductId equals product.Id
               join color in _context.Colors on productDetail.ColorId equals color.Id
               join memoryandstorage in _context.MemoryAndStorages on productDetail.MemoryandStorageId equals memoryandstorage.Id
               group new { invoiceDetail, productDetail, product } by new { color.Name, memoryandstorage.RAM, memoryandstorage.Storagecapacity, productDetail.UnitPrice,
               product.Id, invoiceDetail.Quantity} into g
               select new
               {
                ProductDetailId = g.Key.Id,
                Color = g.Key.Name,
                RAM = g.Key.RAM,
                ROM = g.Key.Storagecapacity,
                UnitPrice = g.Key.UnitPrice,
                Quantity = g.Key.Quantity,
                ProductName = g.Select(x => x.product.Name).FirstOrDefault()


               }).ToList();
   var listProduct = query.GroupBy(item => item.ProductDetailId)
                           .Select(group => new
                           {
                            ProductDetailId = group.Key,
                            UnitPrice = group.Select(x => x.UnitPrice).FirstOrDefault(),
                            ProductName = group.Select(x => x.ProductName).FirstOrDefault(),
                            RAM = group.Select(x => x.RAM).FirstOrDefault(),
                            ROM = group.Select(x => x.ROM).FirstOrDefault(),
                            Color = group.Select(x => x.Color).FirstOrDefault(),
                            Quantity = group.Sum(x => x.Quantity)
                           }
                           ).OrderByDescending(x => x.Quantity).Take(10);
               
       return Ok(listProduct);
     }
  [HttpGet("{id}/GetByInvoiceId")]
   public async Task<IActionResult> GetInvoiceDetails(int id)
   {
    var invoiceDetails = await _context.InvoicesDetails
          .Where(invDetail => invDetail.InvoiceId == id)
          .Select(invDetail => new
          {
           Invoice = _context.Invoices
                 .Where(inv => inv.Id == invDetail.InvoiceId)
                 .Select(inv => new
                 {
                  inv.Id,
                  inv.PayCode,
                  Payment = _context.Pays
                  .Where(p => p.Id == inv.PayId)
                  .Select( p => p.PayType)
                  .FirstOrDefault(),
                  UserName = _context.Users
                  .Where(p => p.Id == inv.UserId)
                  .Select(p => new {
                   p.LastName , 
                   p.FirstName
                  })
                  .FirstOrDefault(),
                  inv.IssuedDate,
                  inv.DeliveryTime,
                  inv.SubTotal,
                  inv.Total,
                  inv.ShippingAddress,
                  inv.ShippingPhone,
                  OrderStatus = _context.OrderStatuses
                  .Where(p => p.Id == inv.OrderStatusId)
                  .Select( p => p.Name)
                  .FirstOrDefault(),
                  inv.Status
                 }).FirstOrDefault(),
           InvoiceDetail = invDetail,
           ProductDetail = _context.ProductDetails
                  .Where(productDetail => productDetail.Id == invDetail.ProductDetailId)
                  .Select(productDetail => new
                  {
                   ProductDetailId = productDetail.Id,
                   ProductId = productDetail.ProductId,
                   ProductImage = productDetail.MainUrl,
                   price = productDetail.UnitPrice,
                   productStorage  = _context.MemoryAndStorages
                   .Where(p => p.Id == productDetail.MemoryandStorageId)
                   .Select(memory => new
                   {
                    memory.RAM,
                    memory.Storagecapacity
                   }).FirstOrDefault(),
                   ProductColor = _context.Colors
                   .Where(p => p.Id == productDetail.ColorId)
                   .Select(p => p.Name)
                   .FirstOrDefault(),
                   ProductName = _context.Products
                         .Where(p => p.Id == productDetail.ProductId)
                         .Select(product => product.Name)
                         .FirstOrDefault(),
                   Promotions = _context.Promotions
                          .Where(promotion => promotion.ProductId == productDetail.ProductId
                          && promotion.DateStart <= invDetail.Invoice.IssuedDate && promotion.DateEnd >= invDetail.Invoice.IssuedDate)
                
                          .ToList() 

                  }).FirstOrDefault(),

          }).ToListAsync();

    return Ok( invoiceDetails);
   }
  // thống kê doanh thu theo tháng
  [HttpGet("monthly")]
  public async Task<IActionResult> GetMonthlyRevenue(DateTime? startDate, DateTime? endDate)
  {
   var query = await _context.InvoicesDetails
                   .Include(invd => invd.Invoice)
                   .Include(invd => invd.ProductDetail)
                   .Where(invd => (!startDate.HasValue || invd.Invoice.IssuedDate >= startDate.Value) &&
                                  (!endDate.HasValue || invd.Invoice.IssuedDate <= endDate.Value.AddDays(1)))
                   .Where(invd => invd.Invoice.OrderStatusId == 4)
                   .GroupBy(invd => new
                   {
                    Year = invd.Invoice.IssuedDate.Year,
                    Month = invd.Invoice.IssuedDate.Month,
                   })
                   .Select(invd => new
                   {
                    invd.Key.Year,
                    invd.Key.Month,
                    MonthlySell = invd.Sum(i => i.Invoice.Total),
                    MonthlyCapital = invd.Sum(i => i.ProductDetail.PurchasePrice * i.Quantity),

                   })
                   .OrderBy(r => r.Year)
                   .ThenBy(r => r.Month)
                   .ToListAsync();
   return Ok(query);
  }

  // thống kê daonh thu theo ngày
  [HttpGet("daily")]
  public async Task<IActionResult> GetDailyRevenue(DateTime? startDate, DateTime? endDate)
  {
   var query = await _context.InvoicesDetails
                   .Include(invd => invd.Invoice)
                   .Include(invd => invd.ProductDetail)
                   .Where(invd => (!startDate.HasValue || invd.Invoice.IssuedDate >= startDate.Value) &&
                                  (!endDate.HasValue || invd.Invoice.IssuedDate <= endDate.Value.AddDays(1)) &&
                                    invd.Invoice.OrderStatusId == 4)
                   
                   .GroupBy(invd =>invd.Invoice.IssuedDate.Date)
                   .Select(invd => new
                   {
                    OrderDate = invd.Key,
                    DailySell = invd.Sum(i => i.Invoice.Total),
                    DailyCapital = invd.Sum(i => i.ProductDetail.PurchasePrice * i.Quantity),

                   })
                   .OrderBy(r => r.OrderDate)
                   .ToListAsync();
   return Ok(query);
  }

  // thống kê doanh thu theo loại sản phẩm
  [HttpGet("productType")]
  public async Task<IActionResult> GetProductTypeRevenue(int id)
  {
   var query = from invoiceDetail in _context.InvoicesDetails
               join invoice in _context.Invoices on invoiceDetail.InvoiceId equals invoice.Id
               join productDetail in _context.ProductDetails on invoiceDetail.ProductDetailId equals productDetail.Id
               join product in _context.Products on productDetail.ProductId equals product.Id
               join productType in _context.ProductTypes on product.ProductTypeId equals productType.Id
               where productType.Id == id
               group new { invoiceDetail, invoice } by new { productType.Id, productType.Name } into g
               select new
               {
                ProductTypeId = g.Key.Id,
                ProductTypeName = g.Key.Name,
                TotalRevenue = g.Sum(x => x.invoice.Total)
               };

   var result = await query.ToListAsync();
   

   return Ok(result);
  }


  // PUT: api/InvoiceDetails/5
  // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
  [HttpPut("{id}")]
        public async Task<IActionResult> PutInvoiceDetail(int id, InvoiceDetail invoiceDetail)
        {
            if (invoiceDetail == null)
            {
                return BadRequest();
            }

            var invoice = await _context.InvoicesDetails.FindAsync(id);
            if(invoice == null)
            {
    return NotFound();
            } 
    
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!InvoiceDetailExists(id))
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

        // POST: api/InvoiceDetails
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<InvoiceDetail>> PostInvoiceDetail(InvoiceDetail invoiceDetail)
        {
           InvoiceDetail invoiceDteailp = new InvoiceDetail()
           {
            InvoiceId = invoiceDetail.InvoiceId,
            ProductDetailId = invoiceDetail.ProductDetailId,
            Quantity = invoiceDetail.Quantity,
            UnitPrice = invoiceDetail.UnitPrice,

           };
            _context.InvoicesDetails.Add(invoiceDteailp);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetInvoiceDetail", new { id = invoiceDteailp.Id }, invoiceDteailp);
        }

        // DELETE: api/InvoiceDetails/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteInvoiceDetail(int id)
        {
            var invoiceDetail = await _context.InvoicesDetails.FindAsync(id);
            if (invoiceDetail == null)
            {
                return NotFound();
            }

            _context.InvoicesDetails.Remove(invoiceDetail);
           await _context.SaveChangesAsync();
          

            return NoContent();
        }

        private bool InvoiceDetailExists(int id)
        {
            return _context.InvoicesDetails.Any(e => e.Id == id);
        }
    }
}
