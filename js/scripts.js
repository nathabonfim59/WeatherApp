// var $ = require('jquery');
$(document).ready(function() {
    $("#changeTempScale").click(function(event) {
        var requestedScale = event.target.id;
        
        // Add the aparence of enabled when clicked
        function clearActive(element, animationClass) {
            $("#changeTempScale .active").removeClass("active")
            $("#" + requestedScale).addClass("active");

            // Remove the previous animation class
            if (element && animationClass) {
                $(element).removeClass(animationClass);
            }
        }

        function addAnimation(element, animationClass) {
               $(element).addClass(animationClass);
        }
        // Make the conversion between scales
        if (requestedScale === "tempCelcius") {
            clearActive("#tempFarenheit", "animate-right");
            addAnimation("#tempCelcius", "animate-left");

        } else if (requestedScale === "tempFarenheit") {
            clearActive("#tempCelcius", "animate-left");
            addAnimation("#tempFarenheit", "animate-right");
        }
    });
});