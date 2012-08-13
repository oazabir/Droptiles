/// <reference path="jquery-1.7.2.min.js" />
/// <reference path="TheCore.js" />
/// <reference path="cookie.js" />
/// <reference path="Underscore.js" />

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


// This is the viewModel for the App Store. 
var viewModel = new DashboardModel("App Store", [], window.currentUser, ui);

$(document).ready(function () {

    // Hide the body area until it is fully loaded in order to prevent flickrs
    $('#content').css('visibility', 'visible');

    // Initiate KnockoutJS binding which creates all the tiles and binds the whole
    // UI to viewModel.
    ko.applyBindings(viewModel);

    viewModel.loadSectionsFromString(window.AppStoreTiles, window.TileBuilders);

    createCookie("add", "");

    ko.utils.arrayForEach(viewModel.sections(), function(section) {
        ko.utils.arrayForEach(section.tiles(), function(tile) {
            var div = $('#' + tile.uniqueId);
            div.click(function () {
                if (div.toggleClass("selected").hasClass("selected")) {
                    div.tooltip({
                        title: 'The app is added. Go back to Dashboard',
                        trigger: 'manual',
                        location: 'top'
                    });

                    _.defer(function () {
                        div.tooltip('show');
                        _.delay(function () {
                            div.tooltip("hide");
                        }, 5000);
                    });
                }
                else {
                }

                var cookie = readCookie("add") + "";

                var tiles = cookie.split(",");
                if (_.contains(tiles, tile.name))
                    tiles = _.filter(tiles, function (t) { return t != tile.name; })
                else
                    tiles.push(tile.name);

                createCookie("add", tiles.join(","));

                return false;
            });
        });
    });

    // Mouse wheel behavior for side scrolling.
    $("body").on("mousewheel", function (event, delta, deltaX, deltaY) {
        window.scrollBy(-delta * 50, 0);
    });

});