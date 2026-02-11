"use strict";

const API_KEY = "a3433b07";
const baseUrl = "https://www.omdbapi.com/";

// const loading = document.querySelector(".loading");
// const error = document.querySelector(".error");
// const results = document.querySelector(".results");

const movieTitle = document.querySelector(".movie_title");
const searchBtn = document.querySelector(".searchbtn");
const movieDetails = document.querySelector(".moviedetails");

let searchResults = [];

function searchMovies() {
  const movieName = movieTitle.value.trim();

  if (movieName === "") {
    results.innerHTML = "<p>please enter a movie name</p>";
    return;
  }

  fetch(`${baseUrl}/?apikey=${API_KEY}&s=${movieName}`)
    .then((response) => response.json())
    .then((data) => {
      if (data.response === "false") {
        results.innerHTML = `<p>${data.error}</p>`;
        return;
      }

      searchResults = data.Search;
      renderMovies(data.Search);
    })
    .catch(() => {
      movieDetails.innerHTML = "<p>something went wrong</p>";
    });
}

function renderMovies(movies) {
  movieDetails.innerHTML = "";
  movies.forEach((movie) => {
    movieDetails.innerHTML += `
      <div class="movie-card" onclick="showMovieDetails('${movie.imdbID}')">
        <img src="${movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/200x300?text=No+Image"}">
        <h3>${movie.Title}</h3>
        <p>${movie.Year}</p>
        <p>${movie.Type}</p>
      </div>
    `;
  });
}

function showMovieDetails(imdbID) {
  movieDetails.innerHTML = "<p>Loading movie details....</p>";

  fetch(`${baseUrl}/?apikey=${API_KEY}&i=${imdbID}&plot=full`)
    .then((res) => res.json())
    .then((movie) => {
      movieDetails.innerHTML = `
        <div class="details">
        <img src="${movie.Poster !== "N/A" ? movie.Poster : ""}" class="w-80 px-5">
        <h3 class="text-white text-lg>${movie.Title} (${movie.Year})</h3>
        <p  class="text-white text-sm"><strong>Plot:</strong> ${movie.Plot}</p>
        <p  class="text-white text-sm"><strong>Director:</strong> ${movie.Director}</p>
        <p  class="text-white text-sm"><strong>Actors:</strong> ${movie.Actors}</p>
        <p  class="text-white text-sm"><strong>IMDb Rating:</strong> ⭐ ${movie.imdbRating}</p>
        <p  class="text-white text-sm"><strong>Runtime:</strong> ⏱ ${movie.Runtime}</p>

        </div>
      
    `;
    });
}

searchBtn.addEventListener("click", searchMovies);
function goBack() {
  renderMovies(searchResults);
}
