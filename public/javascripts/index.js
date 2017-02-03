$(document).ready(function(){
    // new WOW().init();
   // $("#top").particleground({
   //  dotColor: '#42bff4',
   //  lineColor: '#3361FF',
   //  density: 9000,
   // });
   $(window).scroll(function(){
        var scrollPercent = ($(this).scrollTop() / $(document).height()) * 100;

        if(scrollPercent> 10 && scrollPercent< 25) {
            $("nav").css({"background-color":"#3361FF"});
            $("#navbar-collapse").css({"background-color":"#3361FF"});     
            
        } else if (scrollPercent> 25 && scrollPercent< 41) {
            $("nav").css({"background-color":"#ee9b2a"});
            $("#navbar-collapse").css({"background-color":"#ee9b2a"});     
            
        } else if (scrollPercent> 41 && scrollPercent< 76) {
            $("nav").css({"background-color":"#e2616e"});
            $("#navbar-collapse").css({"background-color":"#e2616e"}); 

        } else if (scrollPercent> 76 && scrollPercent< 90) {
            $("nav").css({"background-color":"#96ceed"});
            $("#navbar-collapse").css({"background-color":"#96ceed"});        
        } else{
            $("nav").css({"background-color":"#1d1d1d"});   
            $("#navbar-collapse").css({"background-color":"#1d1d1d"});   
        }
    })

  $("#login-button").click(function(){
    window.location.href = "/login";
  })

   $("#signup-button").click(function(){
    window.location.href = "/signup";
  })
    
})