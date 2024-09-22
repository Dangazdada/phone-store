using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using API_Server.Data;
using API_Server.Models;
using System.Xml.Linq;
using static System.Runtime.CompilerServices.RuntimeHelpers;
using static API_Server.Controllers.InvoiceDetailsController;

namespace API_Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class InvoicesController : ControllerBase
    {
        private readonly APIServerContext _context;
        private readonly string _connectionString;

  public InvoicesController(APIServerContext context, IConfiguration configuration)
        {
            _context = context;
            _connectionString = configuration.GetConnectionString("DefaultConnection");
       }
  public class InvoiceDTO
  {
   public int InvocieDetailId { set; get; }
   public int Quantity { set; get; }
   public int Total { set; get; }
   public int SubTotal { set; get; }
  }

  // GET: api/Invoices
  [HttpGet]
        public async Task<ActionResult<IEnumerable<Invoice>>> GetInvoices()
        {
            return await _context.Invoices
                        .OrderByDescending(inv => inv.IssuedDate)
                        .ToListAsync();
        }
   
    [HttpGet]
    [Route("Search")]
    public async Task<ActionResult <IEnumerable<Invoice>>> GetInvoices(string payCode)
    {
     var invoice = await _context.Invoices
           .Where(p => string.IsNullOrEmpty(payCode) || p.PayCode.Contains(payCode))
           .ToListAsync();
     return invoice;
        
    }

    [HttpGet]
    [Route("FilterByStatus")]
    public async Task<ActionResult<IEnumerable<Invoice>>> GetInvoices(int oderStatus)
  {
   var invoice = await _context.Invoices
                       .Where(inv => inv.OrderStatusId == oderStatus)
                       .OrderByDescending(inv => inv.IssuedDate)
                       .ToListAsync();
   return invoice;
  }

  // GET: api/Invoices/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Invoice>> GetInvoice(int id)
        {
            var invoice = await _context.Invoices.FindAsync(id);

            if (invoice == null)
            {
                return NotFound();
            }

            return invoice;
        }

  // PUT: api/Invoices/5
  // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
       [HttpPut("{id}/ChangeOrderStatus")]  
       public async Task<IActionResult> ChangeOrderStatus(int id, Invoice invoice)
       {
        if (invoice == null)
        {
         return NotFound();
        }
        var invoice1 = await _context.Invoices.FindAsync(id);
        invoice1.OrderStatusId = invoice.OrderStatusId;
        _context.Invoices.Update(invoice1);
        try
        {
         await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
         if (!InvoiceExists(id))
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
  // Lấy đơn hàng theo thời gian
  [HttpGet("getinvoicebydaily")]
  public async Task<IActionResult> Getinvoicebydaily(DateTime? date)
  {
   var query = _context.Invoices       
       .Where(i => (!date.HasValue || i.IssuedDate.Date == date.Value.Date))
       .Where(p => p.OrderStatusId == 4)
       .Select(i => new
       {
        Id = i.Id,
        FirstName = i.User.FirstName,
        LastName = i.User.LastName,
        IssuedDate = i.IssuedDate,
        Total = i.Total,
       }
       );


   return Ok(await query.ToListAsync());
  }
  [HttpGet("getinvoicebymonthly")]
  public async Task<IActionResult> Getinvoicebymonthly(int month , int year)
  {
   if(month == null)
   {
    return BadRequest();
   } 
   var query = _context.Invoices
  
       .Where(i =>  i.IssuedDate.Month == month && i.IssuedDate.Year == year)
       .Where(p => p.OrderStatusId == 4)
       .Select(i => new
       {
        Id = i.Id,
        FirstName = i.User.FirstName,
        LastName = i.User.LastName,
        IssuedDate = i.IssuedDate,
        Total = i.Total,

       }
       );


   return Ok(await query.ToListAsync());
  }
  //Thống kê theo thời gian
  [HttpGet("daily")]
  public async Task<IActionResult> GetDailyRevenue(DateTime? startDate, DateTime? endDate)
  {
   var query = _context.Invoices
       .Where(i => (!startDate.HasValue || i.IssuedDate >= startDate.Value) &&
                   (!endDate.HasValue || i.IssuedDate < endDate.Value.AddDays(1)))
         .Where(p => p.OrderStatusId == 4)

       .GroupBy(i => i.IssuedDate.Date)
       .Select(g => new
       {
        OrderDate = g.Key,
        DailyRevenue = g.Sum(i => i.Total),
        DailySubTotal = g.Sum(i => i.SubTotal)
       })
       .OrderBy(r => r.OrderDate);

   return Ok(await query.ToListAsync());
  }
  [HttpGet("monthly")]
  public async Task<IActionResult> GetMonthlyRevenue(DateTime? startDate, DateTime? endDate)

  {
   var query = _context.Invoices

            .Where(i => i.IssuedDate >= startDate && i.IssuedDate <= endDate && i.OrderStatusId == 4)

            .GroupBy(id => new { Month = id.IssuedDate.Month, Year = id.IssuedDate.Year })
            .Select(g => new
            {
             Month = g.Key.Month,
             Year = g.Key.Year,
             TotalRevenue = g.Sum(id => id.Total),
            });

   return Ok(query);

  }


  //public async Task<IActionResult> GetMonthlyRevenue(DateTime? startDate, DateTime? endDate)

  //{
  // var query = _context.Invoices
  //      .Where(inv => inv.IssuedDate >= startDate && inv.IssuedDate <= endDate && inv.OrderStatusId == 4)
  //      .Select(inv => new
  //      {
  //       Invoice = inv,
  //       TotalPurchasePrice = _context.InvoicesDetails
  //                                  .Where(id => id.InvoiceId == inv.Id)
  //                                  .Select(id => id.ProductDetail.PurchasePrice * id.Quantity)
  //                                  .ToList()
  //                                    // Sum of all PurchasePrices from all ProductDetails in InvoiceDetails
  //      })
  //      .ToList()
  //      .GroupBy(item => new { item.Invoice.IssuedDate.Month, item.Invoice.IssuedDate.Year })
  //      .Select(g => new
  //      {
  //       Month = g.Key.Month,
  //       Year = g.Key.Year,
  //       TotalRevenue = g.Sum(item => item.Invoice.Total),
  //       TotalPurchasePrice = g.Sum(item => item.TotalPurchasePrice)
  //      })
  //      .ToList();

  // return Ok(query);

  //}
  [HttpGet("quarterly")]
  public async Task<IActionResult> GetQuarterlyRevenue(DateTime? startDate, DateTime? endDate)
  {
   var query = _context.Invoices
       .Where(i => (!startDate.HasValue || i.IssuedDate >= startDate.Value) &&
                   (!endDate.HasValue || i.IssuedDate < endDate.Value.AddDays(1)))
       .GroupBy(i => new
       {
        Year = i.IssuedDate.Year,
        Quarter = (i.IssuedDate.Month - 1) / 3 + 1
       })
       .Select(g => new
       {
        g.Key.Year,
        g.Key.Quarter,
        QuarterlyRevenue = g.Sum(i => i.Total)
       })
       .OrderBy(r => r.Year)
       .ThenBy(r => r.Quarter);

   return Ok(await query.ToListAsync());
  }
  [HttpGet("yearly")]
  public async Task<IActionResult> GetYearlyRevenue(DateTime? startDate, DateTime? endDate)
  {
   var query = _context.Invoices
       .Where(i => (!startDate.HasValue || i.IssuedDate >= startDate.Value) &&
                   (!endDate.HasValue || i.IssuedDate < endDate.Value.AddDays(1)))
       .GroupBy(i => i.IssuedDate.Year)
       .Select(g => new
       {
        Year = g.Key,
        YearlyRevenue = g.Sum(i => i.Total)
       })
       .OrderBy(r => r.Year);

   return Ok(await query.ToListAsync());
  }

  // thống kê số lượng đơn hàng
  [HttpGet("countAll")]
  public async Task<IActionResult> GetOrderQuantityAll()
  {
   var query = await _context.Invoices
    .CountAsync();

   return Ok(query);
  }


  //thống kê khách hàng mới và khách hàng quay lại
  [HttpGet("customerStats")]
  public async Task<IActionResult> GetCustomerStatistics(DateTime? startDate, DateTime? endDate)
  {
   // Lấy tất cả các hóa đơn trong khoảng thời gian đã chỉ định
   var invoices = _context.Invoices.AsQueryable();
   if (startDate.HasValue)
   {
    invoices = invoices.Where(i => i.IssuedDate >= startDate.Value);
   }
   if (endDate.HasValue)
   {
    invoices = invoices.Where(i => i.IssuedDate <= endDate.Value);
   }

   // Lấy danh sách các khách hàng
   var customerOrders = await invoices
       .GroupBy(i => i.UserId)
       .Select(g => new
       {
        UserId = g.Key,
        FirstOrderDate = g.Min(i => i.IssuedDate),
        OrderCount = g.Count()
       })
       .ToListAsync();

   // Xác định khách hàng mới và khách hàng quay lại
   var newCustomers = customerOrders.Where(c => c.FirstOrderDate >= startDate && c.FirstOrderDate <= endDate).Count();
   var returningCustomers = customerOrders.Where(c => c.FirstOrderDate < startDate && c.OrderCount > 1).Count();

   // Trả về kết quả
   return Ok(new
   {
    NewCustomers = newCustomers,
    ReturningCustomers = returningCustomers
   });
  }
  [HttpGet("countByOrderStatus")]
  public async Task<IActionResult> GetOrderQuantityByOrderStatus( int id)
  {
   var query = await _context.Invoices
    .Where( p => p.OrderStatusId == id)
    .CountAsync();

   return Ok(query);
  }

        [HttpGet("Status")]
        public async Task<ActionResult> GetInvoicesStatus(int id, string username)
        {
            var result = await (from invoices in _context.Invoices
                                join invoicedetail in _context.InvoicesDetails on invoices.Id equals invoicedetail.InvoiceId
                                join productdetails in _context.ProductDetails on invoicedetail.ProductDetailId equals productdetails.Id
                                join color in _context.Colors on productdetails.ColorId equals color.Id
                                join product in _context.Products on productdetails.ProductId equals product.Id
                                where invoices.OrderStatusId == id && invoices.UserId == username
                                group new { invoices, productdetails, color, product, invoicedetail } by new
                                {
                                    invoices.Id,
                                    invoices.Total,
                                    invoices.IssuedDate,
                                    invoices.OrderStatusId,
                                    invoices.ShippingAddress,
                                    invoices.ShippingPhone
                                } into g
                                select new
                                {
                                    InvoiceId = g.Key.Id,
                                    TotalPrice = g.Key.Total,
                                    OrderDate = g.Key.IssuedDate,
                                    OrderStatusId = g.Key.OrderStatusId,
                                    shippingAddress = g.Key.ShippingAddress,
                                    shippingPhone = g.Key.ShippingPhone,
                                    Products = g.Select(p => new
                                    {
                                        ProductDetailId = p.productdetails.Id,
                                        Productdetailquantity = p.productdetails.Quantity,
                                        Image = p.productdetails.MainUrl,
                                        ProductName = p.product.Name,
                                        ProductColor = p.color.Name,
                                        Rom = p.productdetails.MemoryandStorage.Storagecapacity,
                                        Ram = p.productdetails.MemoryandStorage.RAM,
                                        UnitPrice = p.productdetails.UnitPrice,
                                        Quantity = p.invoicedetail.Quantity,
                                        invoiceDetail = p.invoicedetail.Id,
                                        invoiceiddetail =p.invoicedetail.InvoiceId
                                    }).ToList()
                                }).ToListAsync();

            return Ok(result);
        }


        [HttpPut("{id}/Update")]
  public async Task<IActionResult> PutInvoice(int id, [FromBody] List<InvoiceDTO> invoices)
  {
   if (invoices == null)
   {
    return BadRequest();
   }

   var invoice = await _context.Invoices.FindAsync(id);
   if (invoice == null)
   {
    return NotFound();
   }else
   {
    invoice.Total = invoices[0].Total;
    invoice.SubTotal = invoices[0].SubTotal;
    _context.Invoices.Update(invoice);
   } 
   foreach(var item in invoices)
   {
    var invoiceDetail = await _context.InvoicesDetails.FindAsync(item.InvocieDetailId);
    if (invoiceDetail == null)
    {
     return NotFound();
    }
    else
    {
     invoiceDetail.Quantity = item.Quantity;
     _context.InvoicesDetails.Update(invoiceDetail);
    }
   } 
   

   try
   {
    await _context.SaveChangesAsync();
   }
   catch (DbUpdateConcurrencyException)
   {
    if (!InvoiceExists(id))
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
  [HttpPut("{id}")]
        public async Task<IActionResult> PutInvoice(int id, Invoice invoice)
        {
            if (invoice == null)
            {
                return BadRequest();
            }

          var invoicec = await _context.Invoices.FindAsync(id);

           invoicec.ShippingAddress = invoice.ShippingAddress;
           invoicec.ShippingPhone = invoice.ShippingPhone;
           invoicec.OrderStatusId = invoice.OrderStatusId;
           invoicec.PayId = invoice.PayId;
           if( invoice.OrderStatusId == 4 || invoice.OrderStatusId == 6)
           {
            invoicec.DeliveryTime = DateTime.UtcNow.ToLocalTime();
           }
           _context.Invoices.Update(invoicec);

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!InvoiceExists(id))
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

        // POST: api/Invoices
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Invoice>> PostInvoice(Invoice invoice)
        {
           Invoice invoicep = new Invoice()
           {
            UserId = invoice.UserId,
            IssuedDate = invoice.IssuedDate,
            ShippingAddress = invoice.ShippingAddress,
            ShippingPhone = invoice.ShippingPhone,
            Total = invoice.Total,
            SubTotal = invoice.SubTotal,
            OrderStatusId = 1,
            PayId = invoice.PayId,
            PayCode = DateTime.UtcNow.Ticks.ToString(),
            Status = true

           };
            _context.Invoices.Add(invoicep);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetInvoice", new { id = invoicep.Id }, invoicep);
        }

        // DELETE: api/Invoices/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteInvoice(int id)
        {
            var invoice = await _context.Invoices.FindAsync(id);
            if (invoice == null)
            {
                return NotFound();
            }
            invoice.OrderStatusId = 5;

            _context.Invoices.Update(invoice);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool InvoiceExists(int id)
        {
            return _context.Invoices.Any(e => e.Id == id);
        }
    }
}
