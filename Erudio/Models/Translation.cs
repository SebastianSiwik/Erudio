using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Erudio.Models
{
    public class Translation
    {
        public Translation()
        {
            TranslationLikes = new List<TranslationLike>();
        }

        [Key]
        [Required]
        public int TranslationId { get; set; }
        [Required]
        public int RequestId { get; set; }
        [Required]
        public string AuthorId { get; set; }
        [Required]
        public string Text { get; set; }
        public string Explanation { get; set; }
        public byte[] ExplanationImage { get; set; }
        [Required]
        public DateTime Date { get; set; }

        public virtual ICollection<TranslationLike> TranslationLikes { get; set; }
    }
}
