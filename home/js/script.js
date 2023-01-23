const moviesContainer = document.querySelector('.movies');
const btnPrev = document.querySelector('.btn-prev');
const btnNext = document.querySelector('.btn-next');
const input = document.querySelector('.input');

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

loadMovies();





