namespace API_Server.Models
{
    public class Connect
    {
        public int Id { get; set; }
        public string Mobilenetwork { get; set; }
        public string SIM { get; set; }
        public string WIFI { get; set; }
        public string GPS { get; set; }
        public string Bluetooth { get; set; }
        public string ConnectionChargingPort { get; set; }
        public string HeadPhoneJack { get; set; }
        public string OtherConnections { get; set; }
        public bool Status { get; set; }
        public List<Specification> Specifications { get; set; }


    }
}
