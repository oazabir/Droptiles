/*
    Droptiles - App Store Script
    Copyright 2012, Omar AL Zabir

    Builds the App Store experience showcasing the available tiles.
*/


// Configuration of UI elements on the Dashboard. This is used by the Core
// to find the UI elements on the screen and offer various dynamic behaviors.
// If you are building your own dashboard, make sure you put your own config.
var ui = {
    subcontent_height: 50,
    metro_sections_selector: '.metro-sections',
    metro_section_selector: '.metro-section',
    metro_section: 'metro-section',
    hover_metro_section: 'hover-metro-section',
    metro_section_overflow: 'metro-section-overflow',
    app_iframe_id: 'app_iframe',
    app_iframe_zindex: 60000,
    navbar: '#navbar',
    navbar_zindex: '60001',
    tile: 'tile',
    tile_content_main_selector: '.tile-content-main',
    tile_selector: '.tile',
    tile_color: 'bg-color-blue',
    tile_icon_size: 'tile-icon-large',
    tile_icon_src: 'img/update.png',
    tile_subContent_color: 'bg-color-blueDark',
    tile_multi_content_selector: '.tile-multi-content',
    tile_multi_content: 'tile-multi-content',
    tile_content_slide_delay: 10000,
    tile_content_sub_selector: '.tile-content-sub',
    tile_content_sub: 'tile-content-sub',
    trash: '#trash',
    position_cookie: 'tiles',
    splash_screen_zindex: 65000,
    splash_screen_icon_class: 'tile-icon-large',
    signin_splash_color: 'bg-color-green',
    signin_splash_icon: 'img/User No-Frame.png',
    settings_splash_color: 'bg-color-purple',
    settings_splash_icon: 'img/configure.png',
    appStore_splash_color: 'bg-color-blue',
    appStore_splash_icon: 'img/App Store.png',
    anon_first_name: 'John',
    anon_last_name: 'Anonymous',
    anon_photo: 'img/User No-Frame.png',

    login_page: "ServerStuff/Login.aspx",
    logout_page: "ServerStuff/Logout.ashx",
    settings_page: "ServerStuff/Settings.aspx"
};


// This is the viewModel for the entire Dashboard. The starting point.
// It takes the currentUser (defined in the Droptiles.master), the UI config (as above)
// and the TileBuilders that comes from Tiles.js.
var viewModel = new DashboardModel("App Store", [], window.currentUser, ui, TileBuilders);

$(document).ready(function () {

    // Hide the body area until it is fully loaded in order to prevent flickrs
    $('#content').css('visibility', 'visible');

    // Initiate KnockoutJS binding which creates all the tiles and binds the whole
    // UI to viewModel.
    ko.applyBindings(viewModel);

    viewModel.switchTheme('theme-white');
    viewModel.loadSectionsFromString(window.AppStoreTiles);

    createCookie("add", "");

    viewModel.onTileClick = function (tile) {
        $('#' + tile.uniqueId).addClass("selected");

        var cookie = readCookie("add");
        if (cookie == null)
            cookie = tile.name;
        else
            cookie += "," + tile.name;
        createCookie("add", cookie);

        return false;
    }

    $(window).resize(function () {
        viewModel.resize();
    });

    // Mouse wheel behavior for side scrolling.
    $("body").on("mousewheel", function (event, delta, deltaX, deltaY) {
        window.scrollBy(-delta * 50, 0);
    });

    $("#navbar").tooltip({
        title: "I am still here. Come here to go back to Dashboard",
        animate: true,
        placement: 'bottom',
        trigger: 'manual'
    });

    // Supports only IE 9+, Chrome, Firefox, Safari
    if ($.browser.msie && parseInt($.browser.version) < 9)
        $("#browser_incompatible").show();

});