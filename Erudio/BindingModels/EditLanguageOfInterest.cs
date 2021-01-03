using FluentValidation;
using System.ComponentModel.DataAnnotations;

namespace Erudio.BindingModels
{
    public class EditLanguageOfInterest
    {
        [Display(Name = "Language code")]
        public string LanguageCode { get; set; }
    }

    public class EditLanguageOfInterestValidator : AbstractValidator<EditLanguageOfInterest>
    {
        public EditLanguageOfInterestValidator()
        {
            RuleFor(x => x.LanguageCode).NotNull();
        }
    }
}
