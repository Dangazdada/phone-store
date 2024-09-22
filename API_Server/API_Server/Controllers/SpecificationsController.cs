using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using API_Server.Data;
using API_Server.Models;
using Microsoft.IdentityModel.Tokens;

namespace API_Server.Controllers
{
 [Route("api/[controller]")]
 [ApiController]
 public class SpecificationsController : ControllerBase
 {
  private readonly APIServerContext _context;
  public class SpecificationData
  {
   public int id { get; set; }
   public int prodcutid { get; set; }
   public int ScreenId { get; set; }
   public string Screentechnology { get; set; }
   public string Resolution { get; set; }
   public string Widescreen { get; set; }
   public string Maximumbrightness { get; set; }
   public string Touchglasssurface { get; set; }
   public int OperatingSystemandCPUId { get; set; }
   public string Operatingsystem { get; set; }
   public string Processorchip { get; set; }
   public string CPUspeed { get; set; }
   public string Graphicschip { get; set; }
   public int ConnectId { get; set; }
   public string Mobilenetwork { get; set; }
   public string SIM { get; set; }
   public string WIFI { get; set; }
   public string Bluetooth { get; set; }
   public string ConnectionChargingPort { get; set; }
   public string HeadPhoneJack { get; set; }
   public string OtherConnections { get; set; }
   public int UtilityId { get; set; }
   public string Advancedsecurity { get; set; }
   public string Specialfeatures { get; set; }
   public string Wateranddustresistant { get; set; }
   public string Record { get; set; }
   public string Watchamovie { get; set; }
   public string Listeningtomusic { get; set; }
   public int GeneralinformationId {  get; set; }
   public string Design { get; set; }
   public string Material { get; set; }
   public string Sizevolume { get; set; }
   public string Launchtime { get; set; }
   public string Thefirm { get; set; }
   public int BatteryandChargerId { get; set; }
   public int? Batterycapacity { get; set; }
   public string Batterytype { get; set; }
   public string Maximumchargingsupport { get; set; }
   public string Batterytechnology { get; set; }
  
   public int FrontcameraId { get; set; }
   public string ResolutionFC { get; set; }
   public string FeatureFC { get; set; }
   public int RearcameraId { get; set; }
   public string ResolutionRC { get; set; }
   public string Film { get; set; }
   public string Flashlight { get; set; }
   public string FeatureRC { get; set; }
  }
  public SpecificationsController(APIServerContext context)
  {
   _context = context;
  }

  // GET: api/Specifications
  [HttpGet]
  public async Task<ActionResult<IEnumerable<Specification>>> GetSpecifications()
  {
   return await _context.Specifications.ToListAsync();
  }

  // GET: api/Specifications/5
  [HttpGet("{id}")]
  public async Task<ActionResult<Specification>> GetSpecification(int id)
  {
   var specification = await _context.Specifications
    .Include(p=> p.Screen)
    .Include(p => p.Rearcamera)
    .Include(p=> p.FrontCamera)
    .Include(p => p.OperatingSystemAndCPU)
    .Include(p => p.Connect)
    .Include(p => p.BatteryandCharger)
    .Include(p => p.Utility)
    .Include(p => p.GeneralInformation)
    .FirstOrDefaultAsync(p => p.ProductId == id);

   if (specification == null)
   {
    return NotFound();
   }

   return specification;
  }

