$(document).ready(function () {

    // Mouse wheel behavior for side scrolling.
    $("body").on("mousewheel", function (event, delta, deltaX, deltaY) {
        if ($(document).height() <= $(window).height())
            window.scrollBy(-delta * 50, 0);
    });

});

function closeApp() {
    if (window.parent
        && window.parent.viewModel
        && typeof window.parent.viewModel.closeApp == "function") {
        window.parent.viewModel.closeApp();
    }
    else {        
        document.location = "/";
    }
}