import React, { Component } from 'react';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      youtubeVideoId: null
    };
  }

  render() {

    var embeddedVideo = null;
    if (this.state.youtubeVideoId != null) {
      embeddedVideo = <EmbeddedVideo youtubeVideoId={this.state.youtubeVideoId}/>;
    }

    return (
      <div className="Outer">
        <div className="Timer-Background"/>
        <div className="Middle" onPaste={this.handlePaste.bind(this)}>
          <div className="Timer-Container">
            <Timer time={720000} feature="Show Name Here"/>
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
}

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
      embeddedVideo = <iframe width="1511" height="850" src={'https://www.youtube.com/embed/' + this.state.youtubeVideoId + '?rel=0&amp;showinfo=0&autoplay=1'} frameborder="0" allowfullscreen></iframe>;
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

class Timer extends Component {

  constructor(props) {
    super(props);

    var now = new Date();

    this.state = {
      feature: this.props.feature,
      endTime: now.getTime() + this.props.time,
      currentTime: now.getTime(),
      redirectUrl: this.props.redirectOnCompletion,
      intervalId: null
    };
  }

  componentDidMount() {
    this.setNewTimer("00:00:00");
  }

  updateTimer() {
    var now = new Date();

    this.setState({
      endTime: this.state.endTime,
      currentTime: now.getTime()
    })

    if (this.state.currentTime > this.state.endTime) {
      // Timer has ended.
      if (this.state.redirectUrl != null) {
        window.location.href = this.state.redirectUrl;
      }
    }
  }

  getTimeRemaining() {
    var now = new Date();
    var diffMs = this.state.endTime - this.state.currentTime;

    var hoursRemaining = 0;
    var minsRemaining = 0;
    var secondsRemaining = 0;

    if (diffMs >= 0) {
      var remainingMs = diffMs;
      hoursRemaining = Math.floor(remainingMs / 3600000);
      remainingMs -= hoursRemaining * 3600000;
      minsRemaining = Math.floor(remainingMs / 60000);
      remainingMs -= minsRemaining * 60000;
      secondsRemaining = Math.floor(remainingMs / 1000);
    }

    return hoursRemaining.toString().padStart(2, "0") + ":" + minsRemaining.toString().padStart(2, "0") + ":" + secondsRemaining.toString().padStart(2, "0");
  }

	render() {
		return (
      <div>
        <div className="Feature-Text" tabIndex="1" onFocus={this.makeEditable.bind(this)} onBlur={this.makeUneditable.bind(this)}>{this.state.feature}</div>
  			<div className="Time-Remaining" tabIndex="2" onFocus={this.makeCountdownEditable.bind(this)} onBlur={this.onCountdownUpdated.bind(this)}>{this.getTimeRemaining()}</div>
      </div>
		)
	}

  makeEditable(e) {
    e.target.setAttribute("contenteditable", "true");
  }

  makeUneditable(e) {
    e.target.setAttribute("contenteditable", "false");
  }

  makeCountdownEditable(e) {
    // Stop the interval so that the user can actually update the time remaining.
    clearInterval(this.state.intervalId);

    e.target.setAttribute("contenteditable", "true");
  }

  onCountdownUpdated(e) {
    var input = e.target.innerHTML;
    this.setNewTimer(input);

    var intervalId = setInterval(this.updateTimer.bind(this), 1000);

    this.setState({
      intervalId: intervalId
    })

    e.target.setAttribute("contenteditable", "false");
  }

  setNewTimer(hhmmss) {
    // hhmmss is supposed to be a string that is in the HH:mm:ss format
    var components = hhmmss.split(':', 3);

    var hours = parseInt(components[0]);
    var minutes = parseInt(components[1]);
    var seconds = parseInt(components[2]);

    var now = new Date();

    var endTime = now.getTime() + (hours * 3600000) + (minutes * 60000) + (seconds * 1000);

    if (endTime) {
      this.setState({
        endTime: endTime,
        currentTime: now.getTime()
      });
    }
  }
}

export default App;
