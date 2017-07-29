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
      pastedContent: null,
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
          <img src={this.state.posterUrl} style={{width: "400px"}} alt="Poster"/>
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
                <EmbeddedVideo videoUrl={this.state.pastedContent} onVideoClosed={this.onVideoClosed.bind(this)}/>
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
      pastedContent: e.clipboardData.getData('Text')
    });
  }

  onFeatureTextChanged(featureText) {

    if (this.state.config.fetch_media_info) {

      if (!this.state.config.tmdb_api_key) {
        console.warn("You need a The Movie Database (TMDb) API key to fetch media backdrops.");
        return;
      }

      var onSuccess = function(response) {
        if (response !== null) {
          this.setState({
            backdropUrl: response.backdropUrl,
            posterUrl: response.posterUrl
          });
        }
      }.bind(this);

      var onFailure = function(statusCode, responseText) {
        console.error('Failed to get media information. Error code: ' + statusCode + ', Message: ' + responseText);
      };

      MEDIA_INFO.getMediaInfo(featureText, onSuccess, onFailure);
    }
  }
}

export default App;
