$(document).ready(function () {



$('#gps').click(function () {
     map.graphics.clear();
	  require(["esri/domUtils"], function(domUtils){
	if (navigator.geolocation) {
		//showPageLoadingMsg();
		//if you want to track as the user moves setup navigator.geolocation.watchPostion
		// domUtils.show(("loading"));
		domUtils.show(loading);
		navigator.geolocation.getCurrentPosition(zoomToLocation, locationError);
		gpsid = navigator.geolocation.watchPosition(showLocation, locationError);
	}
  });
});

function locationError(error) {
  require(["esri/domUtils"], function(domUtils){
	switch (error.code) {
	case error.PERMISSION_DENIED:
		alert("Location not provided");
		navigator.geolocation.clearWatch(gpsid);
		domUtils.hide(loading);
		break;
	case error.POSITION_UNAVAILABLE:
		alert("Current location not available");
		navigator.geolocation.clearWatch(gpsid);
		domUtils.hide(loading);
		break;
	case error.TIMEOUT:
		alert("Timeout");
		navigator.geolocation.clearWatch(gpsid);
		domUtils.hide(loading);
		break;
	default:
		alert("unknown error");
		navigator.geolocation.clearWatch(gpsid);
		domUtils.hide(loading);
		break;
	}
  });	
}

		  

function zoomToLocation(position) {
  require(["esri/geometry/webMercatorUtils", "esri/symbols/PictureMarkerSymbol","esri/geometry/Point","esri/graphic","esri/domUtils"], function(webMercatorUtils, PictureMarkerSymbol,Point,Graphic,domUtils){
	//$.mobile.hidePageLoadingMsg(); //true hides the dialog
	var pt = webMercatorUtils.geographicToWebMercator(new Point(position.coords.longitude, position.coords.latitude));
	map.centerAndZoom(pt, 20);
	//uncomment to add a graphic at the current location
	var symbol = new PictureMarkerSymbol("images/bluedot.png", 40, 40);
	graphic = new Graphic(pt, symbol);
	map.graphics.add(graphic);
	domUtils.hide(loading);

  });
}

function showLocation(location) {
  require(["esri/geometry/webMercatorUtils", "esri/symbols/PictureMarkerSymbol","esri/geometry/Point","esri/graphic","esri/domUtils"], function(webMercatorUtils, PictureMarkerSymbol,Point,Graphic,domUtils){
    var pt = webMercatorUtils.geographicToWebMercator(new Point(location.coords.longitude, location.coords.latitude));
	var symbol = new PictureMarkerSymbol("images/bluedot.png", 40, 40);
   if (location.coords.accuracy <= 500) {
   // the reading is accurate, do this
     if (!graphic) {	
		graphic = new Graphic(pt, symbol);
		map.graphics.add(graphic);
		map.centerAndZoom(pt, 20);
		domUtils.hide(loading);
	  }else{ //move the graphic if it exists   
		 graphic.setGeometry(pt);
		 map.centerAndZoom(pt, 20);
		}	  

   } else {
		 // reading is not accurate enough, do something else
		map.centerAndZoom(pt, 20);
		alert('The positional accuracy of your device is low. Best positional accuracy is obtained with a GPS enabled device such as a smart phone.');
		navigator.geolocation.clearWatch(gpsid);
		graphic = new Graphic(pt, symbol);
		map.graphics.add(graphic);
		domUtils.hide(loading);
     }
   });	
}
				
  $('[data-toggle=offcanvas]').click(function() {
    $('.row-offcanvas').toggleClass('active');
  });
  
$('#sidebar .nav>li').click(function(e){
    $('.highlight').removeClass('highlight');
$(this).addClass('highlight');

});
$('.overlayLayer').click(function(e) {
  $('.overlayLayer').removeClass('active');
  var $this = $(this);
  if (!$this.hasClass('active')) {
    $this.addClass('active');
  }
  e.preventDefault();
});

$(".overlayLayer").click(function () {   
	//var inputs = dojo.query(".overlayLayer");
	var inputs = dojo.query(".overlayLayer");
	var visible = [3,4,11]; //street and city labels
	for (var i = 0, il = inputs.length; i < il; i++) {
		var layerLabel = $(inputs[i]).text();  //To select labels to check, we must nest <label tag> in htm. and somehow select that nested label
		//console.log('layerLabel: ',layerLabel);
		var layerCheckState = $(inputs[i]);
		//console.log('layerCheckState: ',layerCheckState);
		var layerObject = objectFindByKey(globalMapLayers, 'name', layerLabel);
		console.log('layerObject: ',layerObject);
		if ($(layerCheckState).hasClass("active")) {
			visible.push(layerObject.id);			
			//console.log(layerObject.id);
		}
		else {
			$(layerCheckState).removeClass("active");
			overlayLayer.setVisibleLayers([3,4,11])
			//var elem = $('li.current_sub').prevAll("checked:first");
			//elem.removeClass("checked");
			
		}
	}

	overlayLayer.setVisibleLayers(visible);
	legend.refresh();
	//$('.scrollable').nanoScroller();

});

 function objectFindByKey(array, key, value) {
        //alert(value);
        for (var i = 0; i < array.length; i++) {
		    //alert(array[i].name);
            if (array[i][key] === value) {
                return array[i];
            }
        }
        return null;
    }	


	

});
