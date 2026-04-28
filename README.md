# StreamMini

StreamMini is a responsive movie discovery and watchlist web application built with HTML, CSS, Bootstrap, and vanilla JavaScript. The project focuses on delivering a polished multi-page user experience with live movie data, client-side authentication flows, personalized watchlist management, and clean UI interactions.

Designed as a portfolio-ready frontend project, StreamMini demonstrates practical skills in API integration, state management with `localStorage`, modular JavaScript architecture, form validation, and responsive interface design.

The app uses The Movie Database (TMDB) API for movie content and EmailJS for the forgot-password OTP flow.

## Portfolio Summary

This project was built to showcase the ability to create a complete frontend product experience without relying on a heavy framework. It combines real API-driven content with user-focused features such as authentication, profile management, watchlist tracking, and password recovery, all organized across reusable JavaScript modules.

For recruiters and hiring teams, this project highlights:

- Strong fundamentals in HTML, CSS, and modern JavaScript
- Experience consuming third-party APIs and rendering dynamic UI
- Ability to design responsive, user-friendly interfaces
- Practical handling of client-side state, validation, and multi-page flows
- Clear separation of concerns across UI, API, auth, and state modules

## Why I Built This

I built StreamMini to practice and demonstrate end-to-end frontend development skills in a realistic product-style project. Instead of creating a static landing page, I wanted to build an app that includes user journeys such as browsing content, searching, saving favorites, managing account data, and recovering access through a password reset flow.

The goal was to create a project that feels closer to a real-world streaming platform experience while staying lightweight and framework-free.

## Key Highlights

- Built a multi-page movie app with modular JavaScript and reusable UI logic
- Integrated TMDB endpoints for trending movies, top-rated content, genres, search, and movie details
- Implemented client-side authentication flows including register, login, logout, and profile editing
- Added a personalized watchlist system with status tracking for each saved movie
- Created an OTP-based forgot-password flow using EmailJS
- Designed a responsive UI using Bootstrap 5 and custom CSS
- Structured the app in a way that is easy to extend with a backend in the future

## Demo / Screenshots

You can add the following when available:

- `Live Demo:` add your deployed project URL here
- `Screenshots:` add preview images or GIFs of the home page, movie details page, login flow, and watchlist

Suggested screenshot sections:

- Home page hero and movie rows
- Search and browse experience
- Movie details page with trailer
- My List watchlist page
- Authentication and profile pages

## Features

- Browse trending and top-rated movies
- Explore genre-based movie rows on the home page
- Search for movies by title
- View detailed movie pages with trailer support
- Create an account and sign in with client-side validation
- Save movies to a personal "My List" watchlist
- Track watchlist progress with statuses like `pending`, `in-progress`, and `completed`
- Edit profile details for the logged-in user
- Reset passwords using OTP-based email verification
- Responsive interface built with Bootstrap 5

## Tech Stack

- HTML5
- CSS3
- JavaScript (ES Modules)
- Bootstrap 5
- TMDB API
- EmailJS
- Browser `localStorage`

## Pages

- `index.html` - landing page with hero carousel, search, and movie rows
- `movie.html` - movie details and trailer page
- `myList.html` - authenticated watchlist page
- `login.html` - sign-in screen
- `register.html` - account creation screen
- `forgot.html` - forgot-password and OTP verification flow
- `profile.html` - user profile page
- `edit-profile.html` - profile update page

## Project Structure

```text
stream-mini/
├── css/
│   ├── forgot.css
│   ├── list.css
│   ├── login.css
│   ├── movie.css
│   ├── profile.css
│   └── style.css
├── js/
│   ├── api.js
│   ├── app.js
│   ├── auth.js
│   ├── authUI.js
│   ├── events.js
│   ├── forgot.js
│   ├── list.js
│   ├── movie.js
│   ├── profile.js
│   ├── state.js
│   ├── ui.js
│   ├── utils.js
│   └── validate.js
├── edit-profile.html
├── forgot.html
├── index.html
├── login.html
├── movie.html
├── myList.html
├── profile.html
├── register.html
└── README.md
```

## How It Works

### Movie Data
Movie content is fetched from the TMDB API, including:

- trending movies
- top-rated movies
- genre listings
- search results
- single movie details
- trailers and video metadata

### Authentication
This project uses browser `localStorage` instead of a backend authentication system. User registration, login state, profile updates, and watchlist data are stored locally in the browser.

### Watchlist
Each signed-in user gets a separate saved list keyed by email. Movies can be added or removed, and each entry can be updated with a progress status.

### Forgot Password
The forgot-password flow generates an OTP in the browser, stores it temporarily in `localStorage`, and sends it through EmailJS for verification before allowing a password reset.

## Getting Started

Because the project uses ES modules, open it through a local server instead of double-clicking the HTML files.

### Option 1: VS Code / Cursor Live Server

1. Open the project folder in Cursor or VS Code.
2. Start a local server using Live Server or a similar extension.
3. Open `index.html` in the browser through that server.

### Option 2: Python

Run this in the project root:

```bash
python -m http.server 5500
```

Then open:

```text
http://localhost:5500
```

## Configuration Notes

### TMDB API
The project currently reads TMDB requests from `js/api.js` and `js/movie.js`.

If you want to use your own TMDB key:

1. Create an account at [themoviedb.org](https://www.themoviedb.org/).
2. Generate an API key.
3. Replace the existing key in:
   - `js/api.js`
   - `js/movie.js`

### EmailJS
The forgot-password flow depends on EmailJS values configured in `forgot.html` and `js/forgot.js`.

If you want to connect your own EmailJS setup, update:

- EmailJS public key in `forgot.html`
- service ID in `js/forgot.js`
- template ID in `js/forgot.js`

## Demo Flow

1. Open the home page and browse featured movies.
2. Search for a title or open a movie details page.
3. Create an account or sign in.
4. Add movies to `My List`.
5. Update watchlist progress status.
6. Edit profile information or test the forgot-password flow.

## Limitations

- Authentication is client-side only and not suitable for production use.
- User data and OTP data are stored in browser `localStorage`.
- API keys are stored in frontend files.
- Password reset depends on a valid EmailJS configuration.

## Future Improvements

- Move authentication and user data to a backend service
- Hide API credentials using environment-based server configuration
- Add pagination and advanced filters
- Add unit and integration tests
- Improve accessibility and loading states

## License

This project is for educational and portfolio use unless you define another license for the repository.
