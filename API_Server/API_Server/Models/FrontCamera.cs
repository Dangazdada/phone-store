namespace API_Server.Models
{
    public class FrontCamera
    {
        public int Id { get; set; }
        public string Resolution { get; set; }
        public string Feature { get; set; }
        public bool Status { get; set; }
        public List<Specification> Specifications { get; set; }


    }
}
