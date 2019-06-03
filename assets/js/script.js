var begin_entered=false;
var focus_change=2;
var back_tab=false;
var flagForThird=false;
var zoomed_image=false;
$(document).ready(function(){

	$("#pageImage").mouseenter(function(){
		$("#pageImage").attr("title","Coral bleaching");
	});
	$("#pageImage").mouseleave(function() {
  		$("#pageImage").removeAttr('title');
	});

		/*Begin page */
	
	$('#begin_btn').off('click').on('click',function(){
		
		begin_entered=true;
		$('#begin_page').hide();
		$('a').attr('href', '#reset_btn');
		
		setTimeout(function(){
			$('#activityPage').fadeIn();	
			$('#direction_text').html(direction_text);
			$('#direction_text').attr('aria-label','Directions: Click on each step sequentially in the key to view the cascading responses of increased carbon dioxide.');
			/* $('#head_ing').html(slider[0].slide_Title); */
/* 			$('#head_ing').attr('aria-label',slider[0].slide_Title); */
			set_tab();
			resizeApp();
		},10);
		
		if (/MSIE 10/i.test(navigator.userAgent) || /MSIE 9/i.test(navigator.userAgent) || /rv:11.0/i.test(navigator.userAgent) ||/Edge\/\d./i.test(navigator.userAgent)) {
				$('#whole_container').removeAttr('role');
			}else{
				$('#whole_container').attr('role','application');
			}
		
	});	
	
	/*Begin page Looping*/
	
	$('.beginPageImage,#begin_btn').addClass('tab_index').attr('tabindex','0');
	$('#focus_guard_1').on('focus', function() {
		$('.tab_index').eq(1).focus();
	});
	$('#focus_guard_2').on('focus', function() {
		$('.tab_index').eq(0).focus();
	});
	
	/*Activity page*/
		
	
/*1*/
	$('#focus_reader').on('focus', function(Event) {
		console.log('focus_reader');
		back_tab=true;
		$('#direction_text').focus();
		
		if ($("#direction_text").css('visibility')=='hidden' && back_tab==true) {
				setTimeout(function(){
					console.log('12345')
					$('#head_ing').focus();
						back_tab=false;
				},10)
		}
		$('#whole_container').removeAttr('role');
	});
/*2*/
	
	$('#focus_guard_open').on('focus', function() {
		console.log('focus_guard_open');
		 setTimeout(function(){
			$('.tab_index').eq(2).focus();
		},10)
	})

	$('#focus_guard_end').on('focus', function() {
		console.log("focus_guard_end");	
		 $('.tab_index').eq(1).focus();
		setTimeout(function(){
			$('.tab_index').eq(focus_change).focus();
			$('#direction_text').focus();

		}, 10);
	});
	
   	$('#direction_text').on('focus', function(Event) {
		console.log('direction_text');
 		setTimeout(function(){
			$('#head_ing').addClass('tab_index').attr('tabindex','0');
		},10)
			if ($("#direction_text").is(":focus") && back_tab==true) {
				setTimeout(function(){
					console.log('12345')
					$('#direction_text').focus();
						$('#focus_guard_open').show();
						back_tab=false;
				},10)
			}
			
	});
  	$('#head_ing').on('focus', function(Event) {
		console.log('head_ing');
 		$('#direction_text').removeAttr('role');
		
   })
	
	/*Creating the check box codding*/	
		var colourArr=['red', 'green', 'blue', 'orange']
		var divElem='<div class="header" id="head_ing" role="group">Cascading responses</div>';
		var numberOfCheck=4;
		
		for(i=0; i<numberOfCheck; i++){
			
			divElem+='<div class="item" role="none"><div  role="none" class="colorbox '+colourArr[i]+'"></div><label class="labelText" id="lab'+(i+1)+'">Step '+(i+1)+'</label><span role="checkbox" tabindex="0" aria-labelledby="lab'+(i+1)+'" id="check_'+(i+1)+'" class="checkbox1" aria-checked="false"></span></div>' 	
			
			
/* 			divElem+='<div class="item" role="none"><div  role="none" class="colorbox '+colourArr[i]+'"></div><div  role="none" class="labelText" id=lab'+(i+1)+'>Step '+(i+1)+'</div><div role="none" class="checkbox" id="check_'+(i+1)+'"></div></div>' */
		}
		$('.activityContainer').html(divElem);
	
	setTimeout(function(){
		set_tab();
	},100)
	resizeApp();
	

	
	document.body.onkeyup = function(e){
		console.log(document.activeElement.id)
		if(e.keyCode == 32 || e.keyCode == 13){
			e.preventDefault();
			$('#'+document.activeElement.id).trigger('click');
		}
	} 
	
	$('#reset_btn').off('click').on('click',function(){
		goBeginPage();
	});
	
	$('.checkbox1').on("click keyup",fnClickCheckBox);
})

/*Activity start here*/

// Refresh page 
function goBeginPage(){
	begin_entered=false;
	$('#activityPage').fadeOut();
	$('#begin_page').fadeIn();
	$('.checkbox1').removeClass("clicked");
	for(i=1; i<=4; i++){
		$('.graph_'+i).css('display','none');
	}	
	set_tab();
	//location.reload();
}

var fnClickCheckBox = function(ev){
	if(ev.type=="keyup" && ev.keyCode !=13){
        console.log(ev.keyCode)
        return  true;
    }
	id = $(this).attr('id');
	indexId = id.substr(id.indexOf("_") + 1);
	console.log(indexId);
	if($(this).hasClass("clicked")){
		$(this).removeClass("clicked");
		$('.graph_'+indexId).css('display','none');
	}else{
	
		$(this).addClass("clicked");
		
		$('#check_'+indexId).attr("aria-checked", "true");
		
		$('.graph_'+indexId).css('display','block');		
	}	
}
/*On rezize function*/

window.onresize = function() {
	resizeApp(); 
}

/*Tab Index*/

function set_tab(){
	if(!begin_entered){
		$('#text_container,#responsive_container').hide()
		$('.tab_index,#text_container,#responsive_container').removeClass('tab_index').removeAttr('tabindex');
		$('.beginPageImage,#begin_btn').addClass('tab_index').attr('tabindex','0');
		$('#focus_guard_2,#focus_guard_1').addClass('tab_index');
	}else{

		$('#text_container,#responsive_container').show()
		$('.tab_index,.text_container').removeClass('tab_index').removeAttr('tabindex');
		$('#focus_reader').addClass('tab_index');
		$('#direction_text').addClass('tab_index');
		
		for(i=0; i<=4; i++){
			$('#lab'+i).addClass('tab_index');
			$('#check_'+i).addClass('tab_index');
		}

		$('#reset_btn').addClass('tab_index');
		$('#focus_guard_end,#focus_guard_open').addClass('tab_index');
	}
		$('.tab_index').each(function( index ) {		
			$('.tab_index').attr('tabindex','0');
			
		});
}
