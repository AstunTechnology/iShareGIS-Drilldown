Astun.JS.Plugins.installDialog("drilldown", function($map, openlayers) {

	// ---- Configuration ---- //

	/*
	* Configuration notes
	* ===================
	*
	* Add an entry for each MapSource that you would like to enable
	* the drill down tool for including the layers what will be
	* queried.
	*
	* MapSource names
	* ---------------
	* The MapSource name matches the MapSource Name field you see
	* when you have selected the main MyMaps node in Studio that
	* lists all MapSources.
	*
	* Layer names
	* -----------
	* The layer names are the MapServer layer names which can be
	* seen when you have selected an individual layer in Studio
	*/

	var infoLayers = {
		"GIS/PlanningAdmin": ["llpg_blpu", "planning_history_all"],
		"GIS/BuildCtrl": ["llpg_blpu", "planning_history_all", "buildctrl_history_all"]
	};

	// ---- Plugin Code ---- //

	// Used to keep track of the original state of the 
	// layer controls infoClickIncludeLayers array
	var infoClickIncludeLayers = null;

	// Clear infoClickIncludeLayers when a new profile is loaded 
	// as the list is different for each profile
	$map.bind("mapSourceLoaded", function(evt, mapSource, type, name) {
		if (type == "ism") {
			infoClickIncludeLayers = null;
		}
	});

	function toolbarCreated(event, toolbar, o) {

		//console.log("Add info layers");

		// Take a copy of the infoClickIncludeLayers array so we can
		// reset it once we are done but only take a copy if it's null
		// to avoid taking a copy of a modified list as this function is
		// called after the feature is reshaped but the toolbarDestroyed
		// function is not (which was used to tidy up the array)
		if (infoClickIncludeLayers === null) {
			//console.log("Recording infoClickIncludeLayers as nothing is set...");
			infoClickIncludeLayers = this.map.layerControl.infoClickIncludeLayers.slice(0);
			//console.log(infoClickIncludeLayers);
		}

		// Reset the infoClickIncludeLayers to the original value we"ve recorded so we
		// don"t duplicate layers
		this.map.layerControl.infoClickIncludeLayers = infoClickIncludeLayers.slice(0);

		// Get the list of drill down layers from the config,
		// build an array of those that actually exist
		// (as passing non-existent layers will cause an error)
		// then add them to the infoClickIncludeLayers to force
		// info to be returned even if the layers are not shown
		var lyrs = infoLayers[this.map.mapSource.mapName];
		if (lyrs) {
			var foundLyrs = [];
			for (var i = 0, lyr; i < lyrs.length; i++) {
				lyr = lyrs[i];
				if (this.map.layerControl.findLayer(lyr)) {
					foundLyrs.push(lyr);
				}
			}

			// Add our layers to the list
			this.map.layerControl.infoClickIncludeLayers.push.apply(this.map.layerControl.infoClickIncludeLayers, foundLyrs);
		}
		//console.log(this.map.layerControl.infoClickIncludeLayers);

		// Register for when the toolbar is destroyed so we can tidy
		// up once the tool has been used
		$eventElement.bind("toolbarDestroyed", toolbarDestroyed);

	}


	function toolbarDestroyed(event, toolbar, o) {

		//console.log("Reset info layers");

		// Reset the infoClickIncludeLayers array to it's original state
		if (infoClickIncludeLayers != null) {
			this.map.layerControl.infoClickIncludeLayers = infoClickIncludeLayers.slice(0);
		}

		infoClickIncludeLayers = null;

		//console.log(this.map.layerControl.infoClickIncludeLayers);

		// Remove our event listeners
		$eventElement.unbind("toolbarCreated", toolbarCreated);
		$eventElement.unbind("toolbarDestroyed", toolbarDestroyed);

	}

	return {
		buttons: [
			{
				name: "selectCircle",
				on: function($e, data, $map, openlayers) {
					// Register for the toolbarCreated event so we can add the
					// drill down layers
					$eventElement.bind("toolbarCreated", toolbarCreated);

					// Call vector creator event, this should handle clearing 
					// old vectors and also create a toolbar
					$map.trigger("createVector", ["circle"]);


				},
				off: function($e, data, $map, openlayers) {
					$map.trigger("mapControls", ["reset", true]);
				},
				offEvent: "scratch-feature-added vectorToolsReset",
				text: "Circle",
				tooltip: "Click-and-drag on the map to create a circular selection of features"
			},
			{
				name: "selectPolygon",
				on: function($e, data, $map, openlayers) {
					$eventElement.bind("toolbarCreated", toolbarCreated);
					$map.trigger("createVector", ["polygon"]);
				},
				off: function($e, data, $map, openlayers) {
					$map.trigger("resetVectorTools");
				},
				offEvent: "scratch-feature-added vectorToolsReset",
				text: "Polygon",
				tooltip: "Click to create corners of an irregular polygon then double-click to close the polygon and select the contained features"
			}
		]
	};
});


Astun.JS.Plugins.installButton(
	{
		name: "drilldown",
		type: "quickdialog",
		dialog: Astun.JS.Plugins.dialogs.drilldown,
		text: "Drill down",
		tooltip: "Tools to select pre-defined features within a shape",
		tooltipTitle: "Drill down"
	}
);