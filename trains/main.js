import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';


var api = "https://2km3swz4sc.execute-api.us-west-2.amazonaws.com/prod/national-rail?"
var from = "CLJ"
var to = "WAT"
var req = new XMLHttpRequest()

function renderPlatforms(rawData) {
	console.log(rawData)
	var platforms = JSON.parse(rawData)
	ReactDOM.render(<App results={platforms}/>, document.getElementById('app'));
}

req.onreadystatechange = (e) => {
	console.log(req)
	if (req.readyState == 4 && req.status == 200)
		renderPlatforms(req.responseText)
}
req.open('GET', api + 'from=' + from + '&to=' + to)
req.send()
