namespace API_Server.Models
{
    public class OperatingSystemAndCPU
    {
        public int Id { get; set; }
        public string Operatingsystem { get; set; }
        public string Processorchip { get; set; }

        public string CPUspeed { get; set; }

        public string Graphicschip { get; set; }
        public bool Status { get; set; }
        public List<Specification> Specifications { get; set; }



    }
}
