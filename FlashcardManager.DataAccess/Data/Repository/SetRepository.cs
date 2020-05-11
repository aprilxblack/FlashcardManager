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

        public void Update(Set set)
        {
            var objFromDb = _db.Set.FirstOrDefault(x => x.ID == set.ID);
            objFromDb.Name = set.Name;
            _db.SaveChanges();
        }

    }
}
