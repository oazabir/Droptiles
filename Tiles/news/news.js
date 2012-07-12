/// <reference path="/js/jquery-1.7.2.min.js" />
/// <reference path="/js/Knockout-2.1.0.js" />
/// <reference path="/js/Underscore.js" />

// Copyright 2012 Omar AL Zabir
// Part of Droptiles project.

function load_news(tile, div) {
    google.load("feeds", "1", {
        "callback": function () {
            var feed = new google.feeds.Feed("http://feeds.bbci.co.uk/news/world/rss.xml");
            feed.setResultFormat(google.feeds.Feed.MIXED_FORMAT);
            feed.setNumEntries(10);

            tile.slides.removeAll();

            feed.load(function (result) {
                tile.counter(result.feed.entries.length);
                //console.log(result);
                if (!result.error) {
                    for (var i = 0; i < result.feed.entries.length; i++) {
                        var entry = result.feed.entries[i];

                        var html = '<div class="news_item">' +
                                            '<a target="_blank" class="news_link" href="' + entry.link + '">' + entry.title + '</a>';
                                            

                        if (entry.xmlNode != null) {
                            var thumbnails = entry.xmlNode.getElementsByTagNameNS("http://search.yahoo.com/mrss/", "thumbnail");
                            var thumbnail = _.first(thumbnails);
                            if (thumbnail != null) {
                                var imageUrl = thumbnail.attributes["url"].value;
                                html += '<div class="news_thumbnail"><img src="' + imageUrl + '" /></div>';
                            }
                        }

                        html += '<div><a class="news_detail" target="_blank" href="' + entry.link + '">' + entry.contentSnippet || entry.content + '</a></div>';
                        html += '</div>';

                        tile.slides.push(html);

                    }

                    tile.label(result.feed.title);
                }
            });
        }});
}