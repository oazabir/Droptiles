/// <reference path="jquery-1.7.2.min.js" />
/// <reference path="TheCore.js" />
/// <reference path="Underscore.js" />
/* ======================================
    Droptiles - Rss Reader Framework
    Copyright 2012, Omar AL Zabir

    Builds the RSS Reader experience.

======================================*/


var ui = {
    metro_sections_selector: '.metro-sections',
    metro_section_selector: '.metro-section',
    metro_section: 'metro-section',
    hover_metro_section: 'hover-metro-section',
    metro_section_overflow: 'metro-section-overflow',
    navbar: '#navbar',
    navbar_zindex: '60001',
    tile: 'tile',
    tile_content_main_selector: '.tile-content-main',
    tile_selector: '.tile',
    tile_color: 'bg-color-white',
    tile_icon_size: 'tile-icon-large',
    tile_icon_src: 'img/update.png',
    tile_subContent_color: 'bg-color-blueDark',
    tile_multi_content_selector: '.tile-multi-content',
    tile_multi_content: 'tile-multi-content',
    tile_content_slide_delay: 10000,
    tile_content_sub_selector: '.tile-content-sub',
    tile_content_sub: 'tile-content-sub',
    
    /*
        Go through all the sections and tiles and hook the dynamic
        behavior to the tiles.
    */
    attachTiles: function () {
        ko.utils.arrayForEach(viewModel.sections(), function (section) {
            ko.utils.arrayForEach(section.tiles(), function (tile) {
                tile.init($('#' + tile.uniqueId));
            });
        });
    }
};


// This is the viewModel for the entire Dashboard. The starting point.
// It takes the currentUser (defined in the Droptiles.master), the UI config (as above)
// and the TileBuilders that comes from Tiles.js.
var viewModel = new DashboardModel("News", [], window.currentUser, ui, window.TileBuilders);

$(document).ready(function () {

    // Hide the body area until it is fully loaded in order to prevent flickrs
    $('#content').css('visibility', 'visible');

    // Initiate KnockoutJS binding which creates all the tiles and binds the whole
    // UI to viewModel.
    ko.applyBindings(viewModel);

    viewModel.loadSections(window.RssTiles);

    ui.attachTiles();
    
    // Mouse wheel behavior for side scrolling.
    $("body").on("mousewheel", function (event, delta, deltaX, deltaY) {
        if ($(document).height() <= $(window).height())
            window.scrollBy(-delta * 50, 0);
    });

    
});