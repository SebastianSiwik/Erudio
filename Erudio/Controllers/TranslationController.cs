using Erudio.BindingModels;
using Erudio.Data;
using Erudio.Models;
using Erudio.Validation;
using Erudio.ViewModels;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace Erudio.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TranslationController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        public TranslationController(ApplicationDbContext context)
        {
            _context = context;
        }

        [Route("{translationId:min(1)}", Name = "GetTranslationById")]
        [HttpGet]
        public async Task<IActionResult> GetTranslationById(int translationId)
        {
            var translation = await _context.Translations.FirstOrDefaultAsync(x => x.TranslationId == translationId);

            if (translation != null)
            {
                return Ok(new TranslationViewModel
                {
                    TranslationId = translation.TranslationId,
                    RequestId = translation.RequestId,
                    AuthorId = translation.AuthorId,
                    Text = translation.Text,
                    Explanation = translation.Explanation,
                    ExplanationImage = translation.ExplanationImage,
                    Date = translation.Date
                });
            }
            return NotFound();
        }

        [Route("request/{requestId:min(1)}", Name = "GetTranslationByRequestId")]
        [HttpGet]
        public async Task<IActionResult> GetTranslationByRequestId(int requestId)
        {
            var translation = await _context.Translations.FirstOrDefaultAsync(x => x.RequestId == requestId);

            if (translation != null)
            {
                return Ok(new TranslationViewModel
                {
                    TranslationId = translation.TranslationId,
                    RequestId = translation.RequestId,
                    AuthorId = translation.AuthorId,
                    Text = translation.Text,
                    Explanation = translation.Explanation,
                    ExplanationImage = translation.ExplanationImage,
                    Date = translation.Date
                });
            }
            return NotFound();
        }

        [ValidateModel]
        public async Task<IActionResult> Post([FromBody] CreateTranslation createTranslation)
        {
            var translation = new Translation
            {
                RequestId = createTranslation.RequestId,
                AuthorId = createTranslation.AuthorId,
                Text = createTranslation.Text,
                Explanation = createTranslation.Explanation,
                ExplanationImage = createTranslation.ExplanationImage,
                Date = DateTime.UtcNow
            };
            await _context.AddAsync(translation);
            await _context.SaveChangesAsync();

            return Created(translation.TranslationId.ToString(), new TranslationViewModel
            {
                TranslationId = translation.TranslationId,
                RequestId = translation.RequestId,
                AuthorId = translation.AuthorId,
                Text = translation.Text,
                Explanation = translation.Explanation,
                ExplanationImage = translation.ExplanationImage,
                Date = translation.Date
            });
        }

        [Route("edit/{translationId:min(1)}", Name = "EditTranslation")]
        [ValidateModel]
        [HttpPatch]
        public async Task<IActionResult> EditTranslation([FromBody] EditTranslation editTranslation, int translationId)
        {
            var translation = await _context.Translations.FirstOrDefaultAsync(x => x.TranslationId == translationId);
            translation.Text = editTranslation.Text;
            translation.Explanation = editTranslation.Explanation;
            translation.ExplanationImage = editTranslation.ExplanationImage;
            await _context.SaveChangesAsync();
            return NoContent();
        }

        [Route("delete/{translationId:min(1)}", Name = "DeleteTranslation")]
        [ValidateModel]
        [HttpDelete]
        public async Task<IActionResult> DeleteTranslation(int translationId)
        {
            var likes = _context.TranslationLikes.Where(x => x.TranslationId == translationId);
            if (likes != null)
            {
                _context.RemoveRange(likes);
            }

            var translation = await _context.Translations.FirstOrDefaultAsync(x => x.TranslationId == translationId);
            if (translation != null)
            {
                _context.Remove(translation);
                await _context.SaveChangesAsync();
            }
            return NoContent();
        }
    }
}
