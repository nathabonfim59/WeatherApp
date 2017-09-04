// var $ = require('jquery');

// Animate the click in change scale button
function animateButton(buttonId) {
    // Add the aparence of enabled when clicked
    function clearActive(element, animationClass) {
        $("#changeTempScale .active").removeClass("active")
        $("#" + buttonId).addClass("active");

        // Remove the previous animation class
        if (element && animationClass) {
            $(element).removeClass(animationClass);
        }
    }

    function addAnimation(element, animationClass) {
           $(element).addClass(animationClass);
    }
    // Make the conversion between scales
    if (buttonId === "tempCelcius") {
        clearActive("#tempFarenheit", "animate-right");
        addAnimation("#tempCelcius", "animate-left");

    } else if (buttonId === "tempFarenheit") {
        clearActive("#tempCelcius", "animate-left");
        addAnimation("#tempFarenheit", "animate-right");
    }
}

$(document).ready(function() {
    $("#changeTempScale").click(function(event) {
        var requestedScale = event.target.id;
        animateButton(requestedScale);
    });
});