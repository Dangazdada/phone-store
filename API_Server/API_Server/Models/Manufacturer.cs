namespace API_Server.Models
{
    public class Manufacturer
    {
        public int Id {  get; set; }
        public string Name { get; set; }

        public string Address { get; set; }
        public string Phone { get; set; }
        public string Email {  get; set; }
        public bool Status { get; set; }
        public List<Product> Products { get; set; }
    }
}
