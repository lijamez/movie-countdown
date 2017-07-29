import TMDbClient from './TMDbClient.js';

const TMDB_CLIENT = new TMDbClient();
var tmdbApiKey;

class MediaInfo {

  constructor(apiKey) {
    tmdbApiKey = apiKey;
  }

  getMediaInfo(searchTerm, successCallback, failureCallback) {
    // The search term might be for a movie or TV show.
    // To get better search results, try to figure out whether if the search
    // term is for a TV or movie, if possible.
    var gleanedInfo = this._gleanInfo(searchTerm);

    // Then, depending on the classification, hit various TMDb APIs to get
    // more info.
    var request;
    if (gleanedInfo.classification === 'tv') {
      request = {
          api_key: tmdbApiKey,
          language: 'en-US',
          query: gleanedInfo.mediaName,
          first_air_date_year: gleanedInfo.year
      };

      TMDB_CLIENT.searchTv(request, successCallback, failureCallback);
    } else if (gleanedInfo.classification === 'movie') {
      request = {
          api_key: tmdbApiKey,
          language: 'en-US',
          query: gleanedInfo.mediaName,
          primary_release_year: gleanedInfo.year
      };

      TMDB_CLIENT.searchMovie(request, successCallback, failureCallback);
    } else {
      request = {
        api_key: tmdbApiKey,
        language: 'en-US',
        query: searchTerm,
        page: 1,
        include_adult: false
      };

      TMDB_CLIENT.multiSearch(request, successCallback, failureCallback);
    }

  }

  _gleanInfo(searchTerm) {
    var remainingSearchTerm = searchTerm;

    // Year extraction.
    var year;

    var yearRegex = /\(([0-9]{4})\)/;
    var matches = searchTerm.match(yearRegex);
    if (matches !== null) {
      year = matches[1];
      remainingSearchTerm = remainingSearchTerm.replace(yearRegex, "");
    } else {
      year = null;
    }

    // Look for hints of media type.
    // If it has a season an episode (e.g. S01E02) then it strongly suggests
    // that the search term is for a TV show.
    var classification;
    var seasonEpisodeRegex = /S[0-9]{2}E[0-9]{2}/;
    var seasonEpisodeMatches = searchTerm.match(seasonEpisodeRegex);

    var mediaName;
    if (seasonEpisodeMatches !== null && seasonEpisodeMatches.length) {
      classification = 'tv';
      mediaName = remainingSearchTerm.replace(seasonEpisodeRegex, "");
    } else if (year !== null) {
      classification = 'movie'
      mediaName = remainingSearchTerm;
    } else {
      classification = 'unknown';
      mediaName = remainingSearchTerm;
    }

    mediaName = mediaName.trim();

    return {
      year: year,
      classification: classification,
      mediaName: mediaName
    };
  }
}

export default MediaInfo;
