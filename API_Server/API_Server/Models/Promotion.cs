using System;
namespace API_Server.Models
{
    public class Promotion
    {
        public int Id { get; set; }
        public int ProductId { get; set; }
        public Product Product { get; set; }
        public string Description { get; set; }

        public int Value { get; set; }
        public string Promotiontype { get; set; }
        public string Promotioncode { get; set; }

        public DateTime DateStart { get; set; }
        public DateTime DateEnd { get; set; }

        public bool Status { get; set; }

    }
}
