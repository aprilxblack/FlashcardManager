using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Text;

namespace FlashcardManager.Models
{
    public class CSVUploadModel
    {
        public string SetName { get; set; }
        public int UserID { get; set; }
        public List<IFormFile> Files { get; set; }
    }
}
