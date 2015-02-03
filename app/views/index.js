import Ember from 'ember';

export default Ember.View.extend({
	didInsertElement : function(){
		Ember.run.schedule('afterRender', this, function(){

			// Theme Selector Drawer
			$(".btn--themes").click(function(){
				$("#theme-drawer").toggleClass("expanded");
			});

			$(".btn--close-theme-drawer").click(function(){
				$("#theme-drawer").removeClass("expanded");
			});

			// Preferences drawer
			$(".btn--options").click(function(){
				$("#preferences-drawer").toggleClass("expanded");
			});


			//////////////////////////
			// Control Panel UI
			////////////////////////
			var $ctrlpnl = $("#control-panel"); // Control Panel

			// Show Control Panel
			function showControlPanel() {

				if( $ctrlpnl.hasClass("expanded") ) {
					$ctrlpnl.addClass("wiggle");
					setTimeout(function(){
						$ctrlpnl.removeClass("wiggle");
					}, 400);
					// Center map
					map.setCenter(center);
				} else {
						$ctrlpnl.addClass("expanded");
					setTimeout(function(){
						$ctrlpnl.children().fadeIn();
					}, 400);
					// Center map
					map.setCenter(center);
				}
			} // end show control panel

			// Close Control Panel
			function hideControlPanel() {
				$ctrlpnl.children().fadeOut();
				setTimeout(function(){
					$ctrlpnl.removeClass("expanded");
				}, 300);
			} // end close control panel

			// Open
			$(".btn--add-location").on("click", function() {
					showControlPanel();
			}); // end open

			// Close
			$(".btn--close-ctrl-pnl").on("click", function() {
					hideControlPanel();      
			}); // end close

			//////////////////////////////
			// Change Control Panel Side
			//////////////////////////////
			function switchPanelSide() {
				var btn = $(this);
				if ( $ctrlpnl.hasClass("left") ) {
					$ctrlpnl.removeClass("left").addClass("right");
				} else {
					$ctrlpnl.removeClass("right").addClass("left");
				}
			} // end switch panel side

			// Switch Panel Layout
			$(".btn--layout-ctrl-pnl").on("click", function() {
					switchPanelSide();
			}); // end switch panel side

			/////////////////////////
			// Google Maps
			////////////////////////

			var geocoder;
			var map;
			var zindex = 0;
			var iconPath = "images/icons/map-marker.png";

			// Themes
			// Set globally to be acces in themeswitcher function
			var themeColorful;
			var themeDark;
			var themeLight;
			var themeNeutral;

			// Center on Resize
			var center;
			
			function calculateCenter() {
			  center = map.getCenter();
			}


			// Initialize Google Map			
			function initialize() {

			  // Map Styles
			  themeColorful = [{"featureType":"landscape.man_made","elementType":"geometry","stylers":[{"color":"#f7f1df"}]},{"featureType":"landscape.natural","elementType":"geometry","stylers":[{"color":"#d0e3b4"}]},{"featureType":"landscape.natural.terrain","elementType":"geometry","stylers":[{"visibility":"on"}]},{"featureType":"poi","elementType":"labels","stylers":[{"visibility":"on"}]},{"featureType":"poi.business","elementType":"all","stylers":[{"visibility":"on"}]},{"featureType":"poi.medical","elementType":"geometry","stylers":[{"color":"#fbd3da"}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#bde6ab"}]},{"featureType":"road","elementType":"geometry.stroke","stylers":[{"visibility":"on"}]},{"featureType":"road","elementType":"labels","stylers":[{"visibility":"on"}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#ffe15f"}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#efd151"}]},{"featureType":"road.arterial","elementType":"geometry.fill","stylers":[{"color":"#ffffff"}]},{"featureType":"road.local","elementType":"geometry.fill","stylers":[{"color":"black"}]},{"featureType":"transit.station.airport","elementType":"geometry.fill","stylers":[{"color":"#cfb2db"}]},{"featureType":"water","elementType":"geometry","stylers":[{"color":"#a2daf2"}]}];
			  themeDark = [{"featureType":"all","elementType":"labels.text.fill","stylers":[{"saturation":36},{"color":"#777777"},{"lightness":40}]},{"featureType":"all","elementType":"labels.text.stroke","stylers":[{"visibility":"on"},{"color":"#000000"},{"lightness":16}]},{"featureType":"all","elementType":"labels.icon","stylers":[{"visibility":"on"}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#000000"},{"lightness":20}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#000000"},{"lightness":17},{"weight":1.2}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":20}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":21}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#396D94"},{"lightness":17}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#000000"},{"lightness":29},{"weight":0.2}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":18}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#333333"},{"lightness":16}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#89934C"},{"lightness":19}]},{"featureType":"water","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":17}]}];
			  themeLight = [{"featureType":"administrative.locality","elementType":"all","stylers":[{"hue":"#2c2e33"},{"saturation":7},{"lightness":19},{"visibility":"on"}]},{"featureType":"landscape","elementType":"all","stylers":[{"hue":"#ffffff"},{"saturation":-100},{"lightness":100},{"visibility":"simplified"}]},{"featureType":"poi","elementType":"all","stylers":[{"hue":"#ffffff"},{"saturation":-100},{"lightness":100},{"visibility":"off"}]},{"featureType":"road","elementType":"geometry","stylers":[{"hue":"#bbc0c4"},{"saturation":-93},{"lightness":31},{"visibility":"simplified"}]},{"featureType":"road","elementType":"labels","stylers":[{"hue":"#bbc0c4"},{"saturation":-93},{"lightness":31},{"visibility":"on"}]},{"featureType":"road.arterial","elementType":"labels","stylers":[{"hue":"#bbc0c4"},{"saturation":-93},{"lightness":-2},{"visibility":"simplified"}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"hue":"#e9ebed"},{"saturation":-90},{"lightness":-8},{"visibility":"simplified"}]},{"featureType":"transit","elementType":"all","stylers":[{"hue":"#e9ebed"},{"saturation":10},{"lightness":69},{"visibility":"on"}]},{"featureType":"water","elementType":"all","stylers":[{"hue":"#e9ebed"},{"saturation":-78},{"lightness":67},{"visibility":"simplified"}]}]
			  themeNeutral = [{"featureType":"administrative","elementType":"all","stylers":[{"visibility":"on"},{"lightness":33}]},{"featureType":"landscape","elementType":"all","stylers":[{"color":"#f2e5d4"}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#c5dac6"}]},{"featureType":"poi.park","elementType":"labels","stylers":[{"visibility":"on"},{"lightness":20}]},{"featureType":"road","elementType":"all","stylers":[{"lightness":20}]},{"featureType":"road.highway","elementType":"geometry","stylers":[{"color":"#c5c6c6"}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#e4d7c6"}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#fbfaf7"}]},{"featureType":"water","elementType":"all","stylers":[{"visibility":"on"},{"color":"#acbcc9"}]}];
			  geocoder = new google.maps.Geocoder();
 			  var latlng = new google.maps.LatLng(44.903977, 2.455188);

			  // Options
	      	  var mapOptions = {
	          center: latlng,
	          zoom: 3,
	          styles: themeColorful,
	          mapTypeControlOptions: {
			        style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
			        position: google.maps.ControlPosition.BOTTOM_CENTER
			    },
	       }; // end Map options

	         // Map
	        map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

	        // Dark Theme
	        google.maps.event.addDomListener(document.querySelector(".btn--dark-theme"), 'click', function(){
			  		switchTheme(themeDark);
	        		$(this).addClass("active");
	      });

	        // Light Theme
	        google.maps.event.addDomListener(document.querySelector(".btn--light-theme"), 'click', function(){
			  		switchTheme(themeLight);
			  		$(this).addClass("active");
	      });

	        // Colorful Theme
	        google.maps.event.addDomListener(document.querySelector(".btn--colorful-theme"), 'click', function(){
			  		switchTheme(themeColorful);
			  		$(this).addClass("active");
	      });

	       // Neutral Theme
	        google.maps.event.addDomListener(document.querySelector(".btn--neutral-theme"), 'click', function(){
			  		switchTheme(themeNeutral);
			  		$(this).addClass("active");
	      });

	        // Center On Resize
	        google.maps.event.addDomListener(map, 'idle', function() {
			   calculateCenter();
			 });
			 google.maps.event.addDomListener(window, 'resize', function() {
			   map.setCenter(center);
			 });

	        // Crude Add Marker
	        google.maps.event.addListener(map, 'dblclick', function(event) {
  				placeMarker(event.latLng);
  			 });
	      } // End Map Init

	      ///////////////////
	      // Initialize Map
	      //////////////////
	      	google.maps.event.addDomListener(window, 'load', initialize);

	      	////////////////////////
	       // Map Theme Switcher
	       ////////////////////////
	        function switchTheme(theme) {
	        		var activeBtn = $(this);

	        		// Set toggle buttons inactive
	        		$(".theme-toggle").each(function(){
	        			$(this).removeClass("active");
	        		});

	        		// Set theme
		      		map.setOptions({
		      			styles: theme 
		      		});	
	        }

			///////////////////////////////////
	      // Add Marker
	      ///////////////////////////////////
			function placeMarker(location) {

			  // Increment zIndex
			  zindex++; 

			  // Setup marker
			  var marker = new google.maps.Marker({
			    position: location,
			    map: map,
			    zIndex: zindex,
			    icon: iconPath
			  });

			  // Pass LatLng to Geocoder to return Address
			  var lat = String(location.lat());
			  var lng = String(location.lng());
			  var latlng = new google.maps.LatLng(lat, lng);
			  geocoder.geocode( { 'latLng': latlng}, function(results, status) {
			  	// If success, set marker to first result
			   if (status == google.maps.GeocoderStatus.OK) {
			   	// Setup Infowindow
			   		var infowindow = new google.maps.InfoWindow({
			   			content: results[0].formatted_address,
			   			zIndex: zindex
			   		});
			   		// Open InfoWindow
			       infowindow.open(map, marker);
			  	}
			  }); // End geocoder
			} // end Placemarker

	      ///////////////////////////////////
	      // Geo Location Search
	      ///////////////////////////////////
	       function codeAddress() {
			  var address = document.getElementById('address').value;
			  geocoder.geocode( { 'address': address}, function(results, status) {
			  	// If success, set marker to first result
			    if (status == google.maps.GeocoderStatus.OK) {
			      map.setCenter(results[0].geometry.location);
			      var marker = new google.maps.Marker({
			          map: map,
			          position: results[0].geometry.location,
			          icon: iconPath
			      });

			      // Zoom out map
			      map.setOptions({
			      		zoom: 12
			      });

			      ///////////
			      // Results
			      //////////

			      // Store First Result for display to user
			      var result = results[0].formatted_address + " <br /> <span class='latlng'>" + results[0].geometry.location + "</span>";

			      // Display Result
			      var resultDiv = document.querySelector(".geocode-results");
			      resultDiv.innerHTML = "<span class='results-header'>Results: <div class='toggle-results'>-</div></span><div data-lat='" + results[0].geometry.location.k + "' data-long='" + results[0].geometry.location.D + "' class='results'>" + result + "</div>";

			      ///////////////
			      // Suggestions
			      //////////////

			      // Store secondary results to display as suggestions
			      var suggestions = "";
			      var suggestionDiv = document.querySelector(".geocode-suggestions");
			     
			      // Loop over suggestions and create an unordered list
			      // Store Location in data attribute for easy click
			      for (var i = 1; i < results.length; i++) {
			      		console.log(results[i].geometry.location );
			      		suggestions += "<li class='suggested-location' data-lat='" + results[i].geometry.location.k + "' data-long='" + results[i].geometry.location.D + "'>" + results[i].formatted_address + "<br /><span class='latlng'>" + results[i].geometry.location + "</span></li>";
			      };

			      // Display Suggestions
			      if (results.length > 1) {
			      		suggestionDiv.innerHTML = "<span class='did-you-mean'>Did you mean?: <div class='toggle-suggestions'>-</div></span><div class='suggestions'>" + suggestions + "</div>";
			      		suggestionDiv.style.display = "block";
			      };

			    } else {
			     // Alert the error
			     alert('Geocode was not successful for the following reason: ' + status + ' You may want to try another search term.');
			    }
			  }); // end geocode
			} // End CodeAddress

			//////////////////////////
	      // Search & Set Geolocation
	      ///////////////////////////
	      google.maps.event.addDomListener(document.querySelector("#btn--submit-geocode"), 'click', codeAddress);
	      $("#address").keypress(function(e) {
			    if(e.which == 13) {
			       codeAddress();
			    }
			});

	      // Set the map marker based upon when a user clicks a suggestion
	      function goToSuggestion() {
	      	   var location =  new google.maps.LatLng(this.dataset.lat, this.dataset.long);
			   map.panTo(location);
			   resultDiv.innerHTML = this.innerHTML;
		      var marker = new google.maps.Marker({
		          map: map,
		          position: location
		      });
	      }
	      // Suggestion
		   $(document).on( "click", ".suggested-location", goToSuggestion);
		   // Original Result
		   $(document).on( "click", ".results" ,goToSuggestion);

		   // Toggle the results div
		   $(document).on( "click", ".toggle-results", function() {
		   	   var txt = $(".results").is(':visible') ? '+' : '-';
		   		$(this).text(txt);
			   $(".results").slideToggle();
			});

		   // Toggle the suggestions div
		   $(document).on( "click", ".toggle-suggestions", function() {
		   		var txt = $(".suggestions").is(':visible') ? '+' : '-';
		   		$(this).text(txt);
			   $(".suggestions").slideToggle();
			});
		}); // End Ember Run Schedule
	}, // End Did Insert Element

	// View Class Name
	classNames: ['my-view']
});
