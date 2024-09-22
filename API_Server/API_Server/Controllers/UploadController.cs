using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API_Server.Controllers
{
 [Route("api/[controller]")]
 [ApiController]
 public class UploadController : ControllerBase
 {
  private readonly IWebHostEnvironment _env;

  public UploadController(IWebHostEnvironment env)
  {
   _env = env;
  }

  [HttpPost("upload")]
  public async Task<IActionResult> Upload(IFormFile file)
  {
   if (file == null || file.Length == 0)
    return BadRequest("No file uploaded.");

   var uploads = Path.Combine(_env.WebRootPath, "uploads");
   if (!Directory.Exists(uploads))
   {
    Directory.CreateDirectory(uploads);
   }

   var filePath = Path.Combine(uploads, Guid.NewGuid().ToString() + Path.GetExtension(file.FileName));

   using (var stream = new FileStream(filePath, FileMode.Create))
   {
    await file.CopyToAsync(stream);
   }

   var fileUrl = $"{Request.Scheme}://{Request.Host}/uploads/{Path.GetFileName(filePath)}";
   return Ok(new { url = fileUrl });
  }
 }
}

