using System.ComponentModel.DataAnnotations.Schema;

namespace API_Server.Models
{
     public class ProductDetail
     {
      public int Id { get; set; }
      public int ProductId { get; set; } 
      public Product Product { get; set; }
      public int ColorId { get; set; }
      public Color Color { get; set; }
      public int MemoryandStorageId { get; set; }
      public MemoryandStorage MemoryandStorage { get; set; }
      public int UnitPrice { get; set; }
      public int PurchasePrice { get; set; }

      public string MainUrl { get; set; } // hình ảnh theo màu của sản phẩm
      public int Quantity { get; set; }
      public bool Status { get; set; }

     public List<Favourite> Favourites { get; set; }
     public List<InvoiceDetail> InvoiceDetails { get; set; }
     public List<Cart> Carts { get; set; }
     public List<ProductView> ProductViews { get; set; }
     [NotMapped]
     public IFormFile FileImageByColor { get; set; } // file nhận hình ảnh  theo màu của sản phẩm
 }
}
