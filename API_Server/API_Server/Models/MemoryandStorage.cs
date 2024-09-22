namespace API_Server.Models
{
    public class MemoryandStorage
    {
        public int Id { get; set; }
        public string RAM { get; set; }
        public string Storagecapacity { get; set; }
        public string Remainingcapacityisapproximately { get; set; }
        public string Phonebook { get; set; }
        public bool Status { get; set; }
        public List<ProductDetail> ProductDetails { get; set;}


    }
}
