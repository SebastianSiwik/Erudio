using Microsoft.AspNetCore.Http;
using System.IO;

namespace Erudio.Common
{
    static public class FileConverter
    {
        static public byte[] IFormFileToBytes(IFormFile file)
        {
            var ms = new MemoryStream();
            file.CopyTo(ms);
            var fileBytes = ms.ToArray();
            return fileBytes;
        }
    }
}
