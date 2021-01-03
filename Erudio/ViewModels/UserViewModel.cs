using Erudio.Models;
using System;

namespace Erudio.ViewModels
{
    public class UserViewModel
    {
        public string UserId { get; set; }
        public string UserName { get; set; }
        public string Email { get; set; }
        public DateTime DateOfBirth { get; set; }
        public DateTime RegistrationDate { get; set; }
        public byte[] ProfilePicture { get; set; }
        
        static public UserViewModel ToUserViewModel(ApplicationUser user)
        {
            return new UserViewModel
            {
                UserId = user.Id,
                UserName = user.UserName,
                Email = user.Email,
                DateOfBirth = user.DateOfBirth,
                RegistrationDate = user.RegistrationDate,
                ProfilePicture = user.ProfilePicture
            };
        }
    }
}
