namespace API_Server.Models
{
    public class Favourite
    {
        public int Id { get; set; }

        public int ProductDetailId { get; set; }
        public ProductDetail ProductDetail { get; set; }

        public string UserId { get; set; }
        public User User { get; set; }
       
    }
}