  // PUT: api/Specifications/5
  // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
  [HttpPut("{id}")]
  public async Task<IActionResult> PutSpecification(int id, [FromBody] SpecificationData data)
  {
   if (id != data.prodcutid)
   {
    return BadRequest();
   }
   var screen = await _context.Screens.FindAsync(data.ScreenId);
   screen.Screentechnology = data.Screentechnology;
   screen.Resolution = data.Resolution;
   screen.Widescreen = data.Widescreen;
   screen.Maximumbrightness = data.Maximumbrightness;
   screen.Touchglasssurface = data.Touchglasssurface;

   _context.Screens.Update(screen);

   var operatingSystemandCPU = await _context.OperatingSystemsAndCPUs.FindAsync(data.OperatingSystemandCPUId);
   operatingSystemandCPU.Operatingsystem = data.Operatingsystem;
   operatingSystemandCPU.Processorchip = data.Processorchip;
   operatingSystemandCPU.Graphicschip = data.Graphicschip;
   operatingSystemandCPU.CPUspeed = data.CPUspeed;

   _context.OperatingSystemsAndCPUs.Update(operatingSystemandCPU);

   var conect = await _context.Connects.FindAsync(data.ConnectId);
   conect.Mobilenetwork = data.Mobilenetwork;
   conect.SIM = data.SIM;
   conect.WIFI = data.WIFI;
   conect.Bluetooth = data.Bluetooth;
   conect.ConnectionChargingPort = data.ConnectionChargingPort;
   conect.HeadPhoneJack = data.HeadPhoneJack;
   conect.OtherConnections = data.OtherConnections;

   _context.Connects.Update(conect);

   var utility = await _context.Utilities.FindAsync(data.UtilityId);
   utility.Advancedsecurity = data.Advancedsecurity;
   utility.Specialfeatures = data.Specialfeatures;
   utility.Wateranddustresistant = data.Wateranddustresistant;
   utility.Record = data.Record;
   utility.Watchamovie = data.Watchamovie;
   utility.Listeningtomusic = data.Listeningtomusic;

   _context.Utilities.Update(utility);

   var generalinformation = await _context.GeneralInformations.FindAsync(data.GeneralinformationId);
   generalinformation.Design = data.Design;
   generalinformation.Material = data.Material;
   generalinformation.Sizevolume = data.Sizevolume;
   generalinformation.Launchtime = data.Launchtime;
   generalinformation.Thefirm = data.Thefirm;

   _context.GeneralInformations.Update(generalinformation);

   var batteryandCharger = await _context.BatteryandChargers.FindAsync(data.BatteryandChargerId);
   batteryandCharger.Batterycapacity = data.Batterycapacity ??0; // nếu không có giá trị thì giá trị bằng 0
   batteryandCharger.Batterytype = data.Batterytype;
   batteryandCharger.Maximumchargingsupport = data.Maximumchargingsupport;
   batteryandCharger.Batterytechnology = data.Batterytechnology;

   _context.BatteryandChargers.Update(batteryandCharger);

   



   var frontcamera = await _context.FrontCameras.FindAsync(data.FrontcameraId);
   frontcamera.Resolution = data.ResolutionFC;
   frontcamera.Feature= data.FeatureFC;

   _context.FrontCameras.Update(frontcamera);

   var rearcamera = await _context.RearCameras.FindAsync(data.RearcameraId);
   rearcamera.Resolution = data.ResolutionRC;
   rearcamera.Feature= data.FeatureRC;
   rearcamera.Film = data.Film;
   rearcamera.Flashlight = data.Flashlight;

   _context.RearCameras.Update(rearcamera);

   try
   {
    await _context.SaveChangesAsync();
   }
   catch (DbUpdateConcurrencyException)
   {
    if (!SpecificationExists(id))
    {
     return NotFound();
    }
    else
    {
     throw;
    }
   }

   return NoContent();
  }

