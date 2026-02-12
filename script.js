"use strict";

const API_KEY = "a3433b07";
const baseUrl = "https://www.omdbapi.com/";

// const loading = document.querySelector(".loading");
// const error = document.querySelector(".error");
const results = document.querySelector(".results");

const movieTitle = document.querySelector(".movie_title");
const searchBtn = document.querySelector(".searchbtn");
const movieDetails = document.querySelector(".moviedetails");
const backBtn = document.querySelector(".backbtn");

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
  results.innerHTML = "";
  movies.forEach((movie) => {
    results.innerHTML += `
      <div class="movie-card  bg-white px-4 py-2 text-left  transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-110 hover:bg-indigo-200 duration-300 " onclick="showMovieDetails('${movie.imdbID}')">
        <img src="${movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/200x300?text=No+Image"}">
        <h1 class="font-bold">${movie.Title}</h1>
        <p class="font-medium">${movie.Year}</p>
        <p class="font-medium">${movie.Type}</p>
      </div>
    `;
  });
}

function showMovieDetails(imdbID) {
  results.textContent = "";
  movieDetails.innerHTML = "<p>Loading movie details....</p>";

  fetch(`${baseUrl}/?apikey=${API_KEY}&i=${imdbID}&plot=full`)
    .then((res) => res.json())
    .then((movie) => {
      movieDetails.innerHTML = `
        <div class="details bg-white inline-flex flex-col justify-center text-left px-2 py-5 w-4/5">
        <img src="${movie.Poster !== "N/A" ? movie.Poster : ""}" class="w-80 px-5">
        <h3 class="text-lg mt-4 font-bold">${movie.Title} (${movie.Year})</h3>
        <p  class=" text-sm mt-3"><strong>Plot:</strong> ${movie.Plot}</p>
        <p  class=" text-sm mt-3"><strong>Director:</strong> ${movie.Director}</p>
        <p  class=" text-sm mt-3"><strong>Actors:</strong> ${movie.Actors}</p>
        <p  class=" text-sm mt-3"><strong>IMDb Rating:</strong> ⭐ ${movie.imdbRating}</p>
        <p  class=" text-sm mt-3"><strong>Runtime:</strong> ⏱ ${movie.Runtime}</p>
        </div>
    `;
      backBtn.classList.remove("hidden");
    });
}

searchBtn.addEventListener("click", searchMovies);

function goBack() {
  renderMovies(searchResults);
  movieDetails.textContent = "";
}
