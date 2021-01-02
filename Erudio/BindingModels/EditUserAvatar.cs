using FluentValidation;
using Microsoft.AspNetCore.Http;
using System.ComponentModel.DataAnnotations;

namespace Erudio.BindingModels
{
    public class EditUserAvatar
    {
        [Display(Name = "Profile picture")]
        public byte[] ProfilePicture { get; set; }

        public class EditUserAvatarValidator : AbstractValidator<EditUserAvatar>
        {
            public EditUserAvatarValidator()
            {
                RuleFor(x => x.ProfilePicture).NotNull()
                    .Must(x => x.Equals("image/jpeg") || x.Equals("image/jpg") || x.Equals("image/png"));
            }
        }
    }
}
