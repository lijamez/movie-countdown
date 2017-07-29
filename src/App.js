import React, { Component } from 'react';
import EmbeddedVideo from './EmbeddedVideo.js';
import Timer from './Timer.js';
import './App.css';
import defaultBackdrop from './background.jpg';
import MediaInfo from './MediaInfo.js';

var config;

try {
  config = require('./config.json');
} catch (e) {
  config = require('./config-default.json');
}

const MEDIA_INFO = new MediaInfo(config.tmdb_api_key);

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      youtubeVideoId: null,
      backdropUrl: defaultBackdrop,
      posterUrl: null,
      config: config
    };
  }

  render() {

    var backdropDivStyle = {
      backgroundImage: 'url(' + this.state.backdropUrl + ')'
    };

    var poster = null;
    if (this.state.posterUrl !== null) {
      poster = (<div className="PerspectivePosterPart">
        <div className="PerspectivePoster">
          <img src={this.state.posterUrl} style={{width: "400px"}}/>
        </div>
      </div>);
    }

    return (
      <div onPaste={this.handlePaste.bind(this)}>
        <div className="Page-Background" style={backdropDivStyle}/>

        <div className="Centered">
          <div className="MainTable">
            <div className="LeftPart">
              {poster}
            </div>
            <div className="RightPart">
              <div className="Timer-Container">
                <Timer feature="---" onFeatureTextChanged={this.onFeatureTextChanged.bind(this)}/>
              </div>
              <div className="VideoPart">
                <EmbeddedVideo youtubeVideoId={this.state.youtubeVideoId} onVideoClosed={this.onVideoClosed.bind(this)}/>;
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  onVideoClosed() {
    this.setState({
      youtubeVideoId: null
    });
  }

  handlePaste(e) {
    this.setState({
      youtubeVideoId: e.clipboardData.getData('Text')
    });
  }

  onFeatureTextChanged(featureText) {

    if (this.state.config.fetch_media_info) {

      if (!this.state.config.tmdb_api_key) {
        console.warn("You need a The Movie Database (TMDb) API key to fetch media backdrops.");
        return;
      }

      var onSuccess = function(response) {

        if (response.results.length > 0) {
          var bestResult = response.results[0];

          if (bestResult.backdrop_path !== null) {
            this.setState({
              backdropUrl: "https://image.tmdb.org/t/p/original/" + bestResult.backdrop_path
            });
          }

          if (bestResult.poster_path !== null) {
            this.setState({
              posterUrl: "https://image.tmdb.org/t/p/original/" + bestResult.poster_path
            });
          }
        }
      }.bind(this);

      MEDIA_INFO.getMediaInfo(featureText, onSuccess);
    }
  }
}

export default App;
