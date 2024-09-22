using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using API_Server.Data;
using API_Server.Models;

namespace API_Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PageViewsController : ControllerBase
    {
        private readonly APIServerContext _context;

        public PageViewsController(APIServerContext context)
        {
            _context = context;
        }

        // GET: api/PageViews
        [HttpGet]
        public async Task<ActionResult<IEnumerable<PageView>>> GetPageViews()
        {
            return await _context.PageViews.ToListAsync();
        }

        // GET: api/PageViews/5
        [HttpGet("{id}")]
        public async Task<ActionResult<PageView>> GetPageView(int id)
        {
            var pageView = await _context.PageViews.FindAsync(id);

            if (pageView == null)
            {
                return NotFound();
            }

            return pageView;
        }
  [HttpGet("today")]
  public async Task<ActionResult<PageView>> GetAccessToday()
  {
   var today = DateTime.Now.Date;
   var count = await _context.PageViews
                 .Where(p => p.TimeStamp.Date == today)
                  .CountAsync();
   return Ok(count);
  }
  [HttpGet("thismonth")]
  public async Task<ActionResult<PageView>> GetAccessThisMonth()
  {
   var today = DateTime.Now.Date;
   var monthNow = today.Month;
   var yearNow = today.Year;
   var count = await _context.PageViews
                 .Where(p => p.TimeStamp.Date.Month == monthNow && p.TimeStamp.Date.Year == yearNow)
                  .CountAsync();
   return Ok(count);
  }
  [HttpGet("countAll")]
  public async Task<ActionResult<PageView>> GetAccessAll()
  {

   var count = await _context.PageViews
                 .CountAsync();
   return Ok(count);
  }

  // PUT: api/PageViews/5
  // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
  [HttpPut("{id}")]
        public async Task<IActionResult> PutPageView(int id, PageView pageView)
        {
            if (id != pageView.Id)
            {
                return BadRequest();
            }

            _context.Entry(pageView).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PageViewExists(id))
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

        // POST: api/PageViews
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<PageView>> PostPageView(string url)
        {
            PageView pageview = new PageView()
            {
             TimeStamp = DateTime.UtcNow.ToLocalTime(),
             Url = url
            };
            _context.PageViews.Add(pageview);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetPageView", new { id = pageview.Id }, pageview);
        }

        // DELETE: api/PageViews/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePageView(int id)
        {
            var pageView = await _context.PageViews.FindAsync(id);
            if (pageView == null)
            {
                return NotFound();
            }

            _context.PageViews.Remove(pageView);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool PageViewExists(int id)
        {
            return _context.PageViews.Any(e => e.Id == id);
        }
    }
}
