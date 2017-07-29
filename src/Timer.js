import React, { Component } from 'react';

const DEFAULT_TIMER_INPUT = '00:00:00';

class Timer extends Component {

  constructor(props) {
    super(props);

    var now = new Date();

    this.state = {
      feature: this.props.feature,
      endTime: now.getTime(),
      currentTime: now.getTime(),
      redirectUrl: this.props.redirectOnCompletion,
      intervalId: null
    };
  }

  componentDidMount() {
    this.setNewTimer(DEFAULT_TIMER_INPUT);
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
        <div className="Feature-Text" tabIndex="1" onFocus={this.onFeatureTextEditStart.bind(this)} onBlur={this.onFeatureTextEditStop.bind(this)}>{this.state.feature}</div>
        <div className="Subtitle-Text"  tabIndex="2" onFocus={this.onSubtitleTextEditStart.bind(this)} onBlur={this.onSubtitleTextEditStop.bind(this)}></div>
  			<div className="Time-Remaining" tabIndex="3" onFocus={this.makeCountdownEditable.bind(this)} onBlur={this.onCountdownUpdated.bind(this)}>{this.getTimeRemaining()}</div>
      </div>
		)
	}

  onSubtitleTextEditStart(e) {
    e.target.setAttribute("contenteditable", "true");
  }

  onSubtitleTextEditStop(e) {
    e.target.setAttribute("contenteditable", "false");
  }

  onFeatureTextEditStart(e) {
    e.target.setAttribute("contenteditable", "true");
  }

  onFeatureTextEditStop(e) {
    var featureTextElement = e.target;

    featureTextElement.setAttribute("contenteditable", "false");

    this.props.onFeatureTextChanged(featureTextElement.innerHTML);
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

    var hours = parseInt(components[0], 10);
    var minutes = parseInt(components[1], 10);
    var seconds = parseInt(components[2], 10);

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

export default Timer;
