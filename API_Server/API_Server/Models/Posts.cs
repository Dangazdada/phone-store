namespace API_Server.Models
{
    public class Posts
    {
        public int Id { get; set; }

        public int ProductId { get; set; }
        public Product Product { get; set; }

        public string UserId { get; set; }
        public User User { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }

        public DateTime CreateAt { get; set; }
        public bool Status { get; set; }



    }
}
