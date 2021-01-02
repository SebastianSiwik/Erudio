using Erudio.Data;
using Erudio.ViewModels;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Erudio.Controllers
{
    [Route("api/languages")]
    public class LanguageController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        public LanguageController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetLanguages()
        {
            var languages = new List<LanguageViewModel>();
            await  _context.Languages.ForEachAsync(l => languages.Add(new LanguageViewModel
            {
                LanguageId = l.LanguageId,
                LanguageCode = l.LanguageCode,
                LanguageName = l.LanguageName
            }));

            if (languages != null)
            {
                return Ok(languages);
            }
            return NotFound();
        }

        [Route("{languageCode}", Name = "GetLanguageByCode")]
        [HttpGet]
        public async Task<IActionResult> GetLanguageByCode(string languageCode)
        {
            var language = await _context.Languages.FirstOrDefaultAsync(x => x.LanguageCode == languageCode);

            if (language != null)
            {
                return Ok(new LanguageViewModel
                {
                    LanguageId = language.LanguageId,
                    LanguageCode = language.LanguageCode,
                    LanguageName = language.LanguageName
                });
            }
            return NotFound();
        }
    }
}
