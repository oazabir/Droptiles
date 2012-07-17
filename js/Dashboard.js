/// <reference path="jquery-1.7.2.min.js" />
/// <reference path="TheCore.js" />
/// <reference path="Underscore.js" />

/*
    Droptiles - Dashboard javascript
    Copyright 2012, Omar AL Zabir

    Builds the dashboard experience by using the Droptiles Core.
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
var viewModel = new DashboardModel("Start", [], window.currentUser, ui, TileBuilders);

$(document).ready(function () {

    // Hide the body area until it is fully loaded in order to prevent flickrs
    $('#content').css('visibility', 'visible');

    // Initiate KnockoutJS binding which creates all the tiles and binds the whole
    // UI to viewModel.
    ko.applyBindings(viewModel);

    // See if user has a previous session where page setup was stored
    var cookie = readCookie("p");
    if (cookie != null && cookie.length > 0) {
        try {
            viewModel.loadSectionsFromString(cookie);
        } catch (e) {
            // Failed to load saved tiles. Load the default tiles.
            viewModel.loadSectionsFromString(DefaultTiles);
        }
    }
    else {
        // No cookie, load default tiles. Defined in Tiles.js
        viewModel.loadSectionsFromString(DefaultTiles);
    }

    // If we have the "add" cookie, then it means user went to app store
    // and then added some apps. The name of the apps are passed as a 
    // comma delimited cookie. So, add those tiles on the Dashboard.
    _.delay(function(){
        var addedApps = readCookie("add");
        if (!_.isEmpty(addedApps)) {
            var sections = viewModel.sections();
            var lastSection = sections[sections.length - 1];
            var sectionTiles = lastSection.tiles();
            lastSection.show();

            var tileNames = addedApps.split(",");
            _.each(tileNames, function (name) {
                if (!_.isEmpty(name)) {
                    var builder = TileBuilders[name];
                    var newTileDef = builder(_.uniqueId(name));
                    var newTile = new Tile(newTileDef, ui, viewModel);
                
                    newTile.index = sectionTiles.length;
                
                    lastSection.addTile(newTile);                    
                }
            });

            createCookie("p", viewModel.toSectionString(), 2);
            createCookie("add", "");
        }
    }, 1000);

    // Whenever tile changes due to drag & drop or removing a tile,
    // save the position of the tiles in the cookie.
    viewModel.onTileOrderChange = function () {
        var newOrder = viewModel.toSectionString();
        if (newOrder !== DefaultTiles) {
            createCookie("p", newOrder, 2);

            if (!window.currentUser.isAnonymous) {
                $.get("ServerStuff/SaveTiles.aspx");
            }
        }
    }

    $(window).resize(function () {
        viewModel.resize();
    });

    // Mouse wheel behavior for side scrolling.
    $("body").on("mousewheel", function (event, delta, deltaX, deltaY) {
        if ($(document).height() <= $(window).height())
            window.scrollBy(-delta * 50, 0);
    });

    $("#navbar").tooltip({
        title: "I am still here. Come here to go back to Dashboard",
        animate: true,
        placement: 'bottom',
        trigger: 'manual'
    });


    // Handles browser back button. When user presses the back button,
    // it detects it and closes the current app.
    $(window).hashchange(function () {
        var hash = location.hash;

        if (hash == "" || hash == "#") {
            if (viewModel.appRunning)
                viewModel.closeApp();
        }
    })

    // The google search bar behavior on the navigation bar.
    $('#googleSearchText').keypress(function (e) {
        if (e.keyCode == 13)
            $('#googleForm').submit();
    });

    // Supports only IE 9+, Chrome, Firefox, Safari
    if ($.browser.msie && parseInt($.browser.version) < 9)
        $("#browser_incompatible").show();

});