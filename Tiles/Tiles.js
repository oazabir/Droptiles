// Copyright 2012 Omar AL Zabir
// Part of Droptiles project.
// This file holds the definition of tiles and which tiles appear by default 
// to new visitors. 


// The default tile setup offered to new users.
window.DefaultTiles = [
    {
        name :"Section1",
        tiles: [
           { id: "mailArticle1", name: "mainArticle" },
           { id: "newsE241", name: "newsE24" },
           { id: "skyDrive1", name: "skyDrive" },
           { id: "windows8Introduction1", name: "windows8Introduction" },
           { id: "newsVGSmall1", name: "newsVGSmall" },
           { id: "newsVGDouble1", name: "newsVGDouble" },
           { id: "weather1", name: "weather" },
           { id: "angryBirds1", name: "angryBirds" }
        ]
    },
    {
        name: "Section2",
        tiles: [
           { id: "vgTV1", name: "vgTV" },
           { id: "wikipedia1", name: "wikipedia" },
           { id: "mainArticleDouble1", name: "mainArticleDouble" },
           { id: "facebook1", name: "facebook" },
           { id: "buyWindows1", name: "buyWindows" },
           { id: "mainArticleDouble2", name: "mainArticleDouble" },
           { id: "newsVGDouble2", name: "newsVGDouble" },
           { id: "ie1", name: "ie" },
           { id: "newsVGDouble3", name: "newsVGDouble" }
        ]
    }
];


// Convert it to a serialized string
window.DefaultTiles = _.map(window.DefaultTiles, function (section) {
    return "" + section.name + "~" + (_.map(section.tiles, function (tile) {
        return "" + tile.id + "," + tile.name;
    })).join(".");
}).join("|");
        
