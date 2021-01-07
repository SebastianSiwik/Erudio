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
    public class TranslationLikeController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        public TranslationLikeController(ApplicationDbContext context)
        {
            _context = context;
        }

        [Route("{translationId:min(1)}", Name = "GetLikesByTranslationId")]
        [HttpGet]
        public async Task<IActionResult> GetLikesByTranslationId(int translationId)
        {
            var likes = _context.TranslationLikes.Where(x => x.TranslationId == translationId);
            var likeViewModels = new List<TranslationLikeViewModel>();

            await likes.ForEachAsync(l => likeViewModels.Add(new TranslationLikeViewModel
            {
                TranslationId = l.TranslationId,
                UserId = l.UserId
            }));

            if (likes != null)
            {
                return Ok(likeViewModels);
            }
            return NotFound();
        }

        [ValidateModel]
        public async Task<IActionResult> Post([FromBody] CreateTranslationLike createTranslationLike)
        {
            var like = new TranslationLike
            {
                TranslationId = createTranslationLike.TranslationId,
                UserId = createTranslationLike.UserId
            };
            await _context.AddAsync(like);
            await _context.SaveChangesAsync();

            return Created(like.UserId.ToString(), new TranslationLikeViewModel
            {
                TranslationId = like.TranslationId,
                UserId = like.UserId
            });
        }

        [Route("delete/{translationId:min(1)}/{userId}", Name = "DeleteTranslationLike")]
        [ValidateModel]
        [HttpDelete]
        public async Task<IActionResult> DeleteTranslationLike(int translationId, string userId)
        {
            var like = await _context.TranslationLikes.FirstOrDefaultAsync(x =>
                x.TranslationId == translationId && x.UserId == userId);
            if (like != null)
            {
                _context.Remove(like);
                await _context.SaveChangesAsync();
            }
            return NoContent();
        }
    }
}
