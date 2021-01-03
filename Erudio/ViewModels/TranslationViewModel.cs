using Erudio.Models;
using System;

namespace Erudio.ViewModels
{
    public class TranslationViewModel
    {
        public int TranslationId { get; set; }
        public int RequestId { get; set; }
        public string AuthorId { get; set; }
        public string Text { get; set; }
        public string Explanation { get; set; }
        public byte[] ExplanationImage { get; set; }
        public DateTime Date { get; set; }
    }
}
