const moviesContainer = document.querySelector('.movies');
const btnPrev = document.querySelector('.btn-prev');
const btnNext = document.querySelector('.btn-next');
const input = document.querySelector('.input');

const highlightVideoLink = document.querySelector('.highlight__video-link');
const highlightVideo = document.querySelector('.highlight__video');
const highlightTitle = document.querySelector('.highlight__title');
const highlightRating = document.querySelector('.highlight__rating');
const highlightGenres = document.querySelector('.highlight__genres');
const highlightLaunch = document.querySelector('.highlight__launch');
const highlightDescripition = document.querySelector('.highlight__description');

let currentPage = 0;
let currentMovies = [];

input.addEventListener('change', function (event) {    

    if (event.key === 'Enter') {
        loadSearchMovies(input.value);

        input.value = '';

        return;

    }

    currentPage = 0;

    if (event.target.value) {
        loadSearchMovies(event.target.value);
    } else {
        loadMovies();
    }
    
});

btnPrev.addEventListener('click', function () {
    if (currentPage == 0) {
        currentPage = 3;
    } else {
        currentPage--;
    }

    displayMovies();
});

btnNext.addEventListener('click', function () {
    if (currentPage == 3) {
        currentPage = 0;
    } else {
        currentPage++;
    }

    displayMovies();
});

function displayMovies() {
    moviesContainer.textContent = '';

    for (let i = 0; i < 5; i++) {
        const movie = currentMovies[currentPage * 5 + i];
        
        const movieContainer = document.createElement('div');
        movieContainer.classList.add('movie');
        movieContainer.style.backgroundImage = `url(${movie.poster_path})`;

        const movieInfo = document.createElement('div');
        movieInfo.classList.add('movie__info');

        const movieTitle = document.createElement('span');
        movieTitle.classList.add('movie__title');
        movieTitle.textContent = movie.title;

        const movieRating = document.createElement('span');
        movieRating.classList.add('movie__rating');
        movieRating.innerHTML = movie.vote_average;

        const star = document.createElement('img');
        star.src = "../assets/estrela.svg";
        star.alt = "Estrela";

        movieRating.append(star);
        movieInfo.append(movieTitle, movieRating);
        movieContainer.append(movieInfo);

        moviesContainer.append(movieContainer);
    }
}

function loadSearchMovies(search) {
    const responsePromise = fetch(`https://tmdb-proxy.cubos-academy.workers.dev/3/search/movie?language=pt-BR&include_adult=false&query=${search}`);

    responsePromise.then(function (response) {
        const bodyPromise = response.json();

        bodyPromise.then(function (body) {
            currentMovies = body.results;
            displayMovies();

        })
    });
}

function loadMovies() {
    const responsePromise = fetch(`https://tmdb-proxy.cubos-academy.workers.dev/3/discover/movie?language=pt-BR&include_adult=false`);

    responsePromise.then(function (response) {
        const bodyPromise = response.json();

        bodyPromise.then(function (body) {
            currentMovies = body.results;

            moviesContainer.innerHTML = "";

            displayMovies();
        })
    });
}

function loadHighlightMovie() {
    const basePromise = fetch(`https://tmdb-proxy.cubos-academy.workers.dev/3/movie/436969?language=pt-BR`);

    basePromise.then(function (response) {
        const bodyPromise = response.json();

        bodyPromise.then(function (body) {
            highlightVideo.style.background = `linear-gradient(rgba(0, 0, 0, 0.6) 100%, rgba(0,0,0, 0.6) 100%), url('${body.backdrop_path}') no-repeat center / cover`;
            highlightTitle.textContent = body.title;
            highlightRating.textContent = body.vote_average;
            highlightGenres.textContent = body.genres.map(function (genre){ 
                return genre.name;
            }).join(', ');
            highlightLaunch.textContent = (new Date(body.release_date)).toLocaleDateString('pt-BR', {year: "numeric", month: "long", day: "numeric" });
            highlightDescripition.textContent = body.overview;    

            
        })
    });

    const linkPromise = fetch('https://tmdb-proxy.cubos-academy.workers.dev/3/movie/436969/videos?language=pt-BR');

    linkPromise.then(function (response) {
        const bodyPromise = response.json();

        bodyPromise.then(function (body) {
            highlightVideoLink.href = `https://www.youtube.com/watch?v=${body.results[0].key}`;
        })
    })


}

loadMovies();
loadHighlightMovie();





