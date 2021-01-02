using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Erudio.Models
{
    public class Translation
    {
        [Key]
        [Required]
        public int TranslationId { get; set; }
        [Required]
        public Request Request { get; set; }
        [Required]
        public ApplicationUser Author { get; set; }
        [Required]
        public string Text { get; set; }
        public string Explanation { get; set; }
        public byte[] ExplanationImage { get; set; }
        [Required]
        public DateTime Date { get; set; }

        public virtual ICollection<TranslationLike> TranslationLikes { get; set; }
    }
}
