using FluentValidation;
using System.ComponentModel.DataAnnotations;

namespace Erudio.BindingModels
{
    public class EditTranslation
    {
        [Display(Name = "Text")]
        public string Text { get; set; }

        [Display(Name = "Explanation")]
        public string Explanation { get; set; }

        [Display(Name = "Explanation image")]
        public byte[] ExplanationImage { get; set; }

        public class EditTranslationValidator : AbstractValidator<EditTranslation>
        {
            public EditTranslationValidator()
            {
                RuleFor(x => x.Text).NotNull();
            }
        }
    }
}
