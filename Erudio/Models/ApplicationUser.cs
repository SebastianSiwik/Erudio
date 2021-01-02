using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Erudio.Models
{
    public class ApplicationUser : IdentityUser
    {
        [Required]
        public DateTime DateOfBirth { get; set; }
        [Required]
        public DateTime RegistrationDate { get; set; }
        public byte[] ProfilePicture { get; set; }

        public virtual ICollection<UserNativeLanguage> NativeLanguages { get; set; }
        public virtual ICollection<UserLanguageOfInterest> LanguagesOfInterest { get; set; }
        public virtual ICollection<TranslationLike> TranslationLikes { get; set; }
        public virtual ICollection<RequestBookmark> RequestBookmarks { get; set; }
    }
}
