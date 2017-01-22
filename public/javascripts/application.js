$(document).ready(function(){
    if ($("#message").text() == ""){
    	 $('#message').hide();
    }

    if ($("#errors a").text() == ""){
       $('#errors').hide();
    }
    var year = $("#year").attr("value");
    if (year != ""){
      $("#year").val(year);
    }

    var course = $("#course").attr("value");
    if (course != ""){
      $("#course").val(course);
    }

    var superurop = $("#superurop").attr("value");
    if (superurop != ""){
      $("#superurop").val(superurop);
    }

    var presentation = $("#presentation").attr("value");
    if (presentation != ""){
      $("#presentation").val(presentation);
    }

    var field = $("#field").attr("value");
    if (field != ""){
      $("#field").val(field);
    }
     

    // console.log($("#year").val());
    // if ($("#year").val()==""){
    //   $("#year").selectedIndex = 0;
    // }
    
    // $("#account").click(function(){
    //    $('#signup-form').hide();
    //    $('#login-form').show();
    // })
    // $("#register").click(function(){
    //    $('#signup-form').show();
    //    $('#login-form').hide();
    // })
})