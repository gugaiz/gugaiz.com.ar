// set your channel id here
var channel_id = 224915;
// set your channel's read api key here if necessary
var api_key = '3J4M1VASWGJRHZUT';
// maximum value for the gauge
var max_gauge_value = 50;
// name of the gauge
var gauge_name = 'Temp. Ext';

// global variables
var chart, charts, data;

// load the google gauge visualization
google.load('visualization', '1', {packages:['gauge']});
google.setOnLoadCallback(initChart);

// display the data
function displayData(point) {
	data.setValue(0, 0, gauge_name);
	data.setValue(0, 1, point);
	chart.draw(data, options);
}

// load the data
function loadData() {
	// variable for the data point
	var p;

	// get the data from thingspeak
	$.getJSON('https://api.thingspeak.com/channels/' + channel_id + '/feed/last.json?api_key=' + api_key, function(data) {

		// get the data point
		p = data.field2;
		displayData(p);
		// if there is a data point display it
		/*
		if (p) {
			p = Math.round((p / max_gauge_value) * 100);
			displayData(p);
		}
		*/

	});
}

// initialize the chart
function initChart() {

	data = new google.visualization.DataTable();
	data.addColumn('string', 'Label');
	data.addColumn('number', 'Value');
	data.addRows(1);

	chart = new google.visualization.Gauge(document.getElementById('gauge_div'));
	options = {width: 120, height: 120, max: 50, min:-50, redFrom: 40, redTo: 50, yellowFrom:30, yellowTo: 40, minorTicks: 5};

	loadData();

	// load new data every 15 seconds
	setInterval('loadData()', 15000);
}
