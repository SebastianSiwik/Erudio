using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Erudio.Models
{
    public class ApplicationUser : IdentityUser
    {
        public ApplicationUser()
        {
            TranslationLikes = new List<TranslationLike>();
            RequestBookmarks = new List<RequestBookmark>();
            NativeLanguages = new List<NativeLanguage>();
            LanguagesOfInterest = new List<LanguageOfInterest>();
        }

        [Required]
        public DateTime DateOfBirth { get; set; }
        [Required]
        public DateTime RegistrationDate { get; set; }
        public byte[] ProfilePicture { get; set; }

        public virtual ICollection<TranslationLike> TranslationLikes { get; set; }
        public virtual ICollection<RequestBookmark> RequestBookmarks { get; set; }
        public virtual ICollection<NativeLanguage> NativeLanguages { get; set; }
        public virtual ICollection<LanguageOfInterest> LanguagesOfInterest { get; set; }
    }
}
