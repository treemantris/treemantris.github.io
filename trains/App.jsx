import React from 'react'
import ReactSwipe from 'react-swipe';

class ResultComponent extends React.Component {

	constructor(props) {
		super(props)
		this.state = {remainingText: 'remaining'}
	}

	componentDidMount() {
		var currentTime = new Date()
		this.currentTimeInSeconds = currentTime.getHours() * 3600 + currentTime.getMinutes() * 60 + currentTime.getSeconds()

		var estimatedTime = this.props.estimated.split(":")
		if (estimatedTime.length != 2)
			estimatedTime = this.props.scheduled.split(":")
		
		var estimatedHours = parseInt(estimatedTime[0])
		var estimatedMinutes = parseInt(estimatedTime[1])

		this.estimatedTimeInSeconds = estimatedHours * 3600 + estimatedMinutes * 60

		this.timerID = setInterval(() => this.tick(), 1000)
		this.tick()
	}
	
	tick() {
		var negative = this.estimatedTimeInSeconds < this.currentTimeInSeconds
		var remaining = this.estimatedTimeInSeconds - this.currentTimeInSeconds
		var absRemaining = Math.abs(remaining)

		var remainingMinutes = Math.floor(absRemaining / 60)
		var remainingSeconds = absRemaining % 60
		
		var remainingText = 'in ' + (negative ? '-' : '') + remainingMinutes.toString() + ':' + remainingSeconds.toString() + ' minutes'
		
		this.setState({remainingMinutes, remainingSeconds, remainingText})
		this.currentTimeInSeconds += 1
	}

	componentWillUnmount() {
		clearInterval(this.timerID)
	}

	render() {
		var platformText = 'Platform: ' + this.props.platform
		var timeText = 'Scheduled Time: ' + this.props.scheduled
		var timeText2 = 'Expected: ' + this.props.estimated
		return <div>
			<h1>{platformText} {this.state.remainingText}</h1>
			<h2>{timeText}</h2>
			<h2>{timeText2}</h2>
		</div>
	}

}

class App extends React.Component {
    render() {
	var results = this.props.results
	var components = results.map((r, i) => <div><ResultComponent key={i}{...r} /></div>)
        return (
            <ReactSwipe className="carousel" swipeOptions={{}}>
		{components}
            </ReactSwipe>
        );
    }
}

export default App;
