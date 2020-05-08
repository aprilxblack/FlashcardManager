using System;
using System.Collections.Generic;
using System.Text;
using FlashcardManager.DataAccess.Data.Repository.IRepository;
using FlashcardManager.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace FlashcardManager.DataAccess.Data
{
    public class ApplicationDbContext : IdentityDbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {

        }

        public DbSet<User> User { get; set; }
        public DbSet<Set> Set { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<User>().HasKey(x => x.ID);
            builder.Entity<Set>().HasKey(x => x.ID);

        }
    }


}
