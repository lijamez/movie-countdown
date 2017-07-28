# Movie Countdown
A simple countdown web application that is movie/TV show oriented.

## Features
### Dynamic Media info
Automatically updates the backdrop based on the movie or TV show name. ([TMDb](https://www.themoviedb.org) API key required)
### YouTube Video Embedding
Instantly embed a YouTube video on the countdown page by pasting the YouTube video ID into the page.

## How to Run
1. Install [NodeJS](https://nodejs.org)
2. Clone this repository
3. In the cloned repo directory, run
```
npm install
```
4. Start the server
```
npm start
```

## Configuration
The configuration file is `src/config.json`.

### fetch_media_info
*boolean*
Indicates whether if you want to automatically fetch media info based on the movie or TV show's title. If this is true, then you must also populate `tmdb_api_key`.

### tmdb_api_key
*string*
Your [TMDb API key](https://www.themoviedb.org/faq/api). Required if `fetch_media_info` is `true`. 
