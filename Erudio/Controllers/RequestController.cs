using Erudio.BindingModels;
using Erudio.Data;
using Erudio.Models;
using Erudio.Validation;
using Erudio.ViewModels;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Erudio.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RequestController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        public RequestController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetRequests()
        {
            var requests = new List<RequestViewModel>();
            await _context.Requests.ForEachAsync(r => requests.Add(new RequestViewModel
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

            if (requests != null)
            {
                return Ok(requests);
            }
            return NotFound();
        }

        [Route("{requestId:min(1)}", Name = "GetRequestById")]
        [HttpGet]
        public async Task<IActionResult> GetRequestById(int requestId)
        {
            var request = await _context.Requests.FirstOrDefaultAsync(x => x.RequestId == requestId);

            if (request != null)
            {
                return Ok(new RequestViewModel
                {
                    RequestId = request.RequestId,
                    AuthorId = request.AuthorId,
                    FromLanguageCode = request.FromLanguageCode,
                    ToLanguageCode = request.ToLanguageCode,
                    Text = request.Text,
                    Context = request.Context,
                    ContextImage = request.ContextImage,
                    Date = request.Date
                });
            }
            return NotFound();
        }

        [Route("author/{authorId}", Name = "GetRequestByAuthorId")]
        [HttpGet]
        public async Task<IActionResult> GetRequestsByAuthorId(string authorId)
        {
            var requests = _context.Requests.Where(x => x.AuthorId == authorId);
            var requestViewModels = new List<RequestViewModel>();

            await requests.ForEachAsync(r => requestViewModels.Add(new RequestViewModel
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

            if (requests != null)
            {
                return Ok(requestViewModels);
            }
            return NotFound();
        }

        [ValidateModel]
        public async Task<IActionResult> Post([FromBody] CreateRequest createRequest)
        {
            var request = new Request
            {
                AuthorId = createRequest.AuthorId,
                FromLanguageCode = createRequest.FromLanguageCode,
                ToLanguageCode = createRequest.ToLanguageCode,
                Text = createRequest.Text,
                Context = createRequest.Context,
                ContextImage = createRequest.ContextImage,
                Date = DateTime.UtcNow
            };
            await _context.AddAsync(request);
            await _context.SaveChangesAsync();

            return Created(request.RequestId.ToString(), new RequestViewModel
            {
                RequestId = request.RequestId,
                AuthorId = request.AuthorId,
                FromLanguageCode = request.FromLanguageCode,
                ToLanguageCode = request.ToLanguageCode,
                Text = request.Text,
                Context = request.Context,
                ContextImage = request.ContextImage,
                Date = request.Date
            });
        }

        [Route("edit/{requestId:min(1)}", Name = "EditRequest")]
        [ValidateModel]
        [HttpPatch]
        public async Task<IActionResult> EditRequest([FromBody] EditRequest editRequest, int requestId)
        {
            var request = await _context.Requests.FirstOrDefaultAsync(x => x.RequestId == requestId);
            request.FromLanguageCode = editRequest.FromLanguageCode;
            request.ToLanguageCode = editRequest.ToLanguageCode;
            request.Text = editRequest.Text;
            request.Context = editRequest.Context;
            request.ContextImage = editRequest.ContextImage;
            await _context.SaveChangesAsync();
            return NoContent();
        }

        [Route("delete/{requestId:min(1)}", Name = "DeleteRequest")]
        [ValidateModel]
        [HttpDelete]
        public async Task<IActionResult> DeleteRequest(int requestId)
        {
            var translations = _context.Translations.Where(x => x.RequestId == requestId);
            if (translations != null)
            {
                _context.RemoveRange(translations);
            }

            var request = await _context.Requests.FirstOrDefaultAsync(x => x.RequestId == requestId);
            if (request != null)
            {
                _context.Remove(request);
                await _context.SaveChangesAsync();
            }
            return NoContent();
        }
    }
}
