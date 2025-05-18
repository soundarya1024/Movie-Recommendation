document.addEventListener('DOMContentLoaded', function() {
    // Movie database
    const movies = [
        {
            title: "The Shawshank Redemption",
            genres: ["Drama"],
            year: 1994,
            rating: 9.3,
            description: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
            poster: "https://m.media-amazon.com/images/M/MV5BMDFkYTc0MGEtZmNhMC00ZDIzLWFmNTEtODM1ZmRlYWMwMWFmXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg"
        },
        {
            title: "The Godfather",
            genres: ["Crime", "Drama"],
            year: 1972,
            rating: 9.2,
            description: "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.",
            poster: "https://m.media-amazon.com/images/M/MV5BM2MyNjYxNmUtYTAwNi00MTYxLWJmNWYtYzZlODY3ZTk3OTFlXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg"
        },
        {
            title: "The Dark Knight",
            genres: ["Action", "Crime", "Drama"],
            year: 2008,
            rating: 9.0,
            description: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
            poster: "https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_.jpg"
        },
        {
            title: "Pulp Fiction",
            genres: ["Crime", "Drama"],
            year: 1994,
            rating: 8.9,
            description: "The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.",
            poster: "https://m.media-amazon.com/images/M/MV5BNGNhMDIzZTUtNTBlZi00MTRlLWFjM2ItYzViMjE3YzI5MjljXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg"
        },
        {
            title: "Inception",
            genres: ["Action", "Adventure", "Sci-Fi"],
            year: 2010,
            rating: 8.8,
            description: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
            poster: "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_.jpg"
        },
        {
            title: "The Matrix",
            genres: ["Action", "Sci-Fi"],
            year: 1999,
            rating: 8.7,
            description: "A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.",
            poster: "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_.jpg"
        },
        {
            title: "Parasite",
            genres: ["Comedy", "Drama", "Thriller"],
            year: 2019,
            rating: 8.6,
            description: "Greed and class discrimination threaten the newly formed symbiotic relationship between the wealthy Park family and the destitute Kim clan.",
            poster: "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_.jpg"
        },
        {
            title: "The Social Network",
            genres: ["Biography", "Drama"],
            year: 2010,
            rating: 7.7,
            description: "As Harvard student Mark Zuckerberg creates the social networking site that would become known as Facebook, he is sued by the twins who claimed he stole their idea, and by the co-founder who was later squeezed out of the business.",
            poster: "https://m.media-amazon.com/images/M/MV5BOGUyZDUxZjEtMmIzMC00MzlmLTg4MGItZWJmMzBhZjE0Mjc1XkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg"
        },
        {
            title: "La La Land",
            genres: ["Comedy", "Drama", "Music"],
            year: 2016,
            rating: 8.0,
            description: "While navigating their careers in Los Angeles, a pianist and an actress fall in love while attempting to reconcile their aspirations for the future.",
            poster: "https://m.media-amazon.com/images/M/MV5BMzUzNDM2NzM2MV5BMl5BanBnXkFtZTgwNTM3NTg4OTE@._V1_.jpg"
        },
        {
            title: "Get Out",
            genres: ["Horror", "Mystery", "Thriller"],
            year: 2017,
            rating: 7.7,
            description: "A young African-American visits his white girlfriend's parents for the weekend, where his simmering uneasiness about their reception of him eventually reaches a boiling point.",
            poster: "https://m.media-amazon.com/images/M/MV5BMjUxMDQwNjcyNl5BMl5BanBnXkFtZTgwNzcwMzc0MTI@._V1_.jpg"
        }
    ];

    // All available genres
    const allGenres = [...new Set(movies.flatMap(movie => movie.genres))];

    // DOM elements
    const genreButtonsContainer = document.getElementById('genreButtons');
    const recommendBtn = document.getElementById('recommendBtn');
    const moviesGrid = document.getElementById('moviesGrid');

    // Selected genres
    let selectedGenres = [];

    // Initialize genre buttons
    function initGenreButtons() {
        allGenres.forEach(genre => {
            const button = document.createElement('button');
            button.className = 'genre-btn';
            button.textContent = genre;
            button.addEventListener('click', () => toggleGenre(genre, button));
            genreButtonsContainer.appendChild(button);
        });
    }

    // Toggle genre selection
    function toggleGenre(genre, button) {
        const index = selectedGenres.indexOf(genre);
        if (index === -1) {
            selectedGenres.push(genre);
            button.classList.add('selected');
        } else {
            selectedGenres.splice(index, 1);
            button.classList.remove('selected');
        }
    }

    // Get recommendations based on selected genres
    function getRecommendations() {
        if (selectedGenres.length === 0) {
            alert('Please select at least one genre');
            return;
        }

        // Filter movies that match at least one selected genre
        const recommendedMovies = movies.filter(movie => 
            movie.genres.some(genre => selectedGenres.includes(genre))
        );

        // Sort by rating (highest first)
        recommendedMovies.sort((a, b) => b.rating - a.rating);

        displayRecommendations(recommendedMovies);
    }

    // Display recommendations
    function displayRecommendations(movies) {
        moviesGrid.innerHTML = '';

        if (movies.length === 0) {
            moviesGrid.innerHTML = '<p>No movies found matching your selected genres.</p>';
            return;
        }

        movies.forEach(movie => {
            const movieCard = document.createElement('div');
            movieCard.className = 'movie-card';

            movieCard.innerHTML = `
                <img src="${movie.poster}" alt="${movie.title}" class="movie-poster" onerror="this.src='https://via.placeholder.com/300x450?text=Poster+Not+Available'">
                <div class="movie-info">
                    <h3 class="movie-title">${movie.title}</h3>
                    <div class="movie-meta">
                        <span>${movie.year}</span>
                        <span class="movie-rating">⭐ ${movie.rating}</span>
                    </div>
                    <p class="movie-description">${movie.description}</p>
                </div>
            `;

            moviesGrid.appendChild(movieCard);
        });
    }

    // Initialize the app
    initGenreButtons();

    // Add click event listener to recommendation button
    recommendBtn.addEventListener('click', getRecommendations);
});
