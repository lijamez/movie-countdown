import React, { Component } from 'react';

class EmbeddedVideo extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    var embeddedVideo = null;
    var closeLink = null;
    if (this.props.youtubeVideoId != null) {
      embeddedVideo = <iframe title="Embedded Video" width="1280" height="720" src={'https://www.youtube.com/embed/' + this.props.youtubeVideoId + '?rel=0&amp;showinfo=0&autoplay=1'} frameborder="0" allowfullscreen></iframe>;
      closeLink = <a className="Embedded-Video-Close-Link" href="#" onClick={this.close.bind(this)}>X</a>;
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

  close() {
    this.props.onVideoClosed();
  }
}

export default EmbeddedVideo;
