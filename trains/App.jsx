import React from 'react'
import ReactSwipe from 'react-swipe';

class ResultComponent extends React.Component {

	render() {
		var platformText = 'Platform: ' + this.props.platform
		var timeText = '\nScheduled Time: ' + this.props.scheduled
		var timeText2 = '\nExpected: ' + this.props.estimated
		return <div>
			<div>{platformText}</div>
			<div>{timeText}</div>
			<div>{timeText2}</div>
		</div>
	}

}

class App extends React.Component {
    render() {
	var results = this.props.results
	var components = results.map((r, i) => <ResultComponent key={i}{...r} />)
        return (
            <ReactSwipe className="carousel" swipeOptions={{continuous: true}}>
		{components}
            </ReactSwipe>
        );
    }
}

export default App;
