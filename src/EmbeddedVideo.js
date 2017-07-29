import React, { Component } from 'react';

const url = require("url");
const querystring = require('querystring');

class EmbeddedVideo extends Component {

  render() {
    var embeddedVideo = null;
    var closeLink = null;

    if (this.props.videoUrl) {
      var youtubeVideoId = this._extractYoutubeVideoId(this.props.videoUrl);

      if (youtubeVideoId != null) {
        embeddedVideo = <iframe title="Embedded Video" width="1280" height="720" src={'https://www.youtube.com/embed/' + youtubeVideoId + '?rel=0&amp;showinfo=0&autoplay=1'} frameBorder="0" allowFullScreen></iframe>;
        closeLink = <a className="Embedded-Video-Close-Link" href="#" onClick={this.close.bind(this)}>X</a>;
      }
    }

    return (
      <div className="Embedded-Video-Container">
        <div className="Embedded-Video-Close">
          {closeLink}
        </div>
        {embeddedVideo}
      </div>
    );
  }

  /**
  Extracts the video ID from a youtube URL. Supports youtube URLs with hostnames:
  www.youtube.com
  youtube.com
  youtu.be

  Returns the youtube video ID if it could be extracted. Null otherwise.
  */
  _extractYoutubeVideoId(videoUrl) {
    var parsedVideoUrl = url.parse(this.props.videoUrl);
    var parameters = querystring.parse(parsedVideoUrl.query);

    var youtubeVideoId = null;
    if (parsedVideoUrl.hostname === "www.youtube.com" || parsedVideoUrl.hostname === "youtube.com") {
      youtubeVideoId = parameters.v || null;
    } else if (parsedVideoUrl.hostname === "youtu.be") {
      if (parsedVideoUrl.path.length > 1) {
        youtubeVideoId = parsedVideoUrl.path.substring(1, parsedVideoUrl.path.length);
      }
    }

    return youtubeVideoId;
  }

  close() {
    this.props.onVideoClosed();
  }
}

export default EmbeddedVideo;
