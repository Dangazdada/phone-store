using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using API_Server.Data;
using API_Server.Models;
using System.Text.Json.Serialization;
using System.Text.Json;
using System.Drawing;
using Microsoft.IdentityModel.Tokens;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;
using Microsoft.AspNetCore.Hosting;
using Microsoft.CodeAnalysis;
using System.ComponentModel.DataAnnotations.Schema;
using Newtonsoft.Json;
using System.Drawing.Printing;
using static API_Server.Controllers.ProductsController;

namespace API_Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly APIServerContext _context;
        private readonly IWebHostEnvironment _webHostEnvironment;

        public ProductsController(APIServerContext context, IWebHostEnvironment webHostEnvironment)
        {
            _context = context;
            _webHostEnvironment = webHostEnvironment;
        }
  public class UpdateMainImage
  {
   public IFormFile ImageMain { get; set; }
  }
  public class ChangeFileImage
  {
   public int id { get; set; }
   public int[] deleteId { get; set; }
   public string UpdateImagesJson { get; set; }
   public List<IFormFile> ImageFilesChange { get; set; }
   [NotMapped]
   public List<UpdateImage> UpdateImages { get; set; }


  }
  public class UpdateImage
  {
   public int Id { get; set; }
   public string Path { get; set; }

  }
  public class AddImage
  {
   public int id { get; set; }
   public string name { get; set; }
   public List<IFormFile> ImageFilesAddChange { get; set; }

  }
    public class Specification
    {
        public int Id { get; set; }
        public Screen Screen { get; set; }
        public BatteryandCharger BatteryandCharger { get; set; }
    }

    public class Screen
    {
        public int Id { get; set; }
        public int Widescreen { get; set; }
    }

    public class BatteryandCharger
    {
        public int Id { get; set; }
        public int MaximumChargingSupport { get; set; }
    }
        private async Task<int> GetLastId()
  {
   var lastImage = await _context.Images.OrderByDescending(p => p.Id)
       .Select(p => p.Id)
       .FirstOrDefaultAsync();
   return lastImage;
  }




  // GET: api/Products
  [HttpGet]
        public async Task<ActionResult<IEnumerable<Product>>> GetProducts()
        {
            var productsWithImages = await _context.Products
                    .Include(p => p.Images)
                    .Include( p => p.Manufacturer)
                    .Include(p => p.Supplier)
                    .Include(p => p.ProductType)
                    .Include(p => p.ProductDetails)
                    .Where(p => p.Status)

                    .Select(p => new
                    {
                        id = p.Id,
                        sku = p.SKU,
                        name = p.Name,
                        description = p.Description,
                        producttype = p.ProductType.Name,
                        supplier = p.Supplier.Name,
                        manufacturer = p.Manufacturer.Name,
                        imageurl = p.ImgUrlMain,
                        productdetail = p.ProductDetails,
                        image = p.Images,
                    })
                    .ToListAsync();

            return Ok(productsWithImages);

            //return await _context.Products.ToListAsync();
        }
  [HttpGet]
  [Route("Memories")]
  public async Task<ActionResult<IEnumerable<Product>>> GetProductList()
    {
   var options = new JsonSerializerOptions
   {
    ReferenceHandler = ReferenceHandler.Preserve,
    // Cấu hình các tùy chọn JSON khác nếu cần
   };

   var products = await _context.Products
       .Include(p => p.ProductDetails)
    
   
       .ToListAsync();

   //var uniqueProducts = products
   //    .SelectMany(p => p.ProductDetails
   //        .GroupBy(pd => pd.MemoryandStorageId)
   //        .Select(g => g.First())
   //        .Select(pd => new Product
   //        {
   //         Id = p.Id,
   //         SKU = p.SKU,
   //         Name = p.Name,
   //         Description = p.Description,
   //         ProductTypeId = p.ProductTypeId,
   //         ProductType = p.ProductType,
   //         ManufacturerId = p.ManufacturerId,
   //         Manufacturer = p.Manufacturer,
   //         SupplierId = p.SupplierId,
   //         Supplier = p.Supplier,
   //         ImgUrlMain = p.ImgUrlMain,
   //         Status = p.Status,
   //         ProductDetails = new List<ProductDetail> { pd }
   //        }))
   //    .ToList();

   return Ok(products);

   //return await _context.Products.ToListAsync();
  }
  [HttpGet]
        [Route("search")]
        public async Task<ActionResult<IEnumerable<Product>>> GetProducts(string Name)
        {
   var product = await _context.Products
           .Include(p => p.Images)
           .Include(p => p.Manufacturer)
           .Include(p => p.Supplier)
           .Include(p => p.ProductType)
       .Where(p => string.IsNullOrEmpty(Name) || p.Name.Contains(Name))
       .Where(p => p.Status)
                 .Select(p => new
                 {
                     id = p.Id,
                     sku = p.SKU,
                     name = p.Name,
                     description = p.Description,
                     producttype = p.ProductType.Name,
                     supplier = p.Supplier.Name,
                     manufacturer = p.Manufacturer.Name,
                     imageurl = p.ImgUrlMain,
                     image = p.Images

                    
                 })
                    .ToListAsync();
               
            return Ok (product);
        }
        [HttpGet]
        [Route("searchs")]
        public async Task<ActionResult<IEnumerable<Product>>> GetProducts(string Name, string producttype, string supplier,  string manufacture)
        {

            var product =  _context.Products
               .Include(p => p.ProductType)
               .Include(p => p.Supplier)
               .Include(p => p.Manufacturer)
               .Where(p =>
                   (string.IsNullOrEmpty(Name) || p.Name.Contains(Name)) &&
                   (string.IsNullOrEmpty(producttype) || p.ProductType.Name.Contains(producttype)) &&
                   (string.IsNullOrEmpty(supplier) || p.Supplier.Name.Contains(supplier)) &&
                   (string.IsNullOrEmpty(manufacture) || p.Manufacturer.Name.Contains(manufacture))
               );
               

            //if (price.HasValue)
            //{
            //    product = product.Where(p => p.Price <= price);
            //}
            var products = await product
                    .Select(p => new 
                    {
                        id = p.Id,
                        name = p.Name,
                        description = p.Description,
                        //price = p.Price,
                        productType =  p.ProductType.Name ,
                        supplier = p.Supplier.Name ,
                        manufacturer =  p.Manufacturer.Name ,
                        imageurl = p.ImgUrlMain,

                        Images = p.Images.Select(i => new { ImageId = i.Id, ImageUrl = i.ImgUrl })
                    })
                    .ToListAsync();

            return Ok(products);
        }



        [HttpGet]
        [Route("searchsFilter")]
        public async Task<ActionResult<IEnumerable<Product>>> GetProducts(
            string producttype,
            string manufacture,
            string price,
            string ram,
            string rom,
            string widescreen,
            string maxChargingSupport)
        {
            decimal minPrice = 0;
            decimal maxPrice = 0;

            bool priceInRange = !string.IsNullOrEmpty(price) && price.Contains('-') &&
                                decimal.TryParse(price.Split('-')[0], out minPrice) &&
                                decimal.TryParse(price.Split('-')[1], out maxPrice);

            var productsQuery = _context.Products
                .Include(p => p.ProductType)
                .Include(p => p.Manufacturer)
                .Include(p => p.ProductDetails)
                    .ThenInclude(pd => pd.MemoryandStorage)
                .Include(p => p.Specifications)
                    .ThenInclude(s => s.Screen)
                .Include(p => p.Specifications)
                    .ThenInclude(s => s.BatteryandCharger)
                .AsQueryable();

            if (!string.IsNullOrEmpty(producttype))
            {
                productsQuery = productsQuery.Where(p => p.ProductType.Name.Contains(producttype));
            }
            if (!string.IsNullOrEmpty(manufacture))
            {
                productsQuery = productsQuery.Where(p => p.Manufacturer.Name.Contains(manufacture));
            }
            if (priceInRange)
            {
                productsQuery = productsQuery.Where(p => p.ProductDetails.Any(pd => minPrice <= pd.UnitPrice && (maxPrice == 0 || pd.UnitPrice <= maxPrice)));
            }
            if (!string.IsNullOrEmpty(ram))
            {
                productsQuery = productsQuery.Where(p => p.ProductDetails.Any(pd => pd.MemoryandStorage.RAM.Contains(ram)));
            }
            if (!string.IsNullOrEmpty(rom))
            {
                productsQuery = productsQuery.Where(p => p.ProductDetails.Any(pd => pd.MemoryandStorage.Storagecapacity.Contains(rom)));
            }
            if (!string.IsNullOrEmpty(widescreen))
            {
                productsQuery = productsQuery.Where(p => p.Specifications.Any(s => s.Screen.Widescreen.Contains(widescreen)));
            }
            if (!string.IsNullOrEmpty(maxChargingSupport))
            {
                productsQuery = productsQuery.Where(p =>
                    p.Specifications.Any(s =>
                        maxChargingSupport == "20 W" ?
                            string.Compare(s.BatteryandCharger.Maximumchargingsupport, "20 W") >= 0 :
                        maxChargingSupport == "60 W" ?
                            string.Compare(s.BatteryandCharger.Maximumchargingsupport, "60 W") >= 0 :
                        maxChargingSupport == "90 W" ?
                            string.Compare(s.BatteryandCharger.Maximumchargingsupport, "90 W") >= 0 :
                        false
                    )
                );
            }

            var result = await productsQuery
                .Select(p => new
                {
                    id = p.Id,
                    name = p.Name,
                    description = p.Description,
                    productType = p.ProductType.Name,
                    manufacturer = p.Manufacturer.Name,
                    promotions = p.Promotions,
                    imgUrlMain = p.ImgUrlMain,
                    productDetails = p.ProductDetails
                        .Where(pd => priceInRange ? (minPrice <= pd.UnitPrice && (maxPrice == 0 || pd.UnitPrice <= maxPrice)) : true)
                        .Select(pd => new
                        {
                            id = pd.Id,
                            unitPrice = pd.UnitPrice,
                            ram = pd.MemoryandStorage.RAM,
                            rom = pd.MemoryandStorage.Storagecapacity
                        })
                        .ToList(),
                    specifications = p.Specifications.Select(s => new
                    {
                        widescreen = s.Screen.Widescreen,
                        maxChargingSupport = s.BatteryandCharger.Maximumchargingsupport
                    }).ToList()
                })
                .ToListAsync();

            return Ok(result);
        }


        [HttpGet]
        [Route("Productdetail")]
        public async Task<ActionResult> GetProductDetail(string Name)
        {
            // Replace hyphens with spaces in the Name parameter
            var formattedName = Name?.Replace("-", " ");

            // Query to get the product detail
            var product = await _context.Products
                .AsNoTracking()
                .Include(p => p.Images)
                .Include(p => p.ProductDetails)
                    .ThenInclude(pd => pd.Color)
                .Include(p => p.ProductDetails)
                    .ThenInclude(pd => pd.MemoryandStorage)
                .Include(p => p.ProductDetails)
                    .ThenInclude(pd => pd.Favourites)
                .Include(p => p.Promotions)
                .Include(p => p.Manufacturer)
                .Include(p => p.Supplier)
                .Include(p => p.ProductType)
                .Include(p => p.Specifications)
                    .ThenInclude (s => s.Screen)
                .Include(p => p.Specifications)
                    .ThenInclude(s => s.Rearcamera)
                .Include(p => p.Specifications)
                    .ThenInclude(s => s.FrontCamera)
                .Include(p => p.Specifications)
                    .ThenInclude(s => s.OperatingSystemAndCPU)
                .Include(p => p.Specifications)
                    .ThenInclude(s => s.Connect)
                .Include(p => p.Specifications)
                    .ThenInclude(s => s.BatteryandCharger)
                .Include(p => p.Specifications)
                    .ThenInclude(s => s.Utility)
                .Include(p => p.Specifications)
                    .ThenInclude(s => s.GeneralInformation)
                .Include(p => p.Posts)
                .Where(p => p.Name.Equals(formattedName) && p.Status)
                .Select(p => new
                {
                    id = p.Id,
                    sku = p.SKU,
                    name = p.Name,
                    description = p.Description,
                    producttype = p.ProductType.Name,
                    supplier = p.Supplier.Name,
                    manufacturer = p.Manufacturer.Name,
                    promotion = p.Promotions,
                    posts = p.Posts,
                    specifications = p.Specifications.Select(s => new
                    {
                        s.Id,
                        s.Screen,
                        s.Rearcamera,
                        s.FrontCamera,
                        s.OperatingSystemAndCPU,
                        s.Connect,
                        s.BatteryandCharger,
                        s.Utility,
                        s.GeneralInformation

                    }).ToList(),

                    productdetail = p.ProductDetails.Select(pd => new {
                        pd.Id,
                        Color = pd.Color.Name,
                        Ram = pd.MemoryandStorage.RAM,
                        Rom = pd.MemoryandStorage.Storagecapacity,
                        romnull = pd.MemoryandStorage.Remainingcapacityisapproximately,
                        phonebook = pd.MemoryandStorage.Phonebook,
                        mainUrl = pd.MainUrl,
                        romprice = pd.PurchasePrice,
                        ramprice = pd.UnitPrice,
                        favourite = pd.Favourites.Select(f => new
                        {
                            f.Id,
                            f.UserId

                        })
                    }).ToList(),
                    imgUrlMain = p.ImgUrlMain,
                    image = p.Images.Select(img => new {
                        Id = img.Id,
                        imgUrl = img.ImgUrl
                    }).ToList()
                })
                .FirstOrDefaultAsync();

            if (product == null)
            {
                return NotFound();
            }

            return Ok(product);
        }


        // GET: api/Products/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Product>> GetProduct(int id)
        {
            var product = await _context.Products
                    .Include(p => p.Images)
                    .Include(p => p.Manufacturer)
                    .Include(p => p.Supplier)
                    .Include(p => p.ProductType)
                    .Include(p => p.ProductDetails)
                    .Where(p => p.Id == id)
                    .Select(p => new
                    {
                        id = p.Id,
                        sku = p.SKU,
                        name = p.Name,
                        description = p.Description,
                        productTypeId = p.ProductType.Id,
                        manufacturerId = p.Manufacturer.Id,
                        supplierId = p.Supplier.Id,
                        imgUrlMain = p.ImgUrlMain,
                        productdetail = p.ProductDetails,
                     Images = p.Images.Select(i => new { ImageId = i.Id, ImageUrl = i.ImgUrl })
                    })
                    .ToListAsync();

          

            if (product == null)
            {
                return NotFound();
            }

            return Ok(product);
        }

        // PUT: api/Products/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
         [HttpPut("{id}")]
         public async Task<IActionResult> PutProduct(int id,Product PForm)
        {
              if (id != PForm.Id)
              {
               return BadRequest();
              }

   var product = await _context.Products.FindAsync(id);
            product.SKU = PForm.SKU;
            product.Name = PForm.Name;
            product.Description = PForm.Description;
            product.ProductTypeId = PForm.ProductTypeId;
            product.ManufacturerId = PForm.ManufacturerId;
            product.SupplierId = PForm.SupplierId;
            product.ImgUrlMain = PForm.ImgUrlMain;
            product.Status = true;

     _context.Products.Update(product);
            
          
    try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProductExists(id))
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
            [HttpPut("{id}/ChangMainImage")]
            public async Task<IActionResult> PutProductImageMain(int id, [FromForm] UpdateMainImage PForm)
            {
            
            if ( PForm.ImageMain == null)
             {
              return BadRequest();
             }

             var product = await _context.Products.FindAsync(id);
             string newFileNameMain = Guid.NewGuid().ToString()+ "-" + product.Name+ Path.GetExtension(PForm.ImageMain.FileName);
             product.ImgUrlMain = newFileNameMain;
             string uploadPathMain = Path.Combine(_webHostEnvironment.WebRootPath, "Image", newFileNameMain);
             if (System.IO.File.Exists(uploadPathMain))
             {
              // Nếu tồn tại, xóa hoặc đổi tên tệp
              System.IO.File.Delete(uploadPathMain);
             }
             // Lưu file vào thư mục wwwroot
             using (var stream = new FileStream(uploadPathMain, FileMode.Create))
             {
              await PForm.ImageMain.CopyToAsync(stream);
               }

             _context.Products.Update(product);


              await _context.SaveChangesAsync();
             

             return NoContent();
            }
       [HttpPut("{id}/ChangListImage")]
       public async Task<IActionResult> PutProductListImage(int id, [FromForm] ChangeFileImage PForm)
       {
      
        if (PForm.id != id)
        {
         return BadRequest();
        }
       // Deserialize JSON chuỗi thành danh sách UpdateImage
       if (!string.IsNullOrEmpty(PForm.UpdateImagesJson))
       {
        PForm.UpdateImages = JsonConvert.DeserializeObject<List<UpdateImage>>(PForm.UpdateImagesJson);
       }

       var product = await _context.Products.FindAsync(id);
          // Detele images
          if(PForm.deleteId.Length > 0)
          {
              foreach (var i in PForm.deleteId)
              {
                    var image = await _context.Images.FindAsync(i);
                    if (image == null)
                    {
                     return NotFound();
                    }

                    _context.Images.Remove(image);

                    var filname = Guid.NewGuid().ToString() + "-" + image.ImgUrl;
                    var filepath = Path.Combine(_webHostEnvironment.WebRootPath, "Image", filname);
                    if (System.IO.File.Exists(filepath))
                    {
                     // Nếu tồn tại, xóa hoặc đổi tên tệp
                     System.IO.File.Delete(filepath);
                    }
              }
           } 
          // Add file change 
          if(PForm.ImageFilesChange != null)
             {
                foreach (var file in PForm.ImageFilesChange)
                {
                    var fileName = file.FileName;        
                    var newFilename = Guid.NewGuid().ToString() + "-" + product.Name + Path.GetExtension(file.FileName);
                    var filePath = Path.Combine(_webHostEnvironment.WebRootPath, "Image", newFilename);
                    if (System.IO.File.Exists(filePath))
                    {
                     // Nếu tồn tại, xóa hoặc đổi tên tệp
                     System.IO.File.Delete(filePath);
                    }
                      using (var stream = new FileStream(filePath, FileMode.Create))
                    {
                      await file.CopyToAsync(stream);
                    }
                     foreach( var item in PForm.UpdateImages)
                     {
                      if(fileName == item.Path)
                        {
                          var image = await _context.Images.FindAsync(item.Id);
                          image.ImgUrl = newFilename;
                          _context.Images.Update(image);
                       } 
                     } 
                      
                   }
               }
      await _context.SaveChangesAsync();


        return NoContent();
       }
  [HttpPut("{id}/AddImages")]
  public async Task<IActionResult> PutProductAddImages(int id, [FromForm] AddImage PForm)
  {
     if (PForm.id != id)
     {
      return BadRequest();
     }
   if (PForm.ImageFilesAddChange != null)
   {
       string fileName;
       foreach (var file in PForm.ImageFilesAddChange)
       {

           // Lấy tên file
           fileName = Guid.NewGuid().ToString() + PForm.name + Path.GetExtension(file.FileName);
           // Đường dẫn lưu file trong thư mục wwwroot
           string uploadPath = Path.Combine(_webHostEnvironment.WebRootPath, "Image", fileName);
           // Kiểm tra xem tệp đã tồn tại chưa
           if (System.IO.File.Exists(uploadPath))
           {
              // Nếu tồn tại, xóa hoặc đổi tên tệp
              System.IO.File.Delete(uploadPath);
           }
           // Lưu file vào thư mục wwwroot
           using (var stream = new FileStream(uploadPath, FileMode.Create))
           {
              await file.CopyToAsync(stream);
           }
           API_Server.Models.Image image = new API_Server.Models.Image()
           {
             ProductId = id,
             ImgUrl = fileName,
             Status = true

           };
           _context.Images.Add(image);
       }
   } 

   
  
   await _context.SaveChangesAsync();


   return NoContent();
  }

        //product get cus
        [HttpGet("CusProductsview")]
        public async Task<ActionResult<IEnumerable<Product>>> GetCusProductsview()
        {
            var productsWithImages = await _context.Products
                    .Include(p => p.Specifications)
                        .ThenInclude(p => p.GeneralInformation)
                    .Where(p => p.Status)
                    .Select(p => new
                    {
                        id = p.Id,
                        sku = p.SKU,
                        name = p.Name,
                        description = p.Description,
                        producttype = p.ProductType.Name,
                        manufacturer = p.Manufacturer.Name,
                        imageurl = p.ImgUrlMain,
                        Specifications = p.Specifications,
                    })
                    .ToListAsync();

            return Ok(productsWithImages);

            //return await _context.Products.ToListAsync();
        }


        // POST: api/Products
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Product>> PostProduct([FromForm]  Product PForm)
        {
  


            if (PForm.ImageFiles != null || PForm.ImageMain.Length > 0)
            {
             var newfileNameMain = Guid.NewGuid().ToString() + PForm.Name + Path.GetExtension(PForm.ImageMain.FileName);
             Product product = new Product()
             {
              SKU = PForm.SKU,
              Name = PForm.Name,
              Description = PForm.Description,
              ProductTypeId = PForm.ProductTypeId,
              ManufacturerId = PForm.ManufacturerId,
              SupplierId = PForm.SupplierId,
              ImgUrlMain = newfileNameMain,
              Status = PForm.Status,

             };

             _context.Products.Add(product);
              await _context.SaveChangesAsync();


              int newProductId = product.Id;

             string uploadPathMain = Path.Combine(_webHostEnvironment.WebRootPath, "Image", newfileNameMain);
             if (System.IO.File.Exists(uploadPathMain))
             {
              // Nếu tồn tại, xóa hoặc đổi tên tệp
              System.IO.File.Delete(uploadPathMain);
             }
             // Lưu file vào thư mục wwwroot
             using (var stream = new FileStream(uploadPathMain, FileMode.Create))
             {
              await PForm.ImageMain.CopyToAsync(stream);
             }
             API_Server.Models.Image imagemain = new API_Server.Models.Image()
             {
              ProductId = newProductId,
              ImgUrl = newfileNameMain,
              Status = true
             };
             _context.Images.Add(imagemain);
             string fileName;
             foreach (var file in PForm.ImageFiles)
             {
              var id = await GetLastId() + 1;
              // Lấy tên file
              fileName = Guid.NewGuid().ToString() + product.Name + Path.GetExtension(file.FileName);
              // Đường dẫn lưu file trong thư mục wwwroot
              string uploadPath = Path.Combine(_webHostEnvironment.WebRootPath, "Image", fileName);
              // Kiểm tra xem tệp đã tồn tại chưa
              if (System.IO.File.Exists(uploadPath))
              {
               // Nếu tồn tại, xóa hoặc đổi tên tệp
               System.IO.File.Delete(uploadPath);
              }
              // Lưu file vào thư mục wwwroot
              using (var stream = new FileStream(uploadPath, FileMode.Create))
              {
               await file.CopyToAsync(stream);
              }
              API_Server.Models.Image image = new API_Server.Models.Image()
              {
               ProductId = newProductId,
               ImgUrl = fileName,
               Status = true

              };
              _context.Images.Add(image);
             }



             await _context.SaveChangesAsync();

             return CreatedAtAction("GetProduct", new { id = product.Id }, product);
            }
            return NotFound();
           }

        // DELETE: api/Products/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProduct(int id)
        {
            var product = await _context.Products.FindAsync(id);
            if (product == null)
            {
                return NotFound();
            }
             product.Status = false;
            _context.Products.Update(product);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ProductExists(int id)
        {
            return _context.Products.Any(e => e.Id == id);
        }
    }
   
}
