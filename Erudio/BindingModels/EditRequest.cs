using FluentValidation;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Erudio.BindingModels
{
    public class EditRequest
    {
        [Display(Name = "From language code")]
        public string FromLanguageCode { get; set; }

        [Display(Name = "To language code")]
        public string ToLanguageCode { get; set; }

        [Display(Name = "Text")]
        public string Text { get; set; }

        [Display(Name = "Context")]
        public string Context { get; set; }

        [Display(Name = "Context image")]
        public byte[] ContextImage { get; set; }

        public class EditRequestValidator : AbstractValidator<EditRequest>
        {
            public EditRequestValidator()
            {
                RuleFor(x => x.FromLanguageCode).NotNull();
                RuleFor(x => x.ToLanguageCode).NotNull();
                RuleFor(x => x.Text).NotNull();
            }
        }
    }
}
