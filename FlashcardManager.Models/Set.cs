using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace FlashcardManager.Models
{
    public class Set
    {
        [Key]
        public int ID { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public int UserID { get; set; }
        [ForeignKey("UserID")]
        public User User { get; set; }
    }
}
