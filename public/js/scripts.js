var temperatureMeter;

$( function () {
	
	var messageIO = io.connect('http://localhost:8080');
	
	messageIO.on('message', function(data){
		
		if (data.type == 'temperature' || data.type == 'TEMPERATURE') {

			temperatureMeter.changeValue(data.value);
		}

		else if (data.type == 'text' || data.type == 'TEXT') {

			$("#title").html("<h3>" + data.value + "</h3>");
		}
		
		else if (data.type == 'color' || data.type == 'COLOR') {

			$("#titleContainer").css("background-color", data.value);
		}
		
		else if (data.type == 'log' || data.type == 'LOG') {

			$("#logContainer").html(data.value);
			$("#logContainer").scrollTop($("#logContainer")[0].scrollHeight);
		}
	});

	function postMeasurement(value) {

		$.ajax({
			type : "POST",
			url : "/api/messages",
			data:JSON.stringify({'type':'TEMPERATURE', 'value':value}),
			contentType: 'application/json',
			success : function(result) {
				//alert('succes'+result);
			},
			error : function(result) {
				//alert('error'+result);
			}
		});
	}

	temperatureMeter = $("div#payloadMeterDiv").dynameter({
		width: 200,
		label: 'temperature',
		value: 25,
		min: 0,
		max: 50,
		unit: '°C',
		regions: {
			25: 'warn',
			38: 'error'
		}
	});

	$('div#payloadSliderDiv').slider({
		min: 0,
		max: 50,
		value: 25,
		step: 0.5,
		slide: function (evt, ui) {
			var value = ui.value;
			console.log(value);
			temperatureMeter.changeValue(value);
			postMeasurement(value);
		}
	});
});