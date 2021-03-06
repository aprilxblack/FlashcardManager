﻿using System;
using System.Collections.Generic;
using System.Diagnostics.Eventing.Reader;
using System.Linq;
using System.Security.Cryptography.X509Certificates;
using System.Threading.Tasks;
using FlashcardManager.DataAccess.Data.Repository.IRepository;
using FlashcardManager.Models;
using Microsoft.AspNetCore.Identity;
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
        [Route("login")]
        public ActionResult Login([FromBody] User user)
        {
            User existingUser = _unitOfWork.User.GetFirstOrDefault(x => x.Email == user.Email);

            //if user does not exist or password is incorrect
            if (existingUser == null || !BCrypt.Net.BCrypt.Verify(user.Password, existingUser.Password))
            {
                return Json(new { Error = "The username or password is incorrect." });
            }

            //All good - user authenticated
            return Json(existingUser);
        }

        [HttpPost]
        [Route("register")]
        public ActionResult Register([FromBody] User user)
        {
            User existingUser = _unitOfWork.User.GetFirstOrDefault(x => x.Email == user.Email);

            if (existingUser != null)
            {
                return Json(new { 
                    Error = "This email is already registered."
                });
            }

            string passwordHash = BCrypt.Net.BCrypt.HashPassword(user.Password);

            user.Password = passwordHash;

            _unitOfWork.User.Add(user);
            _unitOfWork.Save();

            User newUser = _unitOfWork.User.GetFirstOrDefault(x => x.Email == user.Email);

            return Json(newUser);
        }

        [HttpGet]
        [Route("get-data")]
        public IActionResult GetUserData(int userId)
        {
            User user = _unitOfWork.User.Get(userId);

            return Json(new {
                username = user.Username,
                lastOpenedSetId = user.LastOpenedSetId
            });
        }

        [HttpGet]
        [Route("get-profile-data")]
        public IActionResult GetProfileData(int userId)
        {
            User user = _unitOfWork.User.Get(userId);

            int numberOfSets = _unitOfWork.Set.GetSetsForUser(user.ID).Count;

            return Json(new
            {
                Username = user.Username,
                Email = user.Email,
                NumberOfSets = numberOfSets
            });
        }
    }
}