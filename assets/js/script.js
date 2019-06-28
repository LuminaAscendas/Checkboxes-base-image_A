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
	$(".mainGraph").mouseenter(function(){
		$(".mainGraph").attr("title","Coral bleaching");
		
	});
	$(".mainGraph").mouseleave(function() {
  		$(".mainGraph").removeAttr('title');
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
			$('.mainGraph').addClass('tab_index').attr('tabindex','0');
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
		var divElem='<div class="header" id="head_ing" role="group">Cascading Responses</div>';
		var numberOfCheck=4;
		
		//
		if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
			for(i=0; i<numberOfCheck; i++){
				divElem+='<div class="item" role="none"><div  role="none" class="colorbox '+colourArr[i]+'"></div><span class="labelText" id="lab'+(i+1)+'" role="none">Step '+(i+1)+'</span><span role="checkbox" id="check_'+(i+1)+'" class="checkbox1" aria-checked="false" ></span></div>'	
			}	
		}else{
			for(i=0; i<numberOfCheck; i++){
				divElem+='<div class="item" role="none"><div  role="none" class="colorbox '+colourArr[i]+'"></div><span class="labelText" id="lab'+(i+1)+'" role="none">Step '+(i+1)+'</span><span role="checkbox" id="check_'+(i+1)+'" class="checkbox1" aria-checked="false"></span></div>'	
			}
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
				$('#'+e.target.id).trigger('click');
				$('#'+e.target.id).focus();
		}
	} 
	
	$('#reset_btn').off('click').on('click',function(){
		goBeginPage();
	});
	
	$('.checkbox1').on("click",fnClickCheckBox);
	
	
	
	
  	$(".checkbox1").mouseenter(function(){
  		$(".checkbox1").removeAttr('title');
	});
	$(".checkbox1").mouseleave(function() {
		for(i=0; i<numberOfCheck; i++){
			$(".checkbox1").attr("title", checkBoxText[i]);
		}
	});
	
	
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
	
		id = $(this).attr('id');
		indexId = id.substr(id.indexOf("_") + 1);
		console.log(indexId);
		//$.browser.mozilla = /firefox/.test(navigator.userAgent.toLowerCase()); 
		
		if($(this).hasClass("clicked")){
			$(this).removeClass("clicked");
			$('#check_'+indexId).attr("aria-checked", "false");
			$('.graph_'+indexId).css('display','none');
			$('#check_'+indexId).removeAttr('title')
			$('#check_'+indexId).removeAttr('aria-label');
			$('#check_'+indexId).blur();
			setTimeout(function(){
				$('#check_'+indexId).focus();
			},100)
/* 			if ($.browser.mozilla) {
				alert('')
				$('#check_'+indexId).removeAttr('title');
			} */
		}else{
			$(this).addClass("clicked");
			$('#check_'+indexId).attr("aria-checked", "true");
			$('#check_'+indexId).attr('title',checkBoxText[indexId-1])
			$('#check_'+indexId).attr('aria-label',checkBoxText[indexId-1])
			$('.graph_'+indexId).css('display','block');
			$('#check_'+indexId).blur();
			setTimeout(function(){
				$('#check_'+indexId).focus();
			},100)
			
			
/*  			if ($.browser.mozilla) {
				alert('');
				$('#check_'+indexId).attr('title', checkBoxText[indexId-1]);
			}  */
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
		$('#head_ing').addClass('tab_index').attr('tabindex','0');
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

