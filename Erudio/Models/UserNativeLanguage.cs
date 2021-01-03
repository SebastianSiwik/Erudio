using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Erudio.Models
{
    public class UserNativeLanguage
    {
        [Required]
        public string UserId { get; set; }
        [Required]
        public ApplicationUser User { get; set; }

        public int LanugageId { get; set; }
        public Language Language { get; set; }
    }
}
