namespace API_Server.Models
{
    public class Image
    {
        public int Id { get; set; }
        public int  ProductId { get; set; }
        public Product Product { get; set; }
        public string ImgUrl { get; set; }
        public bool Status { get; set; }

    }
}
