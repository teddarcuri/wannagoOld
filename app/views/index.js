import Ember from 'ember';

export default Ember.View.extend({
	didInsertElement : function(){
		Ember.run.schedule('afterRender', this, function(){
			/////////////////////////
			// Google Maps
			////////////////////////
			
			function initialize() {
			  // Options
        	  var mapOptions = {
	          center: { lat: 28.274790, lng: 4.011689},
	          zoom: 2
	        };

	        var map = new google.maps.Map(document.getElementById('map-canvas'),
	            mapOptions);
	      }
	      google.maps.event.addDomListener(window, 'load', initialize);
		});
	}
});
