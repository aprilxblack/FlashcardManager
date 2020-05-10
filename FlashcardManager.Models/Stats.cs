using System;
using System.Collections.Generic;
using System.Text;

namespace FlashcardManager.Models
{
    public class Stats
    {
        public List<Card> EasyCards { get; set; }
        public List<Card> HardCards { get; set; }
        public List<Card> CardsLeft { get; set; }
    }
}
