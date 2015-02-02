import Ember from 'ember';

export default Ember.View.extend({
	didInsertElement : function(){
		Ember.run.schedule('afterRender', this, function(){

			var $ctrlpnl = $("#control-panel"); // Control Panel

			// Show Control Panel
			function showControlPanel() {

				if( $ctrlpnl.hasClass("expanded") ) {
					$ctrlpnl.addClass("wiggle");
					setTimeout(function(){
						$ctrlpnl.removeClass("wiggle");
					}, 400);
				} else {
						$ctrlpnl.addClass("expanded");
					setTimeout(function(){
						$ctrlpnl.children().fadeIn();
					}, 400);
				}
			}

			// Close Control Panel
			function hideControlPanel() {
				$ctrlpnl.children().fadeOut();
				setTimeout(function(){
					$ctrlpnl.removeClass("expanded");
				}, 300);
			}

			// Open
			$(".btn--add-location").on("click", function() {
					showControlPanel();
			});

			// Close
			$(".btn--close-ctrl-pnl").on("click", function() {
					hideControlPanel();
			});

			// Changes Control Panel Side

			function switchPanelSide() {
				var btn = $(this);
				if ( $ctrlpnl.hasClass("left") ) {
					$ctrlpnl.removeClass("left").addClass("right");
				} else {
					$ctrlpnl.removeClass("right").addClass("left");
				}
			}

			$(".btn--layout-ctrl-pnl").on("click", function() {
					switchPanelSide();
			});

			/////////////////////////
			// Google Maps
			////////////////////////
			
			function initialize() {

			  // Map Styles
			  var styles = [{"featureType":"landscape.man_made","elementType":"geometry","stylers":[{"color":"#f7f1df"}]},{"featureType":"landscape.natural","elementType":"geometry","stylers":[{"color":"#d0e3b4"}]},{"featureType":"landscape.natural.terrain","elementType":"geometry","stylers":[{"visibility":"off"}]},{"featureType":"poi","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"poi.business","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"poi.medical","elementType":"geometry","stylers":[{"color":"#fbd3da"}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#bde6ab"}]},{"featureType":"road","elementType":"geometry.stroke","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#ffe15f"}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#efd151"}]},{"featureType":"road.arterial","elementType":"geometry.fill","stylers":[{"color":"#ffffff"}]},{"featureType":"road.local","elementType":"geometry.fill","stylers":[{"color":"black"}]},{"featureType":"transit.station.airport","elementType":"geometry.fill","stylers":[{"color":"#cfb2db"}]},{"featureType":"water","elementType":"geometry","stylers":[{"color":"#a2daf2"}]}];
			 
			  // Options
        	  var mapOptions = {
	          center: { lat: 38.700707, lng: -101.451547},
	          zoom: 4,
	          styles: styles,
	          mapTypeControlOptions: {
			        style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
			        position: google.maps.ControlPosition.BOTTOM_CENTER
			    },
	        };

	        // Map
	        var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
	      }

	      google.maps.event.addDomListener(window, 'load', initialize);

	   /////////////
	   // Three JS
	   /////////////
		var camera, scene, renderer, cube, material, mesh;

		init();
		animate();

		function init() {
		   scene = new THREE.Scene();

		camera = new THREE.PerspectiveCamera(
		  75, 
		  window.innerWidth/window.innerHeight, 
		  1, 
		  10000);

		camera.position.z = 900;
		scene.add(camera);

		cube =  new THREE.SphereGeometry(105, 24, 24);

		material = new THREE.MeshBasicMaterial({
		  color: 0xffffff, 
		  wireframe: true,
		  wireframeLinewidth: 2
		});
		mesh = new THREE.Mesh(cube, material);
		scene.add(mesh);

		renderer = new THREE.CanvasRenderer();

		renderer.setSize(window.innerWidth, window.innerHeight);
		  
		mesh.rotation.x += 0.25;

		var element = renderer.domElement;
		  
		document.querySelector("#map-canvas").appendChild(element);
		    

		}

		function animate() {
		  requestAnimationFrame(animate);
		  
		  mesh.rotation.y += 0.005;

		  renderer.render(scene, camera);
		}

		});

	},

	classNames: ['my-view']
});
