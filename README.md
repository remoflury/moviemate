# Movie Mate

This is an web-app built with svelte-kit and tailwindcss. It uses the [TMDB API](https://developers.themoviedb.org/3/getting-started/introduction) to fetch movie data.

## Tech-Stack

This repo uses:

- Svelte & SvelteKit as JS Framework (with TypeScript)
- Supabase with the according SDK and sveltekit-supabase-auth-helpers
- Tailwind CSS
- TMDB API

## Setup Dev-Environment

In your Terminal run:

```bash
  npm install
```

Afterwards, create an .env file in the root of the project and paste in the necessary credentials.

## Developing

Development takes place on the dev branch.

### Coding Standards

- camelCase for JS
- kebab-case for HTML and CSS
- use descriptive names for variables, functions, etc.
- use english for naming
- indentation with 2 spaces

To start the dev server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.
