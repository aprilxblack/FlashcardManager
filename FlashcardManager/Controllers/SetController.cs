using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using FlashcardManager.DataAccess.Data.Repository.IRepository;
using FlashcardManager.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.VisualBasic.FileIO;

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
            Set set = _unitOfWork.Set.GetFirstOrDefault(x => x.ID == id);
            List<Card> cards = _unitOfWork.Card.GetCardsForSet(id);

            return Json(new
            {
                Set = set,
                Cards = cards
            });
        }

        [HttpGet]
        [Route("study")]
        public IActionResult StudySet(int id)
        {
            string setName = _unitOfWork.Set.GetFirstOrDefault(x => x.ID == id).Name;
            List<Card> cards = _unitOfWork.Card.GetCardsForSet(id);

            //update user's last opened set
            Set set = _unitOfWork.Set.Get(id);
            User user = _unitOfWork.User.Get(set.UserID);
            user.LastOpenedSetId = set.ID;
            _unitOfWork.Save();

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

        [HttpPost]
        [Route("create-from-csv")]
        public async Task<IActionResult> CreateFromCSV()
        {
            var file = HttpContext.Request.Form.Files[0];
            var setName = HttpContext.Request.Form["SetName"].ToString() ;
            string userIdString = HttpContext.Request.Form["UserID"].ToString();
            int userId;
            int.TryParse(userIdString, out userId);

            string text = null;
            using (var stream = file.OpenReadStream())
            using (var reader = new StreamReader(stream))
            {
                text = reader.ReadToEnd();
            }

            Set set = new Set()
            {
                Name = setName,
                UserID = userId
            };

            _unitOfWork.Set.Add(set);
            _unitOfWork.Save();
            var setId = set.ID;

            var lines = text.Split("\r\n");
            foreach(var line in lines)
            {
                //skip an empty string after last line break
                if(line != "")
                {
                    var words = line.Split(',');
                    var card = new Card()
                    {
                        Question = words[0],
                        Answer = words[0],
                        SetID = setId,
                        CorrectAnswersNo = 0,
                        IncorrectAnswersNo = 0,
                        IsEasy = false,
                        IsKnown = false
                    };
                    _unitOfWork.Card.Add(card);
                    _unitOfWork.Save();
                }
            }

            return Json(new
            {
                SetId = setId
            }); 
        }
    }
}