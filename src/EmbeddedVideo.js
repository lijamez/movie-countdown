import React, { Component } from 'react';

class EmbeddedVideo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      youtubeVideoId: this.props.youtubeVideoId
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      youtubeVideoId: nextProps.youtubeVideoId
    });
  }

  render() {
    var embeddedVideo = null;
    var closeLink = null;
    if (this.state.youtubeVideoId != null) {
      embeddedVideo = <iframe title="Embedded Video" width="1511" height="850" src={'https://www.youtube.com/embed/' + this.state.youtubeVideoId + '?rel=0&amp;showinfo=0&autoplay=1'} frameborder="0" allowfullscreen></iframe>;
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
    this.setState({
      youtubeVideoId: null
    })
  }
}

export default EmbeddedVideo;
