const querystring = require('querystring');

const MULTI_SEARCH_BASE_URL = "https://api.themoviedb.org/3/search/multi?";

/**
* The Movie Database (TMDb) Client
*/
class TMDbClient {

  multiSearch(request, successCallback, failureCallback) {
    this._makeRequest("GET", MULTI_SEARCH_BASE_URL, request, successCallback, failureCallback);
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
