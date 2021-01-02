﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Erudio.Models
{
    public class Language
    {
        [Key]
        [Required]
        public int LanguageId { get; set; }
        [Required]
        public string LanguageCode { get; set; }
        [Required]
        public string LanguageName { get; set; }

        public virtual ICollection<UserNativeLanguage> NativeLanguages { get; set; }
        public virtual ICollection<UserLanguageOfInterest> LanguagesOfInterest { get; set; }
    }
}
