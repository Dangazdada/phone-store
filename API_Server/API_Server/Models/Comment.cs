namespace API_Server.Models
{
    public class Comment
    {
        public int Id { get; set; }
        public int ProductDetailId { get; set; }
        public ProductDetail ProductDetail { get; set; }
        public string UserId { get; set; }
        public User User { get; set; }
        public string Conent { get; set; }
        public DateTime Commenttime { get; set; }
        public int? ParentcommentId { get; set; }
        public Comment ParentComment { get; set; }
        public bool isReplied { set; get; }



    }
}
