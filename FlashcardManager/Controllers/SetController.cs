using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FlashcardManager.DataAccess.Data.Repository.IRepository;
using FlashcardManager.Models;
using Microsoft.AspNetCore.Mvc;

namespace FlashcardManager.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class SetController : Controller
    {
        private readonly IUnitOfWork _unitOfWork;

        public SetController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        [HttpPost]
        [Route("create")]
        public int Create([FromBody] Set set)
        {
            _unitOfWork.Set.Add(set);
            _unitOfWork.Save();

            return set.ID;
        }

        [HttpGet]
        [Route("edit")]
        public IActionResult EditSet(int id)
        {
            string setName = _unitOfWork.Set.GetFirstOrDefault(x => x.ID == id).Name;
            List<Card> cards = _unitOfWork.Card.GetCardsForSet(id);

            return Json(new
            {
                SetName = setName,
                Cards = cards
            });
        }

        [HttpGet]
        [Route("browse")]
        public IActionResult BrowseSets(int userId)
        {
            List<Set> sets = _unitOfWork.Set.GetSetsForUser(userId);

            return Json(new
            {
                Sets = sets
            });
        }

        [HttpDelete]
        [Route("delete")]
        public IActionResult DeleteSet(int id)
        {
            Set setToDelete = _unitOfWork.Set.GetFirstOrDefault(x => x.ID == id);

            _unitOfWork.Set.Remove(setToDelete);
            _unitOfWork.Save();

            return Json(new
            {
                Message = "Successfully deleted set: " + setToDelete.Name
            }); ;
        }
    }
}