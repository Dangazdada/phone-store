namespace API_Server.Models
{
    public class ProductType
    {
            public int Id { get; set; }
            public string Name { get; set; }
            public List<Product> Products { get; set; }
            public string Description { get; set; }
            public bool Status { get; set; }


    }
}
