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
    public class LanguageOfInterestController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        public LanguageOfInterestController(ApplicationDbContext context)
        {
            _context = context;
        }

        [Route("user/{userId}", Name = "GetLanguagesOfInterestByUserId")]
        [HttpGet]
        public async Task<IActionResult> GetLanguagesOfInterestByUserId(string userId)
        {
            var languages = new List<LanguageOfInterestViewModel>();
            await _context.LanguagesOfInterest.Where(x => x.UserId == userId)
                .ForEachAsync(l => languages.Add(new LanguageOfInterestViewModel
            {
                LanguageCode = l.LanguageCode
            }));

            if (languages != null)
            {
                return Ok(languages);
            }
            return NotFound();
        }

        [ValidateModel]
        public async Task<IActionResult> Post([FromBody] CreateLanguageOfInterest createLanguageOfInterest)
        {
            var language = new LanguageOfInterest
            {
                UserId = createLanguageOfInterest.UserId,
                LanguageCode = createLanguageOfInterest.LanguageCode
            };
            await _context.AddAsync(language);
            await _context.SaveChangesAsync();

            return Created(language.Id.ToString(), new LanguageOfInterestViewModel
            {
                LanguageCode = language.LanguageCode
            });
        }

        [Route("edit/{languageOfInterestId:min(1)}", Name = "EditLanguageOfInterest")]
        [ValidateModel]
        [HttpPatch]
        public async Task<IActionResult> EditLanguageOfInterest([FromBody] EditLanguageOfInterest editLanguageOfInterest, int languageOfInterestId)
        {
            var language = await _context.LanguagesOfInterest.FirstOrDefaultAsync(x => x.Id == languageOfInterestId);
            language.LanguageCode = editLanguageOfInterest.LanguageCode;
            await _context.SaveChangesAsync();
            return NoContent();
        }

        [Route("delete/{languageOfInterestId:min(1)}", Name = "DeleteLanguageOfInterest")]
        [ValidateModel]
        [HttpDelete]
        public async Task<IActionResult> DeleteLanguageOfInterest(int languageOfInterestId)
        {
            var language = await _context.LanguagesOfInterest.FirstOrDefaultAsync(x => x.Id == languageOfInterestId);
            if (language != null)
            {
                _context.Remove(language);
                await _context.SaveChangesAsync();
            }
            return NoContent();
        }
    }
}
