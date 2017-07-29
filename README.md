# Movie Countdown
A simple countdown web application that is movie/TV show oriented.

## Features
### Dynamic Media info
Automatically updates the backdrop based on the movie or TV show name. ([TMDb](https://www.themoviedb.org) API key required)
### YouTube Video Embedding
Instantly embed a YouTube video on the countdown page by pasting a link to a YouTube video into the page.

## How to Run
1. Install [NodeJS](https://nodejs.org)
2. Clone this repository
3. In the cloned repo directory, run
```
npm install
```
4. Start the development server
```
npm start
```

## Configuration
The configuration file is `src/config.json`. If this file does not exist, then the application will fall back to `src/config-default.json`.
It's recommended to create a `config.json` using `config-default.json` as a template.

### fetch_media_info
*boolean*
Indicates whether if you want to automatically fetch media info based on the movie or TV show's title. If this is true, then you must also populate `tmdb_api_key`.

### tmdb_api_key
*string*
Your [TMDb API key](https://www.themoviedb.org/faq/api). Required if `fetch_media_info` is `true`.

## Usage

### Setting the Time
The time is editable. Just enter an amount of time in a HH:mm:dd format. (e.g. 01:20:34).

### Dynamic Backdrop
If `fetch_media_info` is true, then the backdrop will be fetched whenever the timer's name is changed. The search for the backdrop isn't perfect, however. For example, if you enter `The Room`, it could fetch the incorrect movie, "The Disappointment Room". To improve search results, add a hint to the timer name.

### Youtube Video Embedding
Paste a link to YouTube video anywhere in the page to embed and automatically play it. Supports regular YouTube (www.youtube.com) and share links (youtu.be).

**Year Hint**
Add a year in parentheses. For example, `The Jungle Book (1967)` vs `The Jungle Book (2016)`.

**TV Show Hint**
If search results are turning up a movie when you actually wanted a TV show, include a season and episode in the title in the format `S[0-9]{2}E[0-9]{2}`. For example, `House S01E02`.

## Attribution
![Powered by The Movie DB](https://www.themoviedb.org/assets/static_cache/bb45549239e25f1770d5f76727bcd7c0/images/v4/logos/408x161-powered-by-rectangle-blue.png)
