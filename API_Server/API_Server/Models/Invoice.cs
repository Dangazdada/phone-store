namespace API_Server.Models
{
    public class Invoice
    {
        public int Id { get; set; }
        public string UserId { get; set; }
        public User User { get; set; }
        public DateTime IssuedDate { get; set; }
        public DateTime? DeliveryTime { get; set; }
        public string ShippingAddress { get; set; }
        public string ShippingPhone { get; set;}
        public int Total { get; set;}
        public int SubTotal { get; set;} // tiền chưa qua trừ thuế và khuyến mãi
        public int  OrderStatusId { get; set; }
        public OrderStatus OrderStatus { get; set; }
        public int PayId { get; set; }
        public Pay Pay { get; set; }

        public string  PayCode { get; set; }
        public bool Status { get; set; }

        public List<InvoiceDetail> InvoiceDetails { get; set; }
    }
}
