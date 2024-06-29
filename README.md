# Movie Mate

It often takes forever for a group to agree on a film at a movie night.
MovieMate offers a solution: With this Progressive Web App (PWA), films can be swiped like on Tinder. The liked films then end up in a watchlist. During a movie night, the app automatically suggests films that everyone wants to see or that are suitable based on previously liked films. Long searches on Netflix are a thing of the past.

## Tech-Stack

MovieMate is built with Svelte / SvelteKit and Typescript, using Supabase as DB. All the movie data is fetched from the [TMDB API](https://developer.themoviedb.org/reference/intro/getting-started).

## Setup Dev-Environment

In your Terminal run:

```bash
  npm install
```

Afterwards, create an .env file in the root of the project and paste in the necessary credentials.