  // POST: api/Specifications
  // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
  [HttpPost]
  public async Task<ActionResult<Specification>> PostSpecification(int prodcutid, /*Sreen*/string Screentechnology, string Resolution,
     string Widescreen, string Maximumbrightness, string Touchglasssurface,
     /*OperatingSystemandCPU*/string Operatingsystem, string Processorchip, string CPUspeed, string Graphicschip,
    /*Connects*/ string Mobilenetwork, string SIM, string WIFI, string Bluetooth,
     string ConnectionChargingPort, string HeadPhoneJack, string OtherConnections,
     /*Utilities*/ string Advancedsecurity, string Specialfeatures, string Wateranddustresistant,
     string Record, string Watchamovie, string Listeningtomusic,
    /*Generalinformation*/ string Design, string Material, string Sizevolume, string Launchtime, string Thefirm,
    /*BatteryandCharger*/int? Batterycapacity, string Batterytype, string Maximumchargingsupport, string Batterytechnology,
     /*MemoryandStorage*/string RAM, string Storagecapacity, string Remainingcapacityisapproximately, string Phonebook,
    /*Frontcamera*/ string ResolutionFC, string FeatureFC,
    /*Rearcamera*/string ResolutionRC, string Film, string Flashlight, string FeatureRC )
  { 


          Screen screen = new Screen()
          {
           Screentechnology = Screentechnology,
           Resolution = Resolution,
           Widescreen = Widescreen,
           Maximumbrightness = Maximumbrightness,
           Touchglasssurface = Touchglasssurface,
           Status = true
          };
        _context.Screens.Add(screen);
        OperatingSystemAndCPU operatingsystemandCPU = new OperatingSystemAndCPU()
               {
                Operatingsystem = Operatingsystem,
                Processorchip = Processorchip,
                CPUspeed = CPUspeed,
                Graphicschip = Graphicschip,
                Status = true
               };
   _context.OperatingSystemsAndCPUs.Add(operatingsystemandCPU);
   Connect connect = new Connect()
         {
          Mobilenetwork = Mobilenetwork,
          SIM = SIM,
          WIFI = WIFI,
          Bluetooth = Bluetooth,
          ConnectionChargingPort = ConnectionChargingPort,
          HeadPhoneJack = HeadPhoneJack,
          OtherConnections = OtherConnections,
          Status = true
         };
   _context.Connects.Add(connect);

   API_Server.Models.Utility utility = new API_Server.Models.Utility()
   {
    Advancedsecurity = Advancedsecurity,
            Specialfeatures = Specialfeatures,
            Wateranddustresistant = Wateranddustresistant,
            Record = Record,
            Watchamovie = Watchamovie,
            Listeningtomusic = Listeningtomusic,
            Status = true


           };
   _context.Utilities.Add(utility);

   GeneralInformation generalInformation = new GeneralInformation()
        {
         Design = Design,
         Material = Material,
         Sizevolume = Sizevolume,
         Launchtime = Launchtime,
         Thefirm = Thefirm,
         Status = true
        };
   _context.GeneralInformations.Add(generalInformation);

   BatteryandCharger batteryandCharger = new BatteryandCharger()
        {
         Batterycapacity = Batterycapacity ?? 0,
         Batterytype = Batterytype,
         Maximumchargingsupport = Maximumchargingsupport,
         Batterytechnology = Batterytechnology,
         Status = true

        };
   _context.BatteryandChargers.Add(batteryandCharger);


   FrontCamera fontcamera = new FrontCamera()
        {
         Resolution = ResolutionFC,
         Feature = FeatureFC,
         Status = true
        };
   _context.FrontCameras.Add(fontcamera);

   RearCamera rearcamera = new RearCamera()
        {
         Resolution = ResolutionRC,
         Film = Film,
         Flashlight = Flashlight,
         Feature = FeatureRC,
         Status = true
        };
   _context.RearCameras.Add(rearcamera);
   await _context.SaveChangesAsync();
   Specification specification = new Specification()
   {
    ProductId = prodcutid,
    ScreenId = screen.Id,
    RearcameraId = rearcamera.Id,
    FrontcameraId = fontcamera.Id,
    OperatingSystemandCPUId = operatingsystemandCPU.Id,
    ConnectId = connect.Id,
    BatteryandChargerId = batteryandCharger.Id,
    UtilityId = utility.Id,
    GeneralinformationId = generalInformation.Id,
    Status = true
   };_context.Specifications.Add(specification);
   _context.Specifications.Add(specification);
   await _context.SaveChangesAsync();

   return CreatedAtAction("GetSpecification", new { id = specification.Id }, specification);
  }


        // DELETE: api/Specifications/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSpecification(int id)
        {
            var specification = await _context.Specifications.FindAsync(id);
            if (specification == null)
            {
                return NotFound();
            }

            _context.Specifications.Remove(specification);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool SpecificationExists(int id)
        {
            return _context.Specifications.Any(e => e.Id == id);
        }
    }
}
