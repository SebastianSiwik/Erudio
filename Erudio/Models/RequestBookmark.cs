using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Erudio.Models
{
    public class RequestBookmark
    {
        public int UserId { get; set; }
        public ApplicationUser User { get; set; }

        [Required]
        public int RequestId { get; set; }
        [Required]
        public Request Request { get; set; }
    }
}
