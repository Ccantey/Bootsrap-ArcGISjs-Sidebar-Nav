$(document).ready(function () {

$('.overlayLayer').click(function(e) {
  $('.overlayLayer').removeClass('active');
  var $this = $(this);
  if (!$this.hasClass('active')) {
    $this.addClass('active');
  }
  e.preventDefault();
});

$(".overlayLayer").click(function () {   
	var inputs = dojo.query(".overlayLayer");
	var visible = [-1]; 
	for (var i = 0, il = inputs.length; i < il; i++) {
		var layerLabel = $(inputs[i]).text();  
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
			overlayLayer.setVisibleLayers([-1])
		}
	}
	overlayLayer.setVisibleLayers(visible);
});

 function objectFindByKey(array, key, value) {
        for (var i = 0; i < array.length; i++) {
            if (array[i][key] === value) {
                return array[i];
            }
        }
        return null;
    }	
});
