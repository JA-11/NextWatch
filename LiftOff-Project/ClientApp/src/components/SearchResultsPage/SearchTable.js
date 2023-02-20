import React from 'react';
import { Table } from 'reactstrap';
import Axios from 'axios';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import css from './SearchTable.module.css';

export class SearchTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = { movies: [] }
        this.state = { genres: [] }
        this.state = { moviesAttachedToStreamers: [] }
        this.state = { pageOn: window.pageNum }
    }

    //Users ID
    //GET from our databse : UserWatchlist && watchlistmovieid
    //Loop with axios to
    //

    async componentDidMount() {
        //const [Post, setPost] = React.useState(null);
        document.body.style.background = "white";
        //these will be in every request
        const bearer = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2MjcxMjdmMTRjYWNhODM5ZWY0MmQyMmEyM2RjZWZkZSIsInN1YiI6IjYzYWI5MTU3Njk5ZmI3MDBhNzU0NDEyNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.wMsItq5wH6JD3RkfdsW-zCVPjOCrLjY-NcQXfkirVD4"
        const apiUrl = "https://api.themoviedb.org/3/";
        const apiKey = process.env.REACT_APP_AUTH;
        //this is the setup for the search results
        const searchMovies = "search/movie";
        const andQuer = "&query=";
        const andPage = "&page=";
        //Gets genre data to add to movie data
        const genreList = "genre/movie/list";
        const config = {
            headers: { Authorization: `Bearer ${bearer}` }
        }
        let searchString = window.searchTerm;
        //
        //   Change to just get movies.then do the big axios request
        //
        let awaitStreamResponse = [];
        let movieResponse;
        let genreResponse;

        const getAll = async () => {
            let promises = [];
            let movieGet = await Axios.get(
                `${apiUrl}${searchMovies}?api_key=${apiKey}${andQuer}${searchString}${andPage}${window.pageNum}`,
                config
            )
            let movieResults = movieGet.data
            movieResponse = movieResults;
            let moviesAndStreamers = [Axios.get(`${apiUrl}${genreList}?api_key=${apiKey}`, config)];
            let movieStreamerData = [];
            movieResponse.results.forEach(movieForStreamer => {
                moviesAndStreamers.push(Axios.get(`${apiUrl}movie/${movieForStreamer.id}/watch/providers?api_key=${apiKey}`, config))
            })
            let genreAndStreamResp = await Axios.all(moviesAndStreamers).then(finalResp => {
                genreResponse = finalResp[0].data;
                for (let i = 1; i < finalResp.length; i++) {
                    movieStreamerData.push(finalResp[i].data)
                }
                awaitStreamResponse = movieStreamerData;
                return movieStreamerData;
            })
            this.setState({
                movies: movieResponse,
                genres: genreResponse,
                moviesAttachedToStreamers: awaitStreamResponse
            })
        }
        console.log(movieResponse, genreResponse, awaitStreamResponse)
        getAll();
        //https://api.themoviedb.org/3/movie/550/watch/providers?api_key={{TMDB_API_KEY}}&append_to_response=watch/providers/
        if (!this.state.movies || !this.state.genres || !this.state.moviesAttachedToStreamers) { return null }
    }
    addToWatchlist = async (movieid, userid) => {
        const url = `usermovieid/`;  //API controller URL
        var ifExists = false;

        fetch(`usermovieid/${userid}`, {  //this is fetching from the Login API controller to pull a specific user for the email entered
            method: 'GET',
            headers: { 'Content-type': 'application/json' },

        }).then(r => r.json()).then(res => {
            if (res.length > 0) {
                console.log("here");
                for (var i = 0; i < res.length; i++) {
                    if (res[i]['apiMovieId'] == movieid) {
                        ifExists = true;
                        alert('This already exists!!');
                    }
                }
            }
        })

        if (!ifExists) {
            let movieinfo = {
                UserId: userid,
                APIMovieId: movieid
            };
            await Axios.post(url, movieinfo);  //this is adding the newly created user to the database
            alert("Added to the watchlist");
        }
    }

    clickLogOut = () => {
        window.user = null;
        window.userid = null;
    };

    clickNextPage = () => {
        window.pageNum++;
        this.pageOn = window.pageNum;
        this.componentDidMount();
    }

    clickLastPage = () => {
        window.pageNum--;
        this.pageOn = window.pageNum;
        this.componentDidMount();
    }

    render() {
        if (this.state.movies === undefined || this.state.genres === undefined /*|| this.state.moviesAttachedToStreamers === null*/) {
            return (
                <div>
                    <h1>Loading...</h1>
                </div>
            )
        }
        else {
            console.log(this.state.movies.total_pages);
            console.log(this.state.pageOn);
            console.log(window.pageNum);
            //The following determines whether to show or allow users to use the page buttons (if there is no further page, no nextpage, if on page one, no previous)
            let previousPageButton;
            let nextPageButton;

            if (window.pageNum === 1) {
                previousPageButton = <Button disabled className={css.click}>Previous Page</Button>
            } else {
                previousPageButton = <Link to="/search-table">
                    <Button className={css.click} variant="primary" onClick={() => this.clickLastPage()}>Previous Page</Button>{' '}
                </Link>
            }

            if (window.pageNum < this.state.movies.total_pages) {
                nextPageButton = <Link to="/search-table">
                    <Button className={css.click} variant="primary" onClick={() => this.clickNextPage()}>Next Page</Button>{' '}
                </Link>
            } else {
                nextPageButton = <Button disabled className={css.click}>Next Page</Button>
            }

            return (
                <div>
                    <h2 className={css.h2}>Search results for "{window.searchTerm}":
                        <Link to="/">
                            <Button className={css.click} variant="primary" onClick={() => this.clickLogOut()}>Log Out</Button>{' '}
                        </Link>
                        <Link to="/watch-list">
                            <Button className={css.click} variant="primary">My Watch List</Button>{' '}
                        </Link>
                        <Link to="/user-profile">
                            <Button className={css.click} variant="primary">Search Again</Button>{' '}
                        </Link>
                    </h2>

                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Genre(s)</th>
                                <th>Streaming</th>
                                <th>Rent</th>
                                <th>Save(?)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.movies.results.map(movieHit => {
                                let thisHitsGenres = [];
                                let thisHitsStreamingServices = [];
                                let thisHitsRentals = [];
                                for (let i = 0; i < movieHit.genre_ids.length; i++) {
                                    for (let j = 0; j < this.state.genres.genres.length; j++) {
                                        if (movieHit.genre_ids[i] === this.state.genres.genres[j].id) {
                                            thisHitsGenres.push(`${this.state.genres.genres[j].name} `);
                                        }
                                    }
                                }
                                this.state.moviesAttachedToStreamers.forEach(serviceFull => {
                                    //console.log(serviceFull.id)
                                    if (serviceFull.id === movieHit.id) {
                                        if (!serviceFull.results.US) {
                                            thisHitsStreamingServices.push("No streaming found");
                                            thisHitsRentals.push("No rentals found");
                                        } else if (serviceFull.results.US && (serviceFull.results.US.flatrate || serviceFull.results.US.rent)) {
                                            if (serviceFull.results.US.flatrate) {
                                                for (let f = 0; f < serviceFull.results.US.flatrate.length; f++) {
                                                    if (f < serviceFull.results.US.flatrate.length - 1) {
                                                        thisHitsStreamingServices.push(`${serviceFull.results.US.flatrate[f].provider_name}, `);
                                                    } else {
                                                        thisHitsStreamingServices.push(serviceFull.results.US.flatrate[f].provider_name)
                                                    }
                                                }
                                            } if (!serviceFull.results.US.flatrate) {
                                                thisHitsStreamingServices.push("No streaming found");
                                            } if (serviceFull.results.US.rent) {
                                                for (let i = 0; i < 3 && i < serviceFull.results.US.rent.length; i++) {
                                                    if (i < serviceFull.results.US.rent.length - 1 && i < 2) {
                                                        thisHitsRentals.push(`${serviceFull.results.US.rent[i].provider_name}, `);
                                                    } else {
                                                        thisHitsRentals.push(`${serviceFull.results.US.rent[i].provider_name}`)
                                                    }
                                                }
                                            } if (!serviceFull.results.US.rent) {
                                                thisHitsRentals.push("No rentals available");
                                            }
                                        }
                                    }
                                })
                                return (
                                    <tr key={movieHit.id}>
                                        <td key={`${movieHit.id}title`}>{movieHit.title}</td>
                                        <td key={`${movieHit.id}genre`}>{thisHitsGenres}</td>
                                        <td key={`${movieHit.id}stream`}>{thisHitsStreamingServices}</td>
                                        <td key={`${movieHit.id}rent`}>{thisHitsRentals}</td>
                                        <td>
                                            <Button className={css.add} variant="primary" onClick={() => this.addToWatchlist(`${movieHit.id}`, `${window.userid}`)}>Add</Button>{' '}
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </Table>

                    <div className={css.left}>
                        <p className={css.page}>Page Number: {window.pageNum} out of {this.state.movies.total_pages}</p>
                    </div>
                    <div className={css.right}>
                        {previousPageButton}
                        {nextPageButton}
                    </div>

                </div >
            )
        }
    }
}