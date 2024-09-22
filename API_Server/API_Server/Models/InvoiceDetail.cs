namespace API_Server.Models
{
    public class InvoiceDetail
    {
        public int Id { get; set; }
        public int InvoiceId { get; set; }
        public Invoice Invoice { get; set; }
        public int ProductDetailId { get; set; }
        public ProductDetail ProductDetail { get; set; }
        public int Quantity { get; set; }
        public int UnitPrice { get; set; }
       
    }
}
