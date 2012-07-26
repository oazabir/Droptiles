/// <reference path="../../../js/jquery-1.7.2.min.js" />

$(document).ready(function () {
    var url = "http://api.flickr.com/services/feeds/groups_pool.gne?id=1642523@N22&format=json&jsoncallback=?";

    $.getJSON(url, function (data) {
        var ctr = 0;

        var htmlString = "<table><tr>";

        $.each(data.items.reverse(), function (i, item) {
            if (item.tags.length < 150) {
                var sourceSquare = item.media.m;
                var sourceOrig = (item.media.m).replace("_m.jpg", ".jpg");

                htmlString += '<td class="flickr_item">'
                    +'<a target="_blank" href="' + item.link + '" class="link" title="' + item.title + '">';
                htmlString += '<img title="' + item.title +
                    '" src="' + sourceOrig + '" ';
                htmlString += ' alt="' + item.title +
                    '" />';
                htmlString += '</a><div class="flickr_title">' + item.title + '</div>' +
                    '</td>';

                //$('#images').append($(htmlString));

                ctr = ctr + 1;
            }

            
        });
        htmlString += "</tr></table>";
        $('#images').append($(htmlString));
        
        $('#images').find("img").each(function (item) {
            $(item).load(function () {
                $(this).fadeIn();
            });
        });
    });
});