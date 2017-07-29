const querystring = require('querystring');

const MULTI_SEARCH_BASE_URL = "https://api.themoviedb.org/3/search/multi?";
const SEARCH_TV_BASE_URL = "https://api.themoviedb.org/3/search/tv?";
const SEARCH_MOVIE_BASE_URL = "https://api.themoviedb.org/3/search/movie?";

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

        successCallback(response);
      } else {

        failureCallback(searchRequest.status, searchRequest.responseText);
      }

    });

    searchRequest.open(httpMethod, fullQueryUrl);
    searchRequest.send();
  }
}

export default TMDbClient;
