using FlashcardManager.DataAccess.Data.Repository.IRepository;
using FlashcardManager.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace FlashcardManager.DataAccess.Data.Repository
{
    public class CardRepository : Repository<Card>, ICardRepository
    {
        private readonly ApplicationDbContext _db;

        public CardRepository(ApplicationDbContext db) : base(db)
        {
            _db = db;
        }

        public List<Card> GetCardsForSet(int setId)
        {
            return _db.Card.Where(x => x.SetID == setId).OrderByDescending(x => x.ID).ToList();
        }

        public void ResetAllStats(int setId)
        {
            List<Card> set = _db.Card.Where(x => x.SetID == setId).ToList();

            foreach (Card card in set)
            {
                card.CorrectAnswersNo = 0;
                card.IncorrectAnswersNo = 0;
                card.IsEasy = false;
                card.IsKnown = false;
            }

            _db.SaveChanges();
        }

        public void Update(Card card)
        {
            var objFromDb = _db.Card.FirstOrDefault(x => x.ID == card.ID);
            objFromDb.Question = card.Question;
            objFromDb.Answer = card.Answer;

            _db.SaveChanges();
        }

        public void UpdateStats(Card card)
        {
            var objFromDb = _db.Card.FirstOrDefault(x => x.ID == card.ID);

            objFromDb.CorrectAnswersNo = card.CorrectAnswersNo;
            objFromDb.IncorrectAnswersNo = card.IncorrectAnswersNo;
            objFromDb.IsEasy = card.IsEasy;
            objFromDb.IsKnown = card.IsKnown;

            _db.SaveChanges();
        }
    }
}
