using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using API_Server.Data;
using API_Server.Models;
using static API_Server.Controllers.ProductDetailsController;
using Microsoft.AspNetCore.Hosting;
using System.Xml.Linq;

namespace API_Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductDetailsController : ControllerBase
    {
        private readonly APIServerContext _context;
        private readonly IWebHostEnvironment _webHostEnvironment;


  public ProductDetailsController(APIServerContext context, IWebHostEnvironment webHostEnvironmen)
        {
            _context = context;
       _webHostEnvironment = webHostEnvironmen;
      }
  public class PromotionDTO
  {
   public int Id { get; set; }
   public string Description { get; set; }

   public int Value { get; set; }
   public string Promotiontype { get; set; }
   public string Promotioncode { get; set; }

   public DateTime DateStart { get; set; }

   public DateTime DateEnd { get; set; }

   public bool Status { get; set; }

  }

  public class ProductDetailDto
  {
   public int id { get; set; }
   public int ProductId { get; set; }
   public string SKU { get; set; }
   public string Name { get; set; }
   public string Description { get; set; }
   public int ProductTypeId { get; set; }
   public string ProductTypeName { get; set; }
   public int ManufacturerId { get; set; }
   public string ManufacturerName { get; set; }
   public int SupplierId { get; set; }
   public string SupplierName { get; set; }
   public string ImgUrlMain { get; set; }
   public int ProductDetailId { get; set; }
   public int ColorId { get; set; }
   public string ColorName { get; set; }

   public int MemoryandStorageId { get; set; }
   public string RAM { get; set; }
   public string MemoryCapacity { get; set; }
   public int UnitPrice { get; set; }
   public int PurchasePrice { get; set; }
   public string ProductDetailImgUrl { get; set; }
   public bool ProductDetailStatus { get; set; }
   public int Quantity { get; set; }
   public List<PromotionDTO> Promotions { get; set; }
  }

        [HttpGet("SearchByName")]
        public async Task<ActionResult<IEnumerable<ProductDetailDto>>> SearchProductDetailsByName(string name)
        {
            // Tìm kiếm sản phẩm theo tên
            var productDetails = await _context.ProductDetails
                .Include(pd => pd.Product)
                    .ThenInclude(p => p.Promotions)
                .Include(pd => pd.Color)
                .Include(pd => pd.MemoryandStorage)
                .Where(pd => pd.Product.Name.Contains(name) && pd.Status && pd.Product.Status)
                .ToListAsync();

            // Nhóm và chọn phần tử đầu tiên trong mỗi nhóm
            var uniqueProductDetails = productDetails
                .GroupBy(pd => new { pd.ProductId, pd.MemoryandStorageId })
                .Select(g => g.First())
                .Select(pd => new ProductDetailDto
                {
                    ProductId = pd.Product.Id,
                    Name = pd.Product.Name,
                    ImgUrlMain = pd.Product.ImgUrlMain,
                    ProductDetailId = pd.Id,
                    ColorId = pd.ColorId,
                    ColorName = pd.Color.Name,
                    MemoryandStorageId = pd.MemoryandStorageId,
                    RAM = pd.MemoryandStorage.RAM,
                    MemoryCapacity = pd.MemoryandStorage.Storagecapacity,
                    UnitPrice = pd.UnitPrice,
                    PurchasePrice = pd.PurchasePrice,
                    ProductDetailImgUrl = pd.MainUrl,
                    ProductDetailStatus = pd.Status,
                    Quantity = pd.Quantity,
                    Promotions = pd.Product.Promotions.Select(promo => new PromotionDTO
                    {
                        Id = promo.Id,
                        Value = promo.Value,
                        Description = promo.Description,
                        DateStart = promo.DateStart,
                        DateEnd = promo.DateEnd,
                        Status = promo.Status
                    }).ToList()
                })
                .ToList();

            return Ok(uniqueProductDetails);
        }
  [HttpGet("CusProductDetailsview")]
  public async Task<ActionResult<IEnumerable<ProductDetail>>> GetCusProductDetailsview()
  {

   // Lấy dữ liệu từ cơ sở dữ liệu với các bao gồm cần thiết
   var productDetails = await _context.ProductDetails
       .AsNoTracking()
       .Include(pd => pd.Product)
           .ThenInclude(p => p.Promotions)
       .Where(pd => pd.Status && pd.Product.Status)
       .Select(pd => new
       {
        ProductId = pd.Product.Id,
        ImgUrlMain = pd.Product.ImgUrlMain,
        ProductDetailId = pd.Id,
        MemoryandStorageId = pd.MemoryandStorageId,
        RAM = pd.MemoryandStorage.RAM,
        MemoryCapacity = pd.MemoryandStorage.Storagecapacity,
        UnitPrice = pd.UnitPrice,
        ProductDetailImgUrl = pd.MainUrl,
        Promotions = pd.Product.Promotions.Select(promo => new PromotionDTO
        {
         Id = promo.Id,
         Value = promo.Value,
         Description = promo.Description,
         Promotiontype = promo.Promotiontype,
         DateEnd = promo.DateEnd,
        }).ToList()
       })
       .ToListAsync();

   return Ok(productDetails);
  }

  // GET: api/ProductDetails
  [HttpGet]
        public async Task<ActionResult<IEnumerable<ProductDetail>>> GetProductDetails()
        {

   // Lấy dữ liệu từ cơ sở dữ liệu với các bao gồm cần thiết
   var productDetails = await _context.ProductDetails
       .Include(pd => pd.Product)
           .ThenInclude(p => p.ProductType)
       .Include(pd => pd.Product)
           .ThenInclude(p => p.Manufacturer)
       .Include(pd => pd.Product)
           .ThenInclude(p => p.Supplier)
        .Include(pd => pd.Product)
           .ThenInclude(p => p.Promotions)
       .Include(pd => pd.Color)
       .Include(pd => pd.MemoryandStorage)
       .Where(pd => pd.Status && pd.Product.Status)
       .ToListAsync();

   // Nhóm và chọn phần tử đầu tiên trong mỗi nhóm
   var uniqueProductDetails = productDetails
       .GroupBy(pd => new { pd.ProductId, pd.MemoryandStorageId })
       .Select(g => g.First())
       .Select(pd => new ProductDetailDto
       {
        ProductId = pd.Product.Id,
        SKU = pd.Product.SKU,
        Name = pd.Product.Name,
        Description = pd.Product.Description,
        ProductTypeId = pd.Product.ProductTypeId,
        ProductTypeName = pd.Product.ProductType.Name,
        ManufacturerId = pd.Product.ManufacturerId,
        ManufacturerName = pd.Product.Manufacturer.Name,
        SupplierId = pd.Product.SupplierId,
        SupplierName = pd.Product.Supplier.Name,
        ImgUrlMain = pd.Product.ImgUrlMain,
        ProductDetailId = pd.Id,
        ColorId = pd.ColorId,
        ColorName = pd.Color.Name,
        MemoryandStorageId = pd.MemoryandStorageId,
        RAM = pd.MemoryandStorage.RAM,
        MemoryCapacity = pd.MemoryandStorage.Storagecapacity,
        UnitPrice = pd.UnitPrice,
        PurchasePrice = pd.PurchasePrice,
        ProductDetailImgUrl = pd.MainUrl,
        ProductDetailStatus = pd.Status,
        Promotions = pd.Product.Promotions.Select(promo => new PromotionDTO
        {
         Id = promo.Id,
         Value = promo.Value,
         Description = promo.Description,
         DateStart = promo.DateStart,
         DateEnd = promo.DateEnd,
         Status = promo.Status
        }).ToList()
       })
       .ToList();

   return Ok(uniqueProductDetails);
  }

  // GET: api/ProductDetails/5
   [HttpGet("{id}")]
   public async Task<ActionResult<ProductDetail>> GetProductDetail(int id)
   {
    var productdetail = await _context.ProductDetails.FindAsync(id);

    if (productdetail == null)
    {
     return NotFound();
    }

    return productdetail;
   }
  // thống kê sản phẩm tồn kho
  [HttpGet("getQuantityStockProduct")]
  public async Task<IActionResult> getQuantityStockProduct()
  {
   var query = await _context.ProductDetails
    .SumAsync(p => p.Quantity);
   return Ok(query);
  }


  [HttpGet("Product/{id}")]
    
        public async Task<ActionResult<ProductDetail>> GetProductDetails(int id)
        {
           var productDetails = await _context.ProductDetails
        .Include(pd => pd.Product)
        .ThenInclude(p => p.ProductType)
        .Include(pd => pd.Product)
        .ThenInclude(p => p.Manufacturer)
        .Include(pd => pd.Product)
        .ThenInclude(p => p.Supplier)
        .Include(pd => pd.Product)
        .ThenInclude(p => p.Promotions)
        .Include(pd => pd.Color)
        .Include(pd => pd.MemoryandStorage)
        .Where(p => p.Product.Id== id)
        .ToListAsync();

     var uniqueProductDetails = productDetails
      
      .Select(pd => new ProductDetailDto
      {
       id = pd.Id,
       ProductId = pd.Product.Id,
       SKU = pd.Product.SKU,
       Name = pd.Product.Name,
       Description = pd.Product.Description,
       ProductTypeId = pd.Product.ProductTypeId,
       ProductTypeName = pd.Product.ProductType.Name,
       ManufacturerId = pd.Product.ManufacturerId,
       ManufacturerName = pd.Product.Manufacturer.Name,
       SupplierId = pd.Product.SupplierId,
       SupplierName = pd.Product.Supplier.Name,
       ImgUrlMain = pd.Product.ImgUrlMain,
       ProductDetailId = pd.Id,
       ColorId = pd.ColorId,
       ColorName = pd.Color.Name,
       MemoryandStorageId = pd.MemoryandStorageId,
       RAM = pd.MemoryandStorage.RAM,
       MemoryCapacity = pd.MemoryandStorage.Storagecapacity,
       UnitPrice = pd.UnitPrice,
       ProductDetailImgUrl = pd.MainUrl,
       ProductDetailStatus = pd.Status,
       Quantity = pd.Quantity,
       Promotions = pd.Product.Promotions.Select(promo => new PromotionDTO
       {
        Id = promo.Id,
        Value = promo.Value,
        Description = promo.Description,
        DateStart = promo.DateStart,
        DateEnd = promo.DateEnd,
        Status = promo.Status
       }).ToList()
      })
      .ToList();

     return Ok(uniqueProductDetails);
    }

        // PUT: api/ProductDetails/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutProductDetail(int id, [FromForm] ProductDetail productDetail)
        {
            if (id != productDetail.Id)
            {
                return BadRequest();
            }

   var productdetail = await _context.ProductDetails.FindAsync(id);
   productdetail.ProductId = productDetail.ProductId;
   productdetail.ColorId = productDetail.ColorId;
   productdetail.MemoryandStorageId = productDetail.MemoryandStorageId;
   productdetail.UnitPrice = productDetail.UnitPrice;
   productdetail.PurchasePrice = productDetail.PurchasePrice;
  
   productdetail.Quantity = productDetail.Quantity;
   productdetail.Status = true;
   if (productDetail.FileImageByColor != null)
          {
             var newfileNameMain = Guid.NewGuid().ToString() + '-' + Path.GetExtension(productDetail.FileImageByColor.FileName);
            productdetail.MainUrl = newfileNameMain;

         

             string uploadPathMain = Path.Combine(_webHostEnvironment.WebRootPath, "Image", newfileNameMain);
             if (System.IO.File.Exists(uploadPathMain))
             {
              // Nếu tồn tại, xóa hoặc đổi tên tệp
              System.IO.File.Delete(uploadPathMain);
             }
             // Lưu file vào thư mục wwwroot
             using (var stream = new FileStream(uploadPathMain, FileMode.Create))
             {
              await productDetail.FileImageByColor.CopyToAsync(stream);
             }
             API_Server.Models.Image imagemain = new API_Server.Models.Image()
             {
              ProductId = productDetail.ProductId,
              ImgUrl = newfileNameMain,
              Status = true
             };
             _context.Images.Add(imagemain);
           }
   _context.ProductDetails.Update(productdetail);
   try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProductDetailExists(id))
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

        [HttpPut("Quantity/{id}")]
        public async Task<IActionResult> UpdateProductQuantity(int id, [FromBody] int newQuantity)
        {
            var productdetail = await _context.ProductDetails.FindAsync(id);
            if (productdetail == null)
            {
                return NotFound();
            }

            productdetail.Quantity = newQuantity;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProductDetailExists(id))
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

      [HttpPut("Quantity/Admin/{id}")]
      public async Task<IActionResult> UpdateProductResune(int id, [FromBody] int quantity)
      {
       var productdetail = await _context.ProductDetails.FindAsync(id);
       if (productdetail == null)
       {
        return NotFound();
       }

        productdetail.Quantity = productdetail.Quantity + quantity;

       try
       {
        await _context.SaveChangesAsync();
       }
       catch (DbUpdateConcurrencyException)
       {
        if (!ProductDetailExists(id))
        {
         return NotFound();
        }
        else
        {
         throw;
        }
       }

       return Ok(productdetail.Quantity);
      }


  // POST: api/ProductDetails
  // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
  [HttpPost]
        public async Task<ActionResult<ProductDetail>> PostProductDetail([FromForm]  ProductDetail PForm)
        {


   if (!ModelState.IsValid)
   {
    return BadRequest(ModelState);
   }

   if (PForm.FileImageByColor != null && PForm.FileImageByColor.Length > 0)
   {
    try
    {
     var newfileNameMain = Guid.NewGuid().ToString() + "-" + Path.GetExtension(PForm.FileImageByColor.FileName);

     ProductDetail productDetail = new ProductDetail()
     {
      ProductId = PForm.Id,
      ColorId = PForm.ColorId,
      MemoryandStorageId = PForm.MemoryandStorageId,
      UnitPrice = PForm.UnitPrice,
      PurchasePrice = PForm.PurchasePrice,
      MainUrl = newfileNameMain,
      Quantity = PForm.Quantity,
      Status = true,
     };

     _context.ProductDetails.Add(productDetail);

     string uploadPathMain = Path.Combine(_webHostEnvironment.WebRootPath, "Image", newfileNameMain);

     if (System.IO.File.Exists(uploadPathMain))
     {
      // Nếu tồn tại, xóa hoặc đổi tên tệp
      System.IO.File.Delete(uploadPathMain);
     }

     // Lưu file vào thư mục wwwroot
     using (var stream = new FileStream(uploadPathMain, FileMode.Create))
     {
      await PForm.FileImageByColor.CopyToAsync(stream);
     }

     API_Server.Models.Image imagemain = new API_Server.Models.Image()
     {
      ProductId = PForm.Id,
      ImgUrl = newfileNameMain,
      Status = true
     };

     _context.Images.Add(imagemain);

     await _context.SaveChangesAsync();

     return CreatedAtAction("GetProductDetail", new { id = productDetail.Id }, productDetail);
    }
    catch (Exception ex)
    {
     // Ghi log lỗi (nếu cần thiết)
     return StatusCode(500, $"Internal server error: {ex.Message}");
    }
   }

   return NotFound();
  }


  // DELETE: api/ProductDetails/5
  [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProductDetail(int id)
        {
            var productDetail = await _context.ProductDetails.FindAsync(id);
            if (productDetail == null)
            {
                return NotFound();
            }

            _context.ProductDetails.Remove(productDetail);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ProductDetailExists(int id)
        {
            return _context.ProductDetails.Any(e => e.Id == id);
        }
    }
}
