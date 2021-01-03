using System.ComponentModel.DataAnnotations;

namespace Erudio.Models
{
    public class NativeLanguage
    {
        [Key]
        [Required]
        public int Id { get; set; }
        [Required]
        public string UserId { get; set; }
        [Required]
        public string LanguageCode { get; set; }
    }
}
