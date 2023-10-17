const api_key = "ba069c26b108b6e6c1bba7a0e71516ad";
const api_default_url = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=${api_key}`;
const api_nowplaying_url = `https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1&api_key=${api_key}`;
const api_toprated_url = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=vote_average.desc&without_genres=99,10755&vote_count.gte=200&api_key=${api_key}`;
const api_popular_url = `https://api.themoviedb.org/3/movie/popular?language=en-US&page=1&api_key=${api_key}`;
const api_upcoming_url = `https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1&api_key=${api_key}`;
const api_turkce_url = `https://api.themoviedb.org/3/movie/popular?language=tr-TR&page=1&api_key=${api_key}`;
const api_english_url = `https://api.themoviedb.org/3/movie/popular?language=en-US&page=1&api_key=${api_key}`;


const img_path = "https://image.tmdb.org/t/p/w1280";
const search_api = `https://api.themoviedb.org/3/search/movie?api_key=${api_key}&query="`;
const form = document.getElementById("form");
const search = document.getElementById("search");
const main = document.getElementById("main");

const nowPlaying = document.getElementById('nowPlaying');
const popular = document.getElementById('popular');
const topRated = document.getElementById('topRated');
const upcoming = document.getElementById('upcoming');
const turkce = document.getElementById('turkce');
const english = document.getElementById('english');


getMovies(api_default_url);

nowPlaying.addEventListener('click', (e)=>{
    e.preventDefault();
    console.log("now playing tıklandı");
    getMovies(api_nowplaying_url)
})

topRated.addEventListener('click', (e)=>{
    e.preventDefault();
    console.log("top rated tıklandı");
    getMovies(api_toprated_url)
})

popular.addEventListener('click', (e)=>{
    e.preventDefault();
    console.log("top rated tıklandı");
    getMovies(api_popular_url)
})

upcoming.addEventListener('click', (e)=>{
    e.preventDefault();
    console.log("top rated tıklandı");
    getMovies(api_upcoming_url)
})

turkce.addEventListener('click', (e) =>{
    e.preventDefault();
    getMovies(api_turkce_url)
});

english.addEventListener('click', (e) =>{
    e.preventDefault();
    getMovies(api_english_url)
});

async function getMovies(url) {
  const response = await fetch(url);
  const data = await response.json();
    console.log(data.results);
  showMovies(data.results);
}


function showMovies(movies) {
  main.innerHTML = "";
  movies.forEach((movie) => {
    const { title, poster_path, vote_average, overview, release_date, vote_count} = movie;

    const movieEl = document.createElement("div");
    movieEl.classList.add("movie");
    movieEl.innerHTML = `
        <div class="movie">
        <div class="movie-header">
                    <span class="publish-date">${release_date}</span>
                </div>
        <img src="${img_path + poster_path}" alt="${title}">
        
        <div class="movie-info">
            <h3>${title}</h3>
            <div class="rateDiv">
                <span class="vote">${vote_count} <i class="fa-solid fa-square-poll-vertical"></i></span>
                <span class="${getClassByRate(vote_average)}">${vote_average}</span>
            </div>
            
        </div>

        <div class="overview">
            <h3>Overview</h3>
            ${overview}
        </div>

    </div>
        `;

        main.appendChild(movieEl);
  });
}

function getClassByRate(vote){
    if(vote >= 8){
        return 'green';
    }else if(vote >= 5){
        return 'orange';
    }else {
        return 'red';
    }
}



form.addEventListener("keyup", (e) => {
  e.preventDefault();

  const searchTerm = search.value;

  if (searchTerm && searchTerm !== "") {
    getMovies(search_api + searchTerm);

    //search.value = "";
  } else {
    window.location.reload();
  }
});
