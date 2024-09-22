namespace API_Server.Models
{
    public class Screen
    {
        public int Id { get; set; }
        public string Screentechnology { get; set; }
        public string Resolution { get; set; }
        public string Widescreen { get; set; }
        public string Maximumbrightness { get; set; }
        public string Touchglasssurface { get; set; }
        public bool Status { get; set; }
        public List<Specification> Specifications { get; set; }

    }
}
