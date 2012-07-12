/// <reference path="jQuery.simpleWeather.js" />
/// <reference path="../../js/jquery-1.7.2.min.js" />

// Copyright 2012 Omar AL Zabir
// Part of Droptiles project.

function load_weather(tile, div, params) {
    tile.slides.removeAll();

    $.simpleWeather({
        location: params.location,
        unit: 'c',
        success: function (weather) {
            var today = $("<div />").append(
                    $("<div />").addClass("weather")
                    .append('<h2>' + weather.city + '</h2>')
                    .append('<img src="' + weather.image + '">')
                    .append('<p>' + weather.temp + '&deg; ' + weather.units.temp + '<br /><span>' + weather.currently + '</span></p>')
                    .append('<p><a href="' + weather.link + '">View Forecast &raquo;</a></p>'))
                .html();

            tile.slides.push(today);

            var tomorrow = $("<div />").append(
                    $("<div />").addClass("weather")
                    .append('<h2>' + weather.city + '</h2>')
                    .append('<img src="' + weather.tomorrow.image + '">')
                    .append('<p class="weather_tomorrow">Tomorrow</p>')
                    .append('<p class="weather_tomorrow">H: ' + weather.tomorrow.high + '&deg; ' + weather.units.temp + ', L: ' + weather.tomorrow.low + '&deg; ' + weather.units.temp + '<br /><span>' + weather.tomorrow.forecast + '</span></p>')
                    /*.append('<p class="weather_tomorrow"><a href="' + weather.link + '">View Forecast &raquo;</a></p>')*/
                ).html();

            tile.slides.push(tomorrow);

            tile.label("");
        },
        error: function (error) {
            tile.pages.push('<p>' + error + '</p>');
        }
    });
}