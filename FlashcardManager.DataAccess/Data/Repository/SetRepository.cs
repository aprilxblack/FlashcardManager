using FlashcardManager.DataAccess.Data.Repository.IRepository;
using FlashcardManager.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace FlashcardManager.DataAccess.Data.Repository
{
    public class SetRepository : Repository<Set>, ISetRepository
    {
        private readonly ApplicationDbContext _db;

        public SetRepository(ApplicationDbContext db) : base(db)
        {
            _db = db;
        }

        public List<Set> GetSetsForUser(int userId)
        {
            return _db.Set.Where(x => x.UserID == userId).ToList();
        }

        public Stats GetStats(int setId)
        {
            IEnumerable<Card> cardsForSet = _db.Card.Where(x => x.SetID == setId);

            Stats stats = new Stats() {
                EasyCards = cardsForSet.Where(x => x.IsEasy == true).ToList(),
                HardCards = cardsForSet.Where(x => x.IncorrectAnswersNo >= 3).ToList(),
                CardsLeft = cardsForSet.Where(x => x.IsKnown == false).ToList()
            };

            return stats;
        }

        public void Update(Set set)
        {
            var objFromDb = _db.Set.FirstOrDefault(x => x.ID == set.ID);
            objFromDb.Name = set.Name;
            _db.SaveChanges();
        }
    }
}
