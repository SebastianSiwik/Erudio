using System.ComponentModel.DataAnnotations;

namespace Erudio.BindingModels
{
    public class CreateTranslationLike
    {
        [Required]
        [Display(Name = "UserId")]
        public string UserId { get; set; }
        [Required]
        [Display(Name = "TranslationId")]
        public int TranslationId { get; set; }

    }
}
