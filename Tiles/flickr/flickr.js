/// <reference path="../../js/Underscore.js" />
/// <reference path="../../js/jquery-1.7.2.min.js" />
// Copyright 2012 Omar AL Zabir
// Part of Droptiles project.



function flickr_load(tile, div) {
    var url = "http://api.flickr.com/services/feeds/photos_public.gne?lang=en-us&format=json&tags=nature&jsoncallback=?";
    
    $.getJSON(url, function (data) {        
        var ctr = 0;
        $.each(data.items.reverse(), function (i, item) {
            if (item.tags.length < 150) {
                var sourceSquare = item.media.m;
                var sourceOrig = (item.media.m).replace("_m.jpg", ".jpg");

                var htmlString = '<div class="flickr_item"> <a target="_blank" href="' + sourceOrig +
                    '" class="link" title="' + item.title + '">';
                htmlString += '<img title="' + item.title +
                    '" src="' + sourceSquare + '" ';
                htmlString += 'alt="' + item.title +
                    '" />';
                htmlString += '</a><div class="flickr_title">' + item.title + '</div>' +
                    '</div>';

                tile.slides.push(htmlString);

                ctr = ctr + 1;
            }
        });

        tile.counter(ctr);
    });
    
}

