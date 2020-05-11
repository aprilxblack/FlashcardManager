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
    public class CardController : Controller
    {
        private readonly IUnitOfWork _unitOfWork;

        public CardController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        [HttpPost]
        [Route("create")]
        public IActionResult Create([FromBody] Card card)
        {
            _unitOfWork.Card.Add(card);
            _unitOfWork.Save();

            List<Card> updatedCards = _unitOfWork.Card.GetCardsForSet(card.SetID);

            return Json(new
            {
                Cards = updatedCards
            });
        }

        [HttpPost]
        [Route("update-stats")]
        public IActionResult UpdateStats([FromBody] Card card)
        {
            _unitOfWork.Card.UpdateStats(card);

            _unitOfWork.Save();

            List<Card> updatedCards = _unitOfWork.Card.GetCardsForSet(card.SetID);

            return Json(new
            {
                Cards = updatedCards
            });
        }

        [HttpPost]
        [Route("reset-stats")]
        public IActionResult ResetAllStats(int setId)
        {
            _unitOfWork.Card.ResetAllStats(setId);
            _unitOfWork.Save();

            List<Card> updatedCards = _unitOfWork.Card.GetCardsForSet(setId);

            return Json(new
            {
                Cards = updatedCards
            });
        }
    }
}