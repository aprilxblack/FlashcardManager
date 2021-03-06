﻿using FlashcardManager.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace FlashcardManager.DataAccess.Data.Repository.IRepository
{
    public interface ICardRepository : IRepository<Card>
    {
        void Update(Card card);
        void UpdateStats(Card card);
        void ResetAllStats(int setId);
        List<Card> GetCardsForSet(int setId);
    }
}
