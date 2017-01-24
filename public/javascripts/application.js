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

    if ($("#errors a").text() == "Edit Application"){
        $("#application :input").prop("disabled", true);
    }
     
    $("#errors").click(function(){
      if ($("#errors a").text() == "Edit Application"){
        $("#application :input").removeAttr("disabled");
        $("#errors").hide();
    }

    })

})