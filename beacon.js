

var app = (function()
{
	// Application object.
	var app = {};

	// Dictionary of beacons.
	var beacons = {};

	// Timer that displays list of beacons.
	var updateTimer = null;

	app.initialize = function()
	{
		document.addEventListener('deviceready',function() { evothings.scriptsLoaded(onDeviceReady) },false);
	};

	//document.addEventListener('deviceready',function() { evothings.scriptsLoaded(onDeviceReady) },false);
	
	function onDeviceReady()
	{
		// Start tracking beacons!
		setTimeout(startScan, 500);		
	}

	function startScan()
	{
		// Called continuously when ranging beacons.
		evothings.ble.startScan(
			function(beacon)
			{				
				// Insert/update beacon table entry.
				beacon.timeStamp = Date.now();
				beacons[beacon.address] = beacon;
				window.url= beacon.url;
				
				alert(JSON.stringify(beacon));
				window.requestFileSystem(window.TEMPORARY, 1024 * 1024, scrivi, errorHandler);
				
			},
			function(error)
			{
				console.log('Eddystone Scan error: ' + JSON.stringify(error));
			});
	}
	
	function scrivi(fs){
		//alert("scrivi")
		fs.root.getDirectory('dati', { create: true }, function (dirEntry) {
			dirEntry.getFile('beacon.txt', { create: true }, function (fileEntry) {
				// Create a FileWriter object for our FileEntry (log.txt).
				fileEntry.file(function (file) {
					var reader = new FileReader();
					reader.onloadend = function(e) {
						var dati = this.result.split("|");
						var trovato = false;
						//alert(window.url);
						for(var k=0;k<dati.length;k++){
							if(dati[k] == window.url)
							{
								trovato = true;
							}
						}
						//alert(trovato)
						if(!trovato && window.url != undefined && window.url != "")
						{
							fileEntry.createWriter(function (fileWriter) {   										
								fileWriter.seek(fileWriter.length); // Start write position at EOF.
								  // Create a new Blob and write it to log.txt.
								fileWriter.write(window.url + "|");
								fileWriter.onwriteend = function (e) {
									//alert(fileEntry.fullPath)
								};

								fileWriter.onerror = function (e) {
									console.log('Write failed: ' + e.toString());
								};
							});						
						}
																
					}						
					reader.readAsText(file);
                }, errorHandler);
			}, errorHandler);
		}, errorHandler);
	}	
		
	
	function errorHandler(e) {
		var msg = '';

		switch (e.code) {
		case FileError.QUOTA_EXCEEDED_ERR:
		  msg = 'QUOTA_EXCEEDED_ERR';
		  break;
		case FileError.NOT_FOUND_ERR:
		  msg = 'NOT_FOUND_ERR';
		  break;
		case FileError.SECURITY_ERR:
		  msg = 'SECURITY_ERR';
		  break;
		case FileError.INVALID_MODIFICATION_ERR:
		  msg = 'INVALID_MODIFICATION_ERR';
		  break;
		case FileError.INVALID_STATE_ERR:
		  msg = 'INVALID_STATE_ERR';
		  break;
		default:
		  msg = 'Unknown Error';
		  break;
		};

		alert('Error: ' + msg);
	} 
	
	/**
	 * Map the RSSI value to a value between 1 and 100.
	 */
	function mapBeaconRSSI(rssi)
	{
		if (rssi >= 0) return 1; // Unknown RSSI maps to 1.
		if (rssi < -100) return 100; // Max RSSI
		return 100 + rssi;
	}

	function getSortedBeaconList(beacons)
	{
		var beaconList = [];
		for (var key in beacons)
		{
			beaconList.push(beacons[key]);
		}
		beaconList.sort(function(beacon1, beacon2)
		{
			return mapBeaconRSSI(beacon1.rssi) < mapBeaconRSSI(beacon2.rssi);
		});
		return beaconList;
	}

	function displayBeaconList()
	{		
		if (window.confirm("Ciao! Vuoi aprire il link suggerito? Ti trovi qui vicino!")) {
			window.open(beacons[0].url, '_system','location=yes');
		}
		// Clear beacon display list.
		//$('#found-beacons').empty();

		// Update beacon display list.
		/*var timeNow = Date.now();
		$.each(getSortedBeaconList(beacons), function(index, beacon)
		{
			
			// Only show beacons that are updated during the last 60 seconds.
			if (beacon.timeStamp + 60000 > timeNow)
			{
				// Create HTML to display beacon data.
				var element = $(
					'<li>'
					+	htmlBeaconName(beacon)
					+	htmlBeaconURL(beacon)
					+	htmlBeaconNID(beacon)
					+	htmlBeaconBID(beacon)
					+	htmlBeaconVoltage(beacon)
					+	htmlBeaconTemperature(beacon)
					+	htmlBeaconTxPower(beacon)
					+	htmlBeaconAdvCnt(beacon)
					+	htmlBeaconDsecCnt(beacon)
					+	htmlBeaconRSSI(beacon)
					+	htmlBeaconRSSIBar(beacon)
					+ '</li>'
				);

				$('#message').remove();
				//$('#found-beacons').append(element);
			}
		});*/
	}

	function htmlBeaconName(beacon)
	{
		return beacon.name ?
			'<strong>' + beacon.name + '</strong><br/>' :  '';
	}

	function htmlBeaconURL(beacon)
	{
		return beacon.url ?
			'URL: ' + beacon.url + '<br/>' :  '';
	}

	function htmlBeaconURL(beacon)
	{
		return beacon.url ?
			'URL: ' + beacon.url + '<br/>' :  '';
	}

	function htmlBeaconNID(beacon)
	{
		return beacon.nid ?
			'NID: ' + uint8ArrayToString(beacon.nid) + '<br/>' :  '';
	}

	function htmlBeaconBID(beacon)
	{
		return beacon.bid ?
			'BID: ' + uint8ArrayToString(beacon.bid) + '<br/>' :  '';
	}

	function htmlBeaconVoltage(beacon)
	{
		return beacon.voltage ?
			'Voltage: ' + beacon.voltage + '<br/>' :  '';
	}

	function htmlBeaconTemperature(beacon)
	{
		return beacon.temperature && beacon.temperature != 0x8000 ?
			'Temperature: ' + beacon.temperature + '<br/>' :  '';
	}
	function htmlBeaconTxPower(beacon)
	{
		return beacon.txPower ?
			'TxPower: ' + beacon.txPower + '<br/>' :  '';
	}

	function htmlBeaconAdvCnt(beacon)
	{
		return beacon.adv_cnt ?
			'ADV_CNT: ' + beacon.adv_cnt + '<br/>' :  '';
	}

	function htmlBeaconDsecCnt(beacon)
	{
		return beacon.dsec_cnt ?
			'DSEC_CNT: ' + beacon.dsec_cnt + '<br/>' :  '';
	}

	function htmlBeaconRSSI(beacon)
	{
		return beacon.rssi ?
			'RSSI: ' + beacon.rssi + '<br/>' :  '';
	}

	function htmlBeaconRSSIBar(beacon)
	{
		return beacon.rssi ?
			'<div style="background:rgb(255,64,128);height:20px;width:'
				+ mapBeaconRSSI(beacon.rssi) + '%;"></div>' : '';
	}

	function uint8ArrayToString(uint8Array)
	{
		function format(x)
		{
			var hex = x.toString(16);
			return hex.length < 2 ? '0' + hex : hex;
		}

		var result = '';
		for (var i = 0; i < uint8Array.length; ++i)
		{
			result += format(uint8Array[i]) + ' ';
		}
		return result;
	}

	return app;
})();

app.initialize();
