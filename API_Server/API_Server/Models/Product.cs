using System.ComponentModel.DataAnnotations.Schema;

namespace API_Server.Models
{
 public class Product
 {
      public int Id { get; set; }

      public string SKU { get; set; }

      public string Name { get; set; }

      public string Description { get; set; }
      public int ProductTypeId { get; set; }
      public ProductType ProductType { get; set; }
      public int ManufacturerId { get; set; }
      public Manufacturer Manufacturer { get; set; }
      public int SupplierId { get; set; }
      public Supplier Supplier { get; set; }
      public string ImgUrlMain { get; set; }

      public List<ProductDetail> ProductDetails { get; set; }
      
      
      public List<Promotion> Promotions { get; set; }
      public List<Image> Images { get; set; }
      public List<Rating> Ratings { get; set; }
      public List<Posts> Posts { get; set; }
      public List<Specification> Specifications { get; set; }
      public List<Comment> Comments { get; set; }

      [NotMapped]
      public IFormFile ImageMain { get; set; }
      [NotMapped]
      public List<IFormFile> ImageFiles { get; set; }
      [NotMapped]
      public IFormFile ImageMainChange { get; set; }
      [NotMapped]
      public List<IFormFile> ImageFilesChange { get; set; }
      [NotMapped]
      public List<IFormFile> ImageFilesAddChange { get; set; }

      public bool Status { get; set; }
    }


}

