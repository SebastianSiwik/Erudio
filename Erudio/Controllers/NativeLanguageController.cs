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
    public class NativeLanguageController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        public NativeLanguageController(ApplicationDbContext context)
        {
            _context = context;
        }

        [Route("user/{userId}", Name = "GetNativeLanguagesByUserId")]
        [HttpGet]
        public async Task<IActionResult> GetNativeLanguagesByUserId(string userId)
        {
            var languages = new List<NativeLanguageViewModel>();
            await _context.NativeLanguages.Where(x => x.UserId == userId)
                .ForEachAsync(l => languages.Add(new NativeLanguageViewModel 
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
        public async Task<IActionResult> Post([FromBody] CreateNativeLanguage createNativeLanguage)
        {
            var language = new NativeLanguage
            {
                UserId = createNativeLanguage.UserId,
                LanguageCode = createNativeLanguage.LanguageCode
            };
            await _context.AddAsync(language);
            await _context.SaveChangesAsync();

            return Created(language.Id.ToString(), new NativeLanguageViewModel
            {
                LanguageCode = language.LanguageCode
            });
        }

        [Route("edit/{nativeLanguageId:min(1)}", Name = "EditNativeLanguage")]
        [ValidateModel]
        [HttpPatch]
        public async Task<IActionResult> EditNativeLanguage([FromBody] EditNativeLanguage editNativeLanguage, int nativeLanguageId)
        {
            var language = await _context.NativeLanguages.FirstOrDefaultAsync(x => x.Id == nativeLanguageId);
            language.LanguageCode = editNativeLanguage.LanguageCode;
            await _context.SaveChangesAsync();
            return NoContent();
        }

        [Route("delete/{nativeLanguageId:min(1)}", Name = "DeleteNativeLanguage")]
        [ValidateModel]
        [HttpDelete]
        public async Task<IActionResult> DeleteNativeLanguage(int nativeLanguageId)
        {
            var language = await _context.NativeLanguages.FirstOrDefaultAsync(x => x.Id == nativeLanguageId);
            if (language != null)
            {
                _context.Remove(language);
                await _context.SaveChangesAsync();
            }
            return NoContent();
        }
    }
}
