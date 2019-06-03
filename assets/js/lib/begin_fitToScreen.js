
var cont = document.getElementById('responsive_container');
var isWebkit = 'webkitRequestAnimationFrame' in window;
var scale = 1;

function resizeApp(){
	
    var winWidth = $("#whole_container").width();
	var winHeight = $("#whole_container").height();
	var appWidth = cont.offsetWidth;
    var appHeight = cont.offsetHeight;	
	winWidth = window.innerWidth; //retrieve current window width
	winHeight = window.innerHeight; //retrieve current window height
	
	
	

    if(winWidth-60 < appWidth || winHeight-60 < appHeight)
        {
	   scale = (((winWidth/appWidth)<(winHeight/appHeight))?(winWidth/appWidth):(winHeight/appHeight))-0.01//-0.15; //scaling
        }
            else {
                
                scale=1;
            }
	

			//$('#responsive_container').css('height',$("#whole_container").height()*scale);
			cont.style.msTransformOrigin = '0 0';	
			cont.style.msTransform = "scale("+scale+","+scale+")";
			cont.style.TransformOrigin = '0 0';	
			cont.style.Transform = "scale("+scale+")";
			cont.style.webkitTransformOrigin = '0 0';
			cont.style.webkitTransform = "scale("+scale+")";
			cont.style.MozTransformOrigin = '0 0';	
			cont.style.MozTransform = "scale("+scale+")";
			var appWidth = cont.offsetWidth * scale;
			var bodyheight = cont.offsetHeight*scale;
			var bodywidth = cont.offsetWidth*scale;
			var winWidth = window.innerWidth;
			$('body').css('height',(bodyheight)+'px');
			$('body').css('background-size','100% '+(bodyheight)+'px');
			//document.getElementById('whole_container').style.left = ((winWidth - appWidth )/2)+'px';
			$('#whole_container').css('height',($("#responsive_container").height()*scale)+$("#text_container").height());
			$('#whole_container').css('width',$("#responsive_container").width()*scale-0.01);


	
		
	

}


	

resizeApp();

