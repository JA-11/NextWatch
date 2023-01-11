﻿namespace LiftOff_Project.Models
{
    public class Movie
    {
        //This ID is necessary primarily in linking a User-Watchlist-WatchListMovieId-MovieId.
        //*********************************
        //
        //    If I am correct, this class will only exist for testing purposes before we integrate the API - I believe we will actually only need to store information in the
        //    WatchListMovieId objects, as A) the API can give us the movie Ids, B) the movie Ids only point to something from the API, C) We don't need a persistent store of
        //    literally just Ids on our end. Later, I will likely delete the Initial Migrations completely and start fresh when we integrate the API.
        //
        //*********************************
        public int Id { get; set; }

        //TITLE FIELD EXISTS FOR DEVELOPMENT ONLY, WILL NOT SHOW IN FULL 1.0
        public string Title { get; set; }
        public Movie () { }

        public Movie (string title)
        {
           Title = title;
        }
    }
}
