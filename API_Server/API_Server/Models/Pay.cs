namespace API_Server.Models
{
    public class Pay
    {
        public int Id { get; set; }
        public string PayType { get; set; }
        public bool Status { get; set; }
        public List<Invoice> Invoices { get; set; }
    }
}
