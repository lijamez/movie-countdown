const querystring = require('querystring');

const MULTI_SEARCH_BASE_URL = "https://api.themoviedb.org/3/search/multi?";
const SEARCH_TV_BASE_URL = "https://api.themoviedb.org/3/search/tv?";
const SEARCH_MOVIE_BASE_URL = "https://api.themoviedb.org/3/search/movie?";

const IMAGES_BASE_URL = "https://image.tmdb.org/t/p/original/";

/**
* The Movie Database (TMDb) Client
*/
class TMDbClient {

  multiSearch(request, successCallback, failureCallback) {
    this._makeRequest("GET", MULTI_SEARCH_BASE_URL, request, successCallback, failureCallback);
  }

  searchTv(request, successCallback, failureCallback) {
    this._makeRequest("GET", SEARCH_TV_BASE_URL, request, successCallback, failureCallback);
  }

  searchMovie(request, successCallback, failureCallback) {
    this._makeRequest("GET", SEARCH_MOVIE_BASE_URL, request, successCallback, failureCallback);
  }

  _makeRequest(httpMethod, baseUrl, parameters, successCallback, failureCallback) {
    var queryString = querystring.stringify(parameters);

    var fullQueryUrl = baseUrl + queryString;

    var searchRequest = new XMLHttpRequest();
    searchRequest.addEventListener("load", function() {
      if (searchRequest.readyState === 4 && searchRequest.status === 200) {
        var response = JSON.parse(searchRequest.responseText);

        var result = null;

        if (response.results.length > 0) {
          var bestResult = response.results[0];

          result = {
            backdropUrl: null,
            posterUrl: null
          };

          if (bestResult.backdrop_path !== null) {
            result.backdropUrl = IMAGES_BASE_URL + bestResult.backdrop_path;
          }

          if (bestResult.poster_path !== null) {
            result.posterUrl = IMAGES_BASE_URL + bestResult.poster_path;
          }
        }

        successCallback(result);
      } else {

        failureCallback(searchRequest.status, searchRequest.responseText);
      }

    });

    searchRequest.open(httpMethod, fullQueryUrl);
    searchRequest.send();
  }
}

export default TMDbClient;
