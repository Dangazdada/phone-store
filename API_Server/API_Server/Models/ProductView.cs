namespace API_Server.Models
{
 public class ProductView
 {
  public int Id { get; set; }
  public int ProductDetailId { get; set; }
  public ProductDetail ProductDetail { get; set; }
  public DateTime TimeStamp { get; set; }
 }
}
