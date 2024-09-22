using System.ComponentModel.DataAnnotations.Schema;

namespace API_Server.Models
{
    public class Rating
    {
        public int Id { get; set; }
        public int ProductDetailId { get; set; }
        public ProductDetail ProductDetail { get; set; }
        public string UserId { get; set; }
        public User User { get; set; }
        public int? InvoiceDetailId { get; set; }
        [ForeignKey("InvoiceDetailId")]
        public InvoiceDetail InvoiceDetail { get; set; }

        public int? InvoiceId { get; set; }
        [ForeignKey("InvoiceId")]
        public Invoice Invoice { get; set; }

        public int Score { get; set; }
        public string Review { get; set; }
        public DateTime RatingTime { get; set; }
        public bool Status { get; set; }

    }
}
