import React, { useEffect, useState } from "react";
import "./Banner.css";
import axios from "./axios";
import requests from "./Request";

function Banner() {
  // Fetching data from TMDB Database
  const [movie, setMovie] = useState([]);

  useEffect(() => {
    // Run once when the banner loads
    async function fetchData() {
      const request = await axios.get(requests.fetchNetflixOriginals);
      setMovie(
        request.data.results[
        Math.floor(Math.random() * request.data.results.length - 1)
        ]
      );
      return request;
    }
    fetchData();
  }, []);

  console.log(movie);

  // Truncate the description to 150 characters
  function truncate(string, n) {
    return string?.length > n ? string.substr(0, n - 1) + "..." : string;
  }

  // const base_url = "https://image.tmdb.org/t/p/original/";

  return (
    <header
      className="banner"
      style={{
        backgroundSize: "cover",
        // `url("https://image.tmdb.org/t/p/original/${movie.backdrop_path}}")`
        backgroundImage: `url("https://www.themoviedb.org/t/p/original/${movie.backdrop_path}")`,
        backgroundPosition: "center center",
      }}
    >
      <div className="banner__contents">
        <h1 className="banner__title">
          {movie?.title || movie?.name || movie?.original_name}
        </h1>
        <div className="banner__buttons">
          <button className="banner__button">Play</button>
          <button className="banner__button">Watchlist</button>
        </div>
        <h1 className="banner__description">
          {truncate(movie?.overview, 150)}
        </h1>
      </div>

      {/* Nice fade in the bottom of the black banner */}
      <div className="banner--fadeBottom" />
    </header>
  );
}

export default Banner;
