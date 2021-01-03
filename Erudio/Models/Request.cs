using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Erudio.Models
{
    public class Request
    {
        public Request()
        {
            Translations = new List<Translation>();
            RequestBookmarks = new List<RequestBookmark>();
        }

        [Key]
        [Required]
        public int RequestId { get; set; }
        [Required]
        public string AuthorId { get; set; }
        [Required]
        public string FromLanguageCode { get; set; }
        [Required]
        public string ToLanguageCode { get; set; }
        [Required]
        public string Text { get; set; }
        public string Context { get; set; }
        public byte[] ContextImage { get; set; }
        [Required]
        public DateTime Date { get; set; }
        
        public virtual ICollection<Translation> Translations { get; set; }
        public virtual ICollection<RequestBookmark> RequestBookmarks { get; set; }

    }
}
