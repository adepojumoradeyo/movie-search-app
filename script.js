"use strict";

const API_KEY = "a3433b07";
const baseUrl = "https://www.omdbapi.com/";

const searchInput = document.querySelector(".searchinput");
const searchBtn = document.querySelector(".searchbtn");
const results = document.querySelector(".results");
const movieDetails = document.querySelector(".moviedetails");
const backResults = document.querySelector(".backtoresults");
const backBtn = document.querySelector(".backbtn");

let searchResults = [];

// function to search movie names
async function searchMovies() {
  try {
    const movieName = searchInput.value.trim();

    if (movieName === "") {
      results.innerHTML = `<p class="text-white">please enter a movie name</p>`;
      return;
    }
    results.innerHTML = `<p class="text-white">Loading movies....</p>`;

    const response = await fetch(
      `${baseUrl}/?apikey=${API_KEY}&s=${movieName}`,
    );
    const data = await response.json();

    if (data.response === "false") {
      results.innerHTML = `<p class="text-white">${data.error}</p>`;
      return;
    }

    searchResults = data.Search;
    displayMovies(data.Search);
  } catch (error) {
    results.innerHTML = "";
    movieDetails.innerHTML = `<p class="text-white">something went wrong</p>`;
  }
}

// fuction of how to show the movies
function displayMovies(movies) {
  results.innerHTML = "";
  movies.forEach((movie) => {
    results.innerHTML += `
      <div class="movie-card  bg-white px-4 py-2 text-left  transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-110 hover:bg-indigo-200 duration-300 " onclick="getMovieDetails('${movie.imdbID}')">
        <img src="${movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/200x300?text=No+Image"}">
        <h1 class="font-bold">${movie.Title}</h1>
        <p class="font-medium">${movie.Year}</p>
        <p class="font-medium">${movie.Type}</p>
      </div>
    `;
    backResults.classList.add("hidden");
    backBtn.classList.remove("hidden");
  });
}

// function to get movie details
async function getMovieDetails(imdbID) {
  try {
    results.textContent = "";
    movieDetails.innerHTML = `<p class="text-white">Loading movie details....</p>`;
    backBtn.classList.add("hidden");

    const response = await fetch(
      `${baseUrl}/?apikey=${API_KEY}&i=${imdbID}&plot=full`,
    );
    const data = await response.json();

    displayMoviesDetails(data);

    backResults.classList.remove("hidden");
  } catch (error) {
    console.log(error);
    movieDetails.textContent = `<p class="text-white">failed to fetch movie details</p>`;
  }
}

// function of what to show on each movie click
function displayMoviesDetails(movie) {
  movieDetails.innerHTML = `
        <div class="details bg-white inline-flex flex-col justify-center text-left px-2 py-5 w-4/5 xl:w-1/2">
        <img src="${movie.Poster !== "N/A" ? movie.Poster : ""}" class="w-4/5 h-auto self-center">
        <h3 class="text-lg mt-4 font-bold">${movie.Title} (${movie.Year})</h3>
        <p  class=" text-sm mt-3"><strong>Plot:</strong> ${movie.Plot}</p>
        <p  class=" text-sm mt-3"><strong>Director:</strong> ${movie.Director}</p>
        <p  class=" text-sm mt-3"><strong>Actors:</strong> ${movie.Actors}</p>
        <p  class=" text-sm mt-3"><strong>IMDb Rating:</strong> ⭐ ${movie.imdbRating}</p>
        <p  class=" text-sm mt-3"><strong>Runtime:</strong> ⏱ ${movie.Runtime}</p>
        </div>
    `;
}

// search event listener
searchBtn.addEventListener("click", searchMovies);

// function to go back to results
function backToResults() {
  displayMovies(searchResults);
  movieDetails.textContent = "";
}

backBtn.addEventListener("click", () => {
  backBtn.classList.add("hidden");
  results.textContent = "";
});
