using System.ComponentModel.DataAnnotations;

namespace Erudio.BindingModels
{
    public class CreateNativeLanguage
    {
        [Required]
        [Display(Name = "UserId")]
        public string UserId { get; set; }
        [Required]
        [Display(Name = "Language code")]
        public string LanguageCode { get; set; }
    }
}
