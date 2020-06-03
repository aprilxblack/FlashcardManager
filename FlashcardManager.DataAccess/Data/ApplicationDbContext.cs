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

        //these properties represent the tables from the database - they need to have the same name
        public DbSet<User> User { get; set; }
        public DbSet<Set> Set { get; set; }
        public DbSet<Card> Card { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            //this is so that the EF doesn't try to insert the 0 value into ID column
            builder.Entity<User>().HasKey(x => x.ID);
            builder.Entity<Set>().HasKey(x => x.ID);
            builder.Entity<Card>().HasKey(x => x.ID);

        }
    }


}
