$(document).ready(function () {

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
	var visible = [-1]; //street and city labels
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
			overlayLayer.setVisibleLayers([-1])
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
