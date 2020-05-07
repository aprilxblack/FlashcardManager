using FlashcardManager.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace FlashcardManager.DataAccess.Data.Repository.IRepository
{
    public interface IUserRepository : IRepository<User>
    {
        void Update(User user);
    }
}
