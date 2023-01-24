﻿// <auto-generated />
using LiftOff_Project.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace LiftOff_Project.Migrations
{
    [DbContext(typeof(NWDbContext))]
    partial class NWDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "6.0.13")
                .HasAnnotation("Relational:MaxIdentifierLength", 64);

            modelBuilder.Entity("LiftOff_Project.Models.Movie", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.HasKey("Id");

                    b.ToTable("Movies");
                });

            modelBuilder.Entity("LiftOff_Project.Models.MyWatchListModel", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<string>("Provider")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<int>("Rated")
                        .HasColumnType("int");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.HasKey("Id");

                    b.ToTable("MyWatchListModels");
                });

            modelBuilder.Entity("LiftOff_Project.Models.TestingModel", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.HasKey("Id");

                    b.ToTable("TestingModels");
                });

            modelBuilder.Entity("LiftOff_Project.Models.User", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<string>("EmailAddress")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("Password")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("UserName")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.HasKey("Id");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("LiftOff_Project.Models.WatchList", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<int>("UserId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("UserId")
                        .IsUnique();

                    b.ToTable("WatchLists");
                });

            modelBuilder.Entity("LiftOff_Project.Models.WatchListMovieId", b =>
                {
                    b.Property<int>("MovieId")
                        .HasColumnType("int");

                    b.Property<int>("WatchListId")
                        .HasColumnType("int");

                    b.HasKey("MovieId", "WatchListId");

                    b.HasIndex("WatchListId");

                    b.ToTable("WatchListMovies");
                });

            modelBuilder.Entity("LiftOff_Project.Models.WatchList", b =>
                {
                    b.HasOne("LiftOff_Project.Models.User", "User")
                        .WithOne("WatchList")
                        .HasForeignKey("LiftOff_Project.Models.WatchList", "UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("User");
                });

            modelBuilder.Entity("LiftOff_Project.Models.WatchListMovieId", b =>
                {
                    b.HasOne("LiftOff_Project.Models.Movie", "Movie")
                        .WithMany()
                        .HasForeignKey("MovieId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("LiftOff_Project.Models.WatchList", "WatchList")
                        .WithMany("MovieIds")
                        .HasForeignKey("WatchListId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Movie");

                    b.Navigation("WatchList");
                });

            modelBuilder.Entity("LiftOff_Project.Models.User", b =>
                {
                    b.Navigation("WatchList")
                        .IsRequired();
                });

            modelBuilder.Entity("LiftOff_Project.Models.WatchList", b =>
                {
                    b.Navigation("MovieIds");
                });
#pragma warning restore 612, 618
        }
    }
}
