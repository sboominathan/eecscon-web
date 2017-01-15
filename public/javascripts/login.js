$(document).ready(function(){
    if ($("#status").text().trim() == "Sign Up"){
    	 $('#login-form').hide();
    } else{
    	$('#signup-form').hide();
    }
    
    $("#account").click(function(){
       $('#signup-form').hide();
       $('#login-form').show();
    })
    $("#register").click(function(){
       $('#signup-form').show();
       $('#login-form').hide();
    })
})