using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

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
    }
}
