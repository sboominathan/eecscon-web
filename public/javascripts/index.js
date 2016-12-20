$(document).ready(function(){
    // new WOW().init();
   $("#top").particleground({
    dotColor: '#42bff4',
    lineColor: '#3361FF',
    density: 9000,
   });
   $(window).scroll(function(){
        if($(this).scrollTop() > 700 && $(this).scrollTop() < 1400) {
            $("nav").css({"background-color":"#3361FF"});
            $("#navbar-collapse").css({"background-color":"#3361FF"});     
            
        } else if ($(this).scrollTop() > 1400 && $(this).scrollTop() < 2200) {
            $("nav").css({"background-color":"#ee9b2a"});
            $("#navbar-collapse").css({"background-color":"#ee9b2a"});     
            
        } else if ($(this).scrollTop() > 2200 && $(this).scrollTop() < 3800) {
            $("nav").css({"background-color":"#e2616e"});
            $("#navbar-collapse").css({"background-color":"#e2616e"}); 

        } else if ($(this).scrollTop() > 3800 && $(this).scrollTop() < 4500) {
            $("nav").css({"background-color":"#96ceed"});
            $("#navbar-collapse").css({"background-color":"#96ceed"});        
        } else{
        	$("nav").css({"background-color":"#1d1d1d"});   
            $("#navbar-collapse").css({"background-color":"#1d1d1d"});   
        }
    })
    
})