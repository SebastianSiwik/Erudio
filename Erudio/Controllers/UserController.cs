using Erudio.BindingModels;
using Erudio.Data;
using Erudio.Validation;
using Erudio.ViewModels;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;

namespace Erudio.Controllers
{
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        public UserController(ApplicationDbContext context)
        {
            _context = context;
        }

        [Route("{userId}", Name = "GetUserById")]
        [HttpGet]
        public async Task<IActionResult> GetUserById(string userId)
        {
            var user = await _context.Users.FirstOrDefaultAsync(x => x.Id == userId);

            if (user != null)
            {
                return Ok(new UserViewModel 
                {
                    UserId = user.Id,
                    UserName = user.UserName,
                    Email = user.Email,
                    DateOfBirth = user.DateOfBirth,
                    RegistrationDate = user.RegistrationDate,
                    ProfilePicture = user.ProfilePicture
                });
            }
            return NotFound();
        }

        [Route("name/{userName}", Name = "GetUserByName")]
        [HttpGet]
        public async Task<IActionResult> GetUserByName(string userName)
        {
            var user = await _context.Users.FirstOrDefaultAsync(x => x.UserName == userName);

            if (user != null)
            {
                return Ok(new UserViewModel
                {
                    UserId = user.Id,
                    UserName = user.UserName,
                    Email = user.Email,
                    DateOfBirth = user.DateOfBirth,
                    RegistrationDate = user.RegistrationDate,
                    ProfilePicture = user.ProfilePicture
                });
            }
            return NotFound();
        }

        [Route("edit/{userId}", Name = "EditUser")]
        [ValidateModel]
        [HttpPatch]
        public async Task<IActionResult> EditUser([FromBody] EditUser editUser, string userId)
        {
            var user = await _context.Users.FirstOrDefaultAsync(x => x.Id == userId);
            user.UserName = editUser.UserName;
            user.Email = editUser.Email;
            user.DateOfBirth = editUser.DateOfBirth;
            await _context.SaveChangesAsync();
            return NoContent();
        }

        [Route("edit/avatar/{userId}", Name = "EditUserAvatar")]
        [ValidateModel]
        [HttpPatch]
        public async Task<IActionResult> EditUserAvatar([FromBody] EditUserAvatar editUserAvatar, string userId)
        {
            var user = await _context.Users.FirstOrDefaultAsync(x => x.Id == userId);
            user.ProfilePicture = editUserAvatar.ProfilePicture;
            await _context.SaveChangesAsync();
            return NoContent();
        }

        [Route("delete/{userId}", Name = "DeleteUser")]
        [ValidateModel]
        [HttpDelete]
        public async Task<IActionResult> DeleteUser(string userId)
        {
            await _context.Requests.Where(x => x.AuthorId == userId)
                .ForEachAsync(x => x.AuthorId = "0");
            await _context.Translations.Where(x => x.AuthorId == userId)
                .ForEachAsync(x => x.AuthorId = "0");
            await _context.TranslationLikes.Where(x => x.UserId == userId)
                .ForEachAsync(x => x.UserId = "0");

            var bookmarks = _context.RequestBookmarks.Where(x => x.UserId == userId);
            if (bookmarks != null)
            {
                _context.RemoveRange(bookmarks);
            }
            var nativeLanguages = _context.NativeLanguages.Where(x => x.UserId == userId);
            if (nativeLanguages != null)
            {
                _context.RemoveRange(nativeLanguages);
            }
            var languagesOfInterest = _context.LanguagesOfInterest.Where(x => x.UserId == userId);
            if (languagesOfInterest != null)
            {
                _context.RemoveRange(languagesOfInterest);
            }

            var user = await _context.Users.FirstOrDefaultAsync(x => x.Id == userId);
            if (user != null)
            {
                _context.Remove(user);
                await _context.SaveChangesAsync();
            }
            return NoContent();
        }
    }
}
