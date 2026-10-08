import React from "react";

function MovieDetail({ movie, onClose }) {
  if (!movie) {
    return null;
  }

  return (
    <div className="movie-detail">
      <button onClick={onClose}>✕ Close</button>

      <div className="detail-content">
        <img
          src={
            movie.Poster !== "N/A"
              ? movie.Poster
              : "https://via.placeholder.com/300x450?text=No+Image"
          }
          alt={movie.Title}
        />

        <div>
          <h2>{movie.Title}</h2>

          <p><strong>Year:</strong> {movie.Year}</p>
          <p><strong>Rated:</strong> {movie.Rated}</p>
          <p><strong>Released:</strong> {movie.Released}</p>
          <p><strong>Runtime:</strong> {movie.Runtime}</p>
          <p><strong>Genre:</strong> {movie.Genre}</p>
          <p><strong>Director:</strong> {movie.Director}</p>
          <p><strong>Actors:</strong> {movie.Actors}</p>
          <p><strong>Plot:</strong> {movie.Plot}</p>
          <p><strong>IMDb Rating:</strong> ⭐ {movie.imdbRating}</p>
        </div>
      </div>
    </div>
  );
}

export default MovieDetail;