using System;
using System.Collections.Generic;
using System.Diagnostics.Eventing.Reader;
using System.Linq;
using System.Threading.Tasks;
using FlashcardManager.DataAccess.Data.Repository.IRepository;
using FlashcardManager.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Routing;

namespace FlashcardManager.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserController : Controller
    {
        private readonly IUnitOfWork _unitOfWork;

        public UserController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }
        [HttpPost]
        [ValidateAntiForgeryToken]
        public bool Login(string email, string password)
        {
            User existingUser = _unitOfWork.User.GetFirstOrDefault(x => x.Email == email);

            //User does not exist
            if (existingUser == null)
            {
                return false;
            }

            //Password doesn't match
            if (!BCrypt.Net.BCrypt.Verify(password, existingUser.Password))
            {
                return false;
            }

            //All good - user authenticated
            return true;
        }

        [HttpPost]
        [Route("register")]
        public ActionResult Register([FromBody] User user)
        {
            string passwordHash = BCrypt.Net.BCrypt.HashPassword(user.Password);

            user.Password = passwordHash;

            _unitOfWork.User.Add(user);
            _unitOfWork.Save();

            User newUser = _unitOfWork.User.GetFirstOrDefault(x => x.Email == user.Email);

            return Json(newUser);
        }
    }
}