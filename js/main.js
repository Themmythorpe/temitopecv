
// Page Loader : hide loader when all are loaded
$(window).load(function(){
	"use strict";
    $('#page-loader').addClass('hidden');
});


/* 3. Init all plugin on document load */
$(document).ready(function() {
	"use strict";

/*-- modal popup ---*/	
$('.popup').click(function(){
  var mainpop = $(this).attr('class');
  $('#modal-container').removeAttr('class').addClass(mainpop);
  $('body').addClass('modal-active');
});

$('#modal-container').click(function(){
  $(this).addClass('out');
  $('body').removeClass('modal-active');
});

$('.service-box').hover(function(){
  $(this).children('i').toggleClass('heartbeat');
});	
	

/* Slide Background variables */
var isSlide = false;
var slideElem = $('.slide');
var arrowElem = $('.p-footer .arrow-d');
var pageElem = $('.page');	
	
// auto typer typed	
    if ($.isFunction($.fn.typed)) {
        $(".aris-meta > h3 span").typed({
            strings: ["Freelancer", "Web Designer", "Full Stack Web Developer"],
            loop: true,
            startDelay: 1e3,
            backDelay: 3e3,
            typeSpeed: 30
        });
    }

//------ scrollbar plugin
	if ($.isFunction($.fn.perfectScrollbar)) {
		$('.our-work, .detail-meta').perfectScrollbar();
	}
	
// --- youtube video background	
	if ($.isFunction($.fn.YTPlayer)) {	
		jQuery("#bg-youtube").YTPlayer();
	}
	
	
/** Init fullpage.js */
    $('#mainpage').fullpage({
		menu: '#qmenu',
		anchors: ['home', 'about-us', 'services', 'portfolio', 'contact'],
    	verticalCentered: true,
    	resize : false,
		responsive: 900,
		scrollOverflow: true,
        css3: false,
        navigation: true,
		onLeave: function(index, nextIndex, direction){
			arrowElem.addClass('gone');
			pageElem.addClass('transition');
			$('.active').removeClass('transition');
			slideElem.removeClass('transition');
			isSlide = false;
		},
        afterLoad: function(anchorLink, index){
			arrowElem.removeClass('gone');
			pageElem.removeClass('transition');
			if(isSlide){
				slideElem.removeClass('transition');
			}
		},
		
        afterRender: function(){}
    });
	
	//===== Ajax Contact Form =====//
  $('#contactform').on('submit', function () {
   var action = $(this).attr('action');
	  
   var msg = $('#message');
   $(msg).hide();
   var data = 'name=' + $('#name').val() + '&email=' + $('#email').val() + '&phone=' + $('#phone').val() + '&comments=' + $('#comments').val() + '&verify=' + $('#verify').val() + '&captcha=' + $(".g-recaptcha-response").val();
	 
   $.ajax({
     type: 'POST',
     url: action,
     data: data,
     beforeSend: function () {
      $('#submit').attr('disabled', true);
      // $('img.loader').fadeIn('slow');
    },
    success: function (data) {
      $('#submit').attr('disabled', false);
      $('img.loader').fadeOut('slow');
      $(msg).empty();
      $(msg).html(data);
      $('#message').slideDown('slow');
      if (data.indexOf('success') > 0) {
        $('#contactform').slideUp('slow');
      }
    }
  });
   return false;
 });
	
});//document .ready end here

