﻿namespace LiftOff_Project.Models
{
    public class WatchList
    {
        //This will be the final WatchList Model - it references our DB for a user's info, the User references it for the list of movies
        //We Can easily update this information to be a one(user) to many(lists) instead of one-one. It could be on MVP. Currently it is a one-one.
        public int Id { get; set; }

        public string Name { get; set; }
        public User User { get; set; }
        public int UserId { get; set; }
        public List<WatchListMovieId> MovieIds { get; set; }

        public WatchList (int id, User user, int userId, List<WatchListMovieId> movieIds)
        {
            id = Id;
            User = user;
            UserId = userId;
            MovieIds = movieIds;
        }

        public WatchList () { }

        public override bool Equals(object? obj)
        {
            return obj is WatchList list &&
                   Id == list.Id;
        }

        public override int GetHashCode()
        {
            return HashCode.Combine(Id);
        }
    }
}