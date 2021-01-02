using FluentValidation;
using System;
using System.ComponentModel.DataAnnotations;

namespace Erudio.BindingModels
{
    public class EditUser
    {
        [Display(Name = "Username")]
        public string UserName { get; set; }

        [Display(Name = "Email")]
        public string Email { get; set; }

        [Display(Name = "Date of birth")]
        public DateTime DateOfBirth { get; set; }

        public class EditUserValidator : AbstractValidator<EditUser>
        {
            public EditUserValidator()
            {
                RuleFor(x => x.UserName).NotNull();
                RuleFor(x => x.Email).EmailAddress();
                RuleFor(x => x.DateOfBirth).NotNull();
            }
        }
    }
}
