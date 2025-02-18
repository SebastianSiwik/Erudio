﻿using System.Collections.Generic;
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
        
        public List<RequestViewModel> PostedRequests { get; set; }
        public List<RequestViewModel> TranslatedRequests { get; set; }
    }
}
