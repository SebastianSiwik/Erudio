using Erudio.Models;
using System;

namespace Erudio.ViewModels
{
    public class RequestViewModel
    {
        public int RequestId { get; set; }
        public string AuthorId { get; set; }
        public string FromLanguageCode { get; set; }
        public string ToLanguageCode { get; set; }
        public string Text { get; set; }
        public string Context { get; set; }
        public byte[] ContextImage { get; set; }
        public DateTime Date { get; set; }
    }
}
