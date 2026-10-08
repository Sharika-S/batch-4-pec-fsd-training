import React, { useState } from "react";
import "./App.css";

import MovieCard from "./components/MovieCard";
import SearchBar from "./components/SearchBar";
import MovieDetail from "./components/MovieDetail";

function App() {
  const API_KEY = "578fa61";

  const [search, setSearch] = useState("");
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const searchMovies = async () => {
    if (!search.trim()) {
      return;
    }

    try {
      const response = await fetch(
        `https://www.omdbapi.com/?apikey=${API_KEY}&s=${search}`
      );

      const data = await response.json();

      if (data.Response === "True") {
        setMovies(data.Search);
      } else {
        setMovies([]);
        alert(data.Error);
      }
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  const getMovieDetails = async (id) => {
    try {
      const response = await fetch(
        `https://www.omdbapi.com/?apikey=${API_KEY}&i=${id}&plot=full`
      );

      const data = await response.json();

      setSelectedMovie(data);
    } catch (error) {
      console.error("Error fetching movie details:", error);
    }
  };

  return (
    <div className="app">

      <h1>🎬 Movie Explorer</h1>

      <SearchBar
        search={search}
        setSearch={setSearch}
        onSearch={searchMovies}
      />

      <div className="movie-container">
        {movies.map((movie) => (
          <MovieCard
            key={movie.imdbID}
            movie={movie}
            onClick={getMovieDetails}
          />
        ))}
      </div>

      <MovieDetail
        movie={selectedMovie}
        onClose={() => setSelectedMovie(null)}
      />

    </div>
  );
}

export default App;