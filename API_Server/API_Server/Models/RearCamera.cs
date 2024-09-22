namespace API_Server.Models
{
    public class RearCamera
    {
        public int Id { get; set; }
        public string Resolution { get; set; }
        public string Film { get; set; }
        public string Flashlight { get; set; }
        public string Feature { get; set; }
        public bool Status { get; set; }
        public List<Specification> Specifications { get; set; }


    }
}
