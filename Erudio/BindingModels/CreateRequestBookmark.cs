using System.ComponentModel.DataAnnotations;

namespace Erudio.BindingModels
{
    public class CreateRequestBookmark
    {
        [Required]
        [Display(Name = "UserId")]
        public string UserId { get; set; }
        [Required]
        [Display(Name = "RequestId")]
        public int RequestId { get; set; }
    }
}
