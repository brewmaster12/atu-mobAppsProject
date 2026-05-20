# ATU Movie App

> Mobile Applications Development — H.Dip. in Science (Software Development)  
> ATU, Galway City Campus

---

## Overview

An Ionic mobile application that fetches live movie data from [The Movie Database (TMDB)](https://themoviedb.org), allowing users to browse trending movies, search by title, view full cast and crew details, and maintain a persistent favourites list.

---

## Running the Application

Requires:

Ionic framework V7.2.0

Angular Storage:

```bash
npm install @ionic/storage-angular
```

To run:
```bash
ionic serve
```

---

## Pages

### Home Page
- Shows **Today's Trending Movies** on first load
- Supports **searching movies by name** via the TMDB search API

### Movie Details Page
- Shows movie overview, cast, and crew
- **Add to Favourites** / **Remove from Favourites** button (toggles based on current state)
- Favourites list is **persisted** after the app is closed

### Details Page
- Shown when a cast or crew member is selected
- Displays:
  - Profile picture (or "No image" if unavailable)
  - Date of birth / Date of death (hidden if unavailable)
  - Also Known As (hidden if unavailable)
  - Biography
  - Other movies they have appeared in

### Favourites Page
- Accessible via the heart icon on any page
- Lists all movies added to favourites
- Each movie has a **Details** button linking back to its Movie Details page

---

## API

Uses the [TMDB API](https://themoviedb.org). Requires a free API key.

| Endpoint | Purpose |
|---|---|
| `/trending/movie/day` | Today's trending movies |
| `/search/movie?query=...` | Search movies by title |
| `/movie/{id}/credits` | Cast & crew for a movie |
| `/person/{id}` | Details for a cast/crew member |
| `/person/{id}/movie_credits` | Movies a person has appeared in |

---

## Tech Stack

- **Framework:** Ionic v7.2.0
- **Type:** Angular Standalone
- **Language:** TypeScript
- **Data:** TMDB REST API

---

## Project Structure

```
src/
├── assets/
│   └── mytest.json
├── app/
│   ├── home/
│   ├── movie-details/
│   ├── details/
│   └── favourites/
```
