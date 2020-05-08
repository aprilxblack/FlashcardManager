using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace FlashcardManager.Models
{
    public class Card
    {
        [Key]
        public int ID { get; set; }
        [Required]
        public int SetID { get; set; }
        [ForeignKey("SetID")]
        public Set Set { get; set; }
        [Required]
        public string Question { get; set; }
        [Required]
        public string Answer { get; set; }
        public int CorrectAnswersNo { get; set; }
        public int IncorrectAnswersNo { get; set; }
        [Required]
        public bool IsEasy { get; set; }
        [Required]
        public bool IsKnown { get; set; }
    }
}