window.TileBuilders = {
    mainArticle: function (uniqueId) {
        return {
            uniqueId: uniqueId,
            name: "mainArticle",
            color: "bg-color-darkBlue",
            label: "Article",
            size: "tile-double tile-double-vertical",
            scriptSrc: ["tiles/news/news.js?v=1"],
            cssSrc: ["tiles/news/news.css?v=1"],
            initFunc: "load_news",
            initParams: { url: "http://www.vg.no/drfront/hovedlopet/front-86.xml" }
        };
    },
    newsE24: function (uniqueId) {
        return {
            uniqueId: uniqueId,
            name: "newsE24",
            color: "bg-color-red",
            label: "E24",
            size: "tile-double",
            scriptSrc: ["tiles/news/news.js?v=1"],
            cssSrc: ["tiles/news/news.css?v=1"],
            initFunc: "load_news",
            initParams: { url: "http://www.vg.no/rss/nyfront.php?frontId=1" }
        };
    },
    skyDrive: function (uniqueId) {
        return {
            uniqueId: uniqueId,
            name: "skyDrive",
            iconSrc: "img/tiles/icon-skydrive.png",
            label: "Skydrive",
            appUrl: "http://www.skydrive.com/"
        };
    },
    windows8Introduction: function (uniqueId) {
        return {
            uniqueId: uniqueId,
            name: "windows8Introduction",
            size: "tile-double",
            color: "bg-color-blueDark",
            appUrl: "http://windows.microsoft.com/en-US/windows-8/release-preview",
            slidesFrom: ["tiles/features/feature1.html",
                "tiles/features/feature2.html",
                "tiles/features/feature3.html"],
            cssSrc: ["tiles/features/features.css"]
        };
        
    },
    newsVGSmall: function (uniqueId) {
        return {
            uniqueId: uniqueId,
            name: "newsVGSmall",
            color: "bg-color-greenDark",
            scriptSrc: ["tiles/news/news.js?v=1"],
            cssSrc: ["tiles/news/news.css?v=1"],
            initFunc: "load_news",
            initParams: { url: "http://www.vg.no/rss/nyfront.php?frontId=1" }
        };
    },
    newsVGDouble: function (uniqueId) {
        return {
            uniqueId: uniqueId,
            name: "newsVGDouble",
            color: "bg-color-green",
            label: "VG News",
            size: "tile-double",
            scriptSrc: ["tiles/news/news.js?v=1"],
            cssSrc: ["tiles/news/news.css?v=1"],
            initFunc: "load_news",
            initParams: { url: "http://www.vg.no/rss/nyfront.php?frontId=1" }
        };
    },
    weather: function (uniqueId) {
        return {
            uniqueId: uniqueId,
            name: "weather",
            color: "bg-color-purple",
            label: "Weather",
            appTitle: "Weather App",
            appUrl: "http://weather.yahoo.com/norway/oslo-fylke/oslo-862592/",
            size: "tile-double",
            scriptSrc: ["tiles/weather/jQuery.simpleWeather.js", "tiles/weather/weather.js"],
            cssSrc: ["tiles/weather/weather.css"],
            initFunc: "load_weather",
            initParams: {
                location: 'Oslo, Norway'
            }
        };
    },
    angryBirds: function (uniqueId) {
        return {
            uniqueId: uniqueId,
            name: "angryBirds",
            tileImage: "img/Angrybirds.jpg",
            appUrl: "http://chrome.angrybirds.com/"
        };
    },
    vgTV: function (uniqueId) {
        return {
            uniqueId: uniqueId,
            name: "vbTV",
            size: "tile-double",
            iconSrc: "img/tiles/icon-vgtv.png",
            appUrl: "http://www.vgtv.no/"
        };
    },
    wikipedia: function (uniqueId) {
        return {
            uniqueId: uniqueId,
            name: "wikipedia",
            iconSrc: "img/tiles/icon-wikipedia.png",
            label: "Wikipedia",
            color: "bg-color-green",
            appIcon: "img/loadingscreens/icon-wikipedia.png",
            appUrl: "http://www.wikipedia.org"
        };
    },

    buyWindows: function (uniqueId) {
        return {
            uniqueId: uniqueId,
            name: "buyWindows",
            iconSrc: "img/tiles/icon-cart.png",
            label: "Buy Windows 8",
            color: "bg-color-blueDark",
            appIcon: "img/loadingscreens/icon-cart.png",
            appUrl: "http://buywindows8.com/"
        };
    },
    facebook: function (uniqueId) {
        return {
            uniqueId: uniqueId,
            name: "facebook",
            iconSrc: "img/tiles/icon-facebook.png",
            label: "Facebook",
            size: "tile-double",
            color: "bg-color-blueDark",
            appUrl: "http://www.facebook.com/",
            appInNewWindow: true
        };
    },
    ie: function (uniqueId) {
        return {
            uniqueId: uniqueId,
            name: "ie",
            iconSrc: "img/tiles/icon-ie.png",
            label: "Internet Explorer 10",
            appUrl: "http://ie.microsoft.com/testDrive/"
        };
    },
    mainArticleDouble: function (uniqueId) {
        return {
            uniqueId: uniqueId,
            name: "mainArticleDouble",
            color: "bg-color-blue",
            label: "Article",
            size: "tile-double",
            scriptSrc: ["tiles/news/news.js?v=1"],
            cssSrc: ["tiles/news/news.css?v=1"],
            initFunc: "load_news",
            initParams: { url: "http://www.vg.no/drfront/hovedlopet/front-86.xml" }
        };
    }
};


/*
// Definition of the tiles, their default values.
window.TileBuilders = {

    weather: function (uniqueId) {
        return {
            uniqueId: uniqueId,
            name: "weather",
            color: "bg-color-blue",
            label: "Weather",
            appTitle: "Weather App",
            appUrl: "http://www.bbc.co.uk/weather/",
            size: "tile-double",
            scriptSrc: ["tiles/weather/jQuery.simpleWeather.js", "tiles/weather/weather.js"],
            cssSrc: ["tiles/weather/weather.css"],
            initFunc: "load_weather",
            initParams: {
                location: 'London, UK'
            }
        };
    },

    amazon: function (uniqueId) {
        return {
            uniqueId: uniqueId,
            name: "amazon",
            color: "bg-color-yellow",
            label: "Amazon",
            iconSrc: "img/Amazon alt.png",
            appTitle: "Amazon",
            appUrl: "http://www.amazon.com",
            size: "tile-double-vertical",
            iconSrc: "img/Amazon.png"
        };
    },

    maps: function (uniqueId) {
        return {
            uniqueId: uniqueId,
            name: "maps",
            color: "bg-color-purple",
            label: "Maps",
            appTitle: "Maps",
            appUrl: "http://maps.google.com/",
            iconSrc: "img/Google Maps.png",
            appInNewWindow: true
        };
    },

    ie: function (uniqueId) {
        return {
            uniqueId: uniqueId,
            name: "ie",
            iconSrc: "img/Internet%20Explorer.png",
            label: "Internet Explorer",
            appUrl: "http://ie.microsoft.com/testDrive/"
        };
    },

    video: function (uniqueId) {
        return {
            uniqueId: uniqueId,
            name: "ie",
            size: "tile-double",
            color: "bg-color-darken",
            iconSrc: "img/Youtube.png",
            slides: ['<iframe width="310" height="174" src="http://www.youtube.com/embed/IO45ZiGql8E" frameborder="0" allowfullscreen=""></iframe>']
        };
    },

    facebook: function (uniqueId) {
        return {
            uniqueId: uniqueId,
            name: "facebook",
            iconSrc: "img/Facebook alt 3.png",
            label: "Facebook",
            color: "bg-color-blueDark",
            appUrl: "http://www.facebook.com/",
            appInNewWindow: true
        };
    },

    calendar: function (uniqueId) {
        return {
            uniqueId: uniqueId,
            name: "calendar",
            iconSrc: "img/Calendar.png",
            label: "Calendar",
            size: "tile-double",
            color: "bg-color-green",
            appUrl: "http://www.google.com/calendar/",
            appInNewWindow: true
        };
    },

    library: function (uniqueId) {
        return {
            uniqueId: uniqueId,
            name: "library",
            iconSrc: "img/Libraries.png",
            label: "Library",
            color: "bg-color-orange",
            appUrl: "http://www.londonlibrary.co.uk/"
        };
    },

    skydrive: function (uniqueId) {
        return {
            uniqueId: uniqueId,
            name: "skydrive",
            iconSrc: "img/Live SkyDrive.png",
            label: "Skydrive",
            appUrl: "http://www.skydrive.com/"
        };
    },

    flickr: function (uniqueId) {
        return {
            uniqueId: uniqueId,
            name: "flickr",
            iconSrc: "img/Flickr alt 1.png",
            label: "Flickr",
            size: "tile-double tile-double-vertical",
            color: "bg-color-darken",
            appUrl: "Tiles/Flickr/App/FlickrApp.html",
            cssSrc: ["tiles/flickr/flickr.css"],
            scriptSrc: ["tiles/flickr/flickr.js?v=1"],
            //scriptSrc: ["tiles/flickr/flickr_interesting.js"],
            //cssSrc: ["tiles/flickr/flickr_interesting.css"],            
            initFunc: "flickr_load"
        };
    },

    email: function (uniqueId) {
        return {
            uniqueId: uniqueId,
            name: "email",
            iconSrc: "img/Gmail Alt.png",
            label: "Gmail",
            color: "bg-color-pink",
            appUrl: "http://www.gmail.com/",
            appInNewWindow: true
        };
    },

    youtube: function (uniqueId) {
        return {
            uniqueId: uniqueId,
            name: "email",
            iconSrc: "img/Youtube.png",
            label: "Youtube",
            color: "bg-color-darken",
            appUrl: "http://www.youtube.com/",
            appInNewWindow: true
        };
    },

    angrybirds: function (uniqueId) {
        return {
            uniqueId: uniqueId,
            name: "angrybirds",
            tileImage: "img/Angrybirds.jpg",
            appUrl: "http://chrome.angrybirds.com/"
        };
    },

    wikipedia: function (uniqueId) {
        return {
            uniqueId: uniqueId,
            name: "wikipedia",
            tileImage: "img/Wikipedia alt 1.png",
            label: "Wikipedia",
            color: "bg-color-green",
            appIcon: "img/Wikipedia alt 1.png",
            appUrl: "http://www.wikipedia.org"
        };
    },


    news: function (uniqueId) {
        return {
            uniqueId: uniqueId,
            name: "news",
            color: "bg-color-pink",
            size: "tile-double",
            appUrl: "http://www.bbc.co.uk/news/world/",
            scriptSrc: ["tiles/news/news.js?v=1"],
            cssSrc: ["tiles/news/news.css?v=1"],
            initFunc: "load_news",
            initParams: { url: "http://feeds.bbci.co.uk/news/world/rss.xml" }
        };
    },

    myblog: function (uniqueId) {
        return {
            uniqueId: uniqueId,
            name: "news",
            label: "My Blog",
            color: "bg-color-blueDark",
            size: "tile-double",
            appUrl: "http://omaralzabir.com/",
            scriptSrc: ["tiles/news/news.js?v=1"],
            cssSrc: ["tiles/news/news.css?v=1"],
            initFunc: "load_news",
            initParams: { url: "http://omaralzabir.com/feed" }
        };
    },

    feature: function (uniqueId) {
        return {
            uniqueId: uniqueId,
            name: "feature",
            color: "bg-color-green",
            size: "tile-double",
            appUrl: "http://oazabir.github.com/Droptiles/",
            slidesFrom: ["tiles/features/feature1.html",
                "tiles/features/feature2.html",
                "tiles/features/feature3.html"],
            cssSrc: ["tiles/features/features.css"]
        };
    },

    howto: function (uniqueId) {
        return {
            uniqueId: uniqueId,
            name: "feature",
            color: "bg-color-blue",
            size: "tile-triple tile-triple-vertical",
            appUrl: "http://oazabir.github.com/Droptiles/",
            slidesFrom: ["tiles/features/howto.html?2"]
        };
    },

    dynamicTile: function (uniqueId) {
        return {
            uniqueId: uniqueId,
            name: "dynamicTile",
            color: "bg-color-darkBlue",
            size: "tile-triple tile-double-vertical",
            label: "Server side Tile in ASP.NET",
            slidesFrom: ["tiles/DynamicTile/DynamicTile.aspx"]
            //cssSrc: ["tiles/DynamicTile/visualize.css"],
            //scriptSrc: ["tiles/DynamicTile/tablechart.js",
            //    "tiles/DynamicTile/DynamicTile.js"],
            //initFunc: "load_dynamic"
        }
    },

    cutTheRope: function (uniqueId) {
        return {
            uniqueId: uniqueId,
            name: "cutTheRope",
            tileImage: "img/CutTheRope.png",
            appUrl: "http://www.cuttherope.ie/"
        };
    },

    buy : function (uniqueId) {
        return {
            uniqueId: uniqueId,
            name: "buy",
            color: "bg-color-blueDark",
            size: 'tile-double tile-double-vertical',
            slidesFrom: ["tiles/buy/buy.html?v=1"],
            cssSrc: ["tiles/buy/buy.css"]
        };       
    },
    
    reader: function (uniqueId) {
        return {
            uniqueId: uniqueId,
            name: "reader",
            color: "bg-color-red",
            label: "News Reader",
            iconSrc: 'img/Google Reader.png',
            appUrl: 'RssReader.aspx'
        };
    }
        
};
*/