using Erudio.BindingModels;
using Erudio.Data;
using Erudio.Models;
using Erudio.Validation;
using Erudio.ViewModels;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Erudio.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RequestBookmarkController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        public RequestBookmarkController(ApplicationDbContext context)
        {
            _context = context;
        }

        [Route("user/{userId}", Name = "GetBookmarkedRequestsByUserId")]
        [HttpGet]
        public async Task<IActionResult> GetBookmarkedRequestsByUserId(string userId)
        {
            var bookmarkedRequests = new List<RequestViewModel>();

            var bookmarkIds = _context.RequestBookmarks.Where(x => x.UserId == userId).ToList()
                    .GroupBy(x => x.RequestId).Select(x => x.First()).Select(x => x.RequestId);
            await _context.Requests.Where(x => bookmarkIds.Contains(x.RequestId))
                    .ForEachAsync(r => bookmarkedRequests.Add(new RequestViewModel
                    {
                        RequestId = r.RequestId,
                        AuthorId = r.AuthorId,
                        FromLanguageCode = r.FromLanguageCode,
                        ToLanguageCode = r.ToLanguageCode,
                        Text = r.Text,
                        Context = r.Context,
                        ContextImage = r.ContextImage,
                        Date = r.Date
                    }));

            if (bookmarkedRequests != null)
            {
                return Ok(bookmarkedRequests);
            }
            return NotFound();
        }

        [Route("{requestId:min(1)}", Name = "GetBookmarksByRequestId")]
        [HttpGet]
        public async Task<IActionResult> GetBookmarksByRequestId(int requestId)
        {
            var bookmarks = _context.RequestBookmarks.Where(x => x.RequestId == requestId);
            var bookmarkViewModels = new List<RequestBookmarkViewModel>();

            await bookmarks.ForEachAsync(b => bookmarkViewModels.Add(new RequestBookmarkViewModel
            {
                RequestId = b.RequestId,
                UserId = b.UserId
            }));

            if (bookmarks != null)
            {
                return Ok(bookmarkViewModels);
            }
            return NotFound();
        }

        [ValidateModel]
        public async Task<IActionResult> Post([FromBody] CreateRequestBookmark createRequestBookmark)
        {
            var bookmark = new RequestBookmark
            {
                RequestId = createRequestBookmark.RequestId,
                UserId = createRequestBookmark.UserId
            };
            await _context.AddAsync(bookmark);
            await _context.SaveChangesAsync();

            return Created(bookmark.UserId.ToString(), new RequestBookmarkViewModel
            {
                RequestId = bookmark.RequestId,
                UserId = bookmark.UserId
            });
        }

        [Route("delete/{requestId:min(1)}/{userId}", Name = "DeleteRequestBookmark")]
        [ValidateModel]
        [HttpDelete]
        public async Task<IActionResult> DeleteRequestBookmark(int requestId, string userId)
        {
            var bookmark = await _context.RequestBookmarks.FirstOrDefaultAsync(x =>
                x.RequestId == requestId && x.UserId == userId);
            if (bookmark != null)
            {
                _context.Remove(bookmark);
                await _context.SaveChangesAsync();
            }
            return NoContent();
        }
    }
}
