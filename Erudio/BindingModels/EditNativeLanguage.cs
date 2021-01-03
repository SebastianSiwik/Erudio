using FluentValidation;
using System.ComponentModel.DataAnnotations;

namespace Erudio.BindingModels
{
    public class EditNativeLanguage
    {
        [Display(Name = "Language code")]
        public string LanguageCode { get; set; }
    }

    public class EditNativeLanguageValidator : AbstractValidator<EditNativeLanguage>
    {
        public EditNativeLanguageValidator()
        {
            RuleFor(x => x.LanguageCode).NotNull();
        }
    }
}
