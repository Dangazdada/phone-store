namespace API_Server.Models
{
    public class BatteryandCharger
    {
        public int Id { get; set; }
        public int Batterycapacity { get; set; }
        public string Batterytype { get; set; }
        public string Maximumchargingsupport { get; set; }
        public string Batterytechnology { get; set; }
        public bool Status { get; set; }
        public List<Specification> Specifications { get; set; }


    }
}
