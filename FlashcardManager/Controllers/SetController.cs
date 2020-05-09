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
    }
}