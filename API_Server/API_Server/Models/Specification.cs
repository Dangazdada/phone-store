namespace API_Server.Models
{
    public class Specification
    {
        public int Id { get; set; }
        public int ProductId { get; set; }
        public Product Product { get; set; }
        public int ScreenId { get; set; }
        public Screen Screen { get; set; }
        public int RearcameraId { get; set; }
        public RearCamera Rearcamera { get; set; }
        public int FrontcameraId{ get; set; }
        public FrontCamera FrontCamera { get; set; }

        public int  OperatingSystemandCPUId { get; set; }
        public OperatingSystemAndCPU OperatingSystemAndCPU { get; set; }

        public int ConnectId { get; set; }
        public Connect Connect { get; set; }
        public int BatteryandChargerId { get; set; }
        public BatteryandCharger BatteryandCharger { get; set; }
        public int UtilityId { get; set; }
        public Utility Utility { get; set; }
        public int GeneralinformationId { get; set; }
        public GeneralInformation GeneralInformation { get; set; }
        public bool Status { get; set; }
        




    }
}
