using FlashcardManager.DataAccess.Data.Repository.IRepository;
using FlashcardManager.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace FlashcardManager.DataAccess.Data.Repository
{
    public class UserRepository : Repository<User>, IUserRepository
    {
        private readonly ApplicationDbContext _db;

        public UserRepository(ApplicationDbContext db) : base(db)
        {
            _db = db;
        }
        public void Update(User user)
        {
            var objFromDb = _db.User.FirstOrDefault(x => x.ID == user.ID);

            objFromDb.Username = user.Username;
            objFromDb.Password = user.Password;
            objFromDb.Email = user.Email;

            _db.SaveChanges();
        }
    }
}
