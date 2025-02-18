﻿using System.ComponentModel.DataAnnotations;

namespace Erudio.BindingModels
{
    public class CreateTranslation
    {
        [Required]
        [Display(Name = "requestId")]
        public int RequestId { get; set; }

        [Required]
        [Display(Name = "AuthorId")]
        public string AuthorId { get; set; }

        [Required]
        [Display(Name = "Text")]
        public string Text { get; set; }

        [Display(Name = "Explanation")]
        public string Explanation { get; set; }

        [Display(Name = "Explanation image")]
        public byte[] ExplanationImage { get; set; }
    }
}
