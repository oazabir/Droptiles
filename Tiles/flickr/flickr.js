// Copyright 2012 Omar AL Zabir
// Part of Droptiles project.

function flickr_load(tile, div) {
    var url = "http://api.flickr.com/services/feeds/photos_public.gne?lang=en-us&format=json&tags=nature&jsoncallback=?";
    var numberToDisplay = 10;

    $.getJSON(url, function (data) {        
        var ctr = 0;
        $.each(data.items, function (i, item) {

            if (ctr < numberToDisplay) {
                var sourceSquare = item.media.m;
                    //(item.media.m).replace("_m.jpg", "_s.jpg");
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

