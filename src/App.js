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
      config: config
    };
  }

  render() {

    var embeddedVideo = null;
    if (this.state.youtubeVideoId != null) {
      embeddedVideo = <EmbeddedVideo youtubeVideoId={this.state.youtubeVideoId}/>;
    }

    var backdropDivStyle = {
      backgroundImage: 'url(' + this.state.backdropUrl + ')'
    };

    return (
      <div className="Outer">
        <div className="Timer-Background" style={backdropDivStyle}/>
        <div className="Middle" onPaste={this.handlePaste.bind(this)}>
          <div className="Timer-Container">
            <Timer feature="Show Name Here" onFeatureTextChanged={this.onFeatureTextChanged.bind(this)}/>
            {embeddedVideo}
          </div>
        </div>
      </div>
    );
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
        }
      }.bind(this);

      MEDIA_INFO.getBackdrop(featureText, onSuccess);
    }
  }
}

export default App;
