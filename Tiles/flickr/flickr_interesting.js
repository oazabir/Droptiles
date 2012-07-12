function flickr_load(tile, div) {
    google.load("feeds", "1", {
        "callback": function () {
            var feed = new google.feeds.Feed("http://api.flickr.com/services/feeds/groups_pool.gne?id=80641914@N00&lang=en-us&format=rss_200");

            feed.setResultFormat(google.feeds.Feed.JSON_FORMAT);
            feed.setNumEntries(10);

            feed.load(function (result) {
                tile.counter(result.feed.entries.length);
                if (!result.error) {
                    for (var i = 0; i < result.feed.entries.length; i++) {
                        var entry = result.feed.entries[i];

                        var div = document.createElement("div");
                        div.innerHTML = entry.content;
                        var pictureHtml = $(div).find("img").first().parent().html();


                        var html = '<div class="flickr_item">' +
                                        '<a target="_blank" href="' + entry.link + '">' +
                                        pictureHtml +
                                        '</a>' +
                                        '<div class="flickr_title">' + entry.title + '</div>' +
                                        '</div>';

                        tile.slides.push(html);
                    }
                }
            });
        }
    });
}