using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Erudio.BindingModels
{
    public class CreateRequest
    {
        [Required]
        [Display(Name = "AuthorId")]
        public string AuthorId { get; set; }

        [Required]
        [Display(Name = "From language code")]
        public string FromLanguageCode { get; set; }

        [Required]
        [Display(Name = "To language code")]
        public string ToLanguageCode { get; set; }

        [Required]
        [Display(Name = "Text")]
        public string Text { get; set; }

        [Display(Name = "Context")]
        public string Context { get; set; }

        [Display(Name = "Context image")]
        public byte[] ContextImage { get; set; }
    }
}
