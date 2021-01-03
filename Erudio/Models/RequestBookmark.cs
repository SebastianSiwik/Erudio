using System.ComponentModel.DataAnnotations;

namespace Erudio.Models
{
    public class RequestBookmark
    {
        public string UserId { get; set; }
        public ApplicationUser User { get; set; }

        [Required]
        public int RequestId { get; set; }
        [Required]
        public Request Request { get; set; }
    }
}
