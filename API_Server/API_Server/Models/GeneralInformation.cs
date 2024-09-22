namespace API_Server.Models
{
    public class GeneralInformation
    {
        public int Id { get; set; }
        public string Design { get; set; }
        public string Material { get; set; }
        public string Sizevolume { get; set; }
        public string Launchtime { get; set; }
        public string Thefirm { get; set; }
        public bool Status { get; set; }
        public List<Specification> Specifications { get; set; }


    }
}
