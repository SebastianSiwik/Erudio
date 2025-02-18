﻿using Erudio.Models;
using IdentityServer4.EntityFramework.Options;
using Microsoft.AspNetCore.ApiAuthorization.IdentityServer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Erudio.Data
{
    public class ApplicationDbContext : ApiAuthorizationDbContext<ApplicationUser>
    {
        public ApplicationDbContext(
            DbContextOptions options,
            IOptions<OperationalStoreOptions> operationalStoreOptions) : base(options, operationalStoreOptions)
        {
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Language>().HasIndex(l => l.LanguageCode).IsUnique();
            modelBuilder.Entity<RequestBookmark>().HasKey(rb => new { rb.UserId, rb.RequestId });
            modelBuilder.Entity<TranslationLike>().HasKey(tl => new { tl.UserId, tl.TranslationId });
            modelBuilder.Entity<NativeLanguage>().HasKey(nl => nl.Id);
            modelBuilder.Entity<LanguageOfInterest>().HasKey(loi => loi.Id);
        }
        public DbSet<Language> Languages { get; set; }
        public DbSet<Request> Requests { get; set; }
        public DbSet<Translation> Translations { get; set; }
        public DbSet<RequestBookmark> RequestBookmarks { get; set; }
        public DbSet<TranslationLike> TranslationLikes { get; set; }
        public DbSet<NativeLanguage> NativeLanguages { get; set; }
        public DbSet<LanguageOfInterest> LanguagesOfInterest { get; set; }
    }
}
