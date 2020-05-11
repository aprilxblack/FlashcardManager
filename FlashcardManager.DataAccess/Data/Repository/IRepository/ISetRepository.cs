using FlashcardManager.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace FlashcardManager.DataAccess.Data.Repository.IRepository
{
    public interface ISetRepository : IRepository<Set>
    {
        void Update(Set set);
        List<Set> GetSetsForUser(int userId);
    }
}
