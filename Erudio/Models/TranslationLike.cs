using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Erudio.Models
{
    public class TranslationLike
    {
        public string UserId { get; set; }
        public ApplicationUser User { get; set; }

        [Required]
        public int TranslationId { get; set; }
        [Required]
        public Translation Translation { get; set; }
    }
}
