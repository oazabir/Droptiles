// Copyright 2012 Omar AL Zabir
// Part of Droptiles project.
// This file holds the definition of tiles and which tiles appear by default 
// to new visitors. 


// The default tile setup offered to new users.
window.DefaultTiles = [
    {
        name :"Section1",
        tiles: [
           { id: "flickr1", name:"flickr" },
           //{ id: "amazon1", name:"amazon" },
           { id: "news1", name: "news" },
           { id: "reader1", name: "reader" },        
           { id: "weather1", name: "weather" },
           { id: "cuttherope1", name: "cutTheRope" },
           //{ id: "calendar1", name: "calendar" },
           { id: "myblog1", name: "myblog" },		   
           { id: "feature1", name: "feature" },
           { id: "angrybirds1", name: "angrybirds" }
           //{ id: "facebook1", name: "facebook" }
           
        ]
    },
    {
        name: "Section2",
        tiles: [
           { id: "video1", name: "video" },
           { id: "wikipedia1", name: "wikipedia" },           
           //{ id: "email1", name: "email" },
           //{ id: "maps1", name: "maps" },
           { id: "facebook1", name: "facebook" },
           { id: "ie1", name: "ie" },
           { id: "dynamicTile1", name: "dynamicTile" },
           { id: "buy1", name: "buy" }]
    },
    {
        name: "Section3", tiles: [
            
           //{ id: "youtube1", name: "youtube" },
           //{ id: "ie1", name: "ie" }
           { id: "howto1", name: "howto" }           
        ]
    }
];


// Convert it to a serialized string
window.DefaultTiles = _.map(window.DefaultTiles, function (section) {
    return "" + section.name + "~" + (_.map(section.tiles, function (tile) {
        return "" + tile.id + "," + tile.name;
    })).join(".");
}).join("|");
        

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
            scriptSrc: ["Tiles/weather/jQuery.simpleWeather.js", "Tiles/weather/weather.js"],
            cssSrc: ["Tiles/weather/weather.css"],
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
            name: "video",
            size: "tile-double",
            color: "bg-color-darken",
            iconSrc: "img/Youtube.png",
            slides: ['<iframe width="310" height="174" src="http://youtube.com/embed/g4iD-9GSW-0" frameborder="0" allowfullscreen=""></iframe>']
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
            appUrl: "Tiles/flickr/app/FlickrApp.html",
            cssSrc: ["Tiles/flickr/flickr.css"],
            scriptSrc: ["Tiles/flickr/flickr.js?v=1"],
            //scriptSrc: ["Tiles/flickr/flickr_interesting.js"],
            //cssSrc: ["Tiles/flickr/flickr_interesting.css"],            
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
            name: "youtube",
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
            tileImage: "img/AngryBirds.jpg",
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
            scriptSrc: ["Tiles/news/news.js?v=1"],
            cssSrc: ["Tiles/news/news.css?v=1"],
            initFunc: "load_news",
            initParams: { url: "http://feeds.bbci.co.uk/news/world/rss.xml" }
        };
    },

    myblog: function (uniqueId) {
        return {
            uniqueId: uniqueId,
            name: "myblog",
            label: "My Blog",
            color: "bg-color-blueDark",
            size: "tile-double",
            appUrl: "http://omaralzabir.com/",
            scriptSrc: ["Tiles/news/news.js?v=1"],
            cssSrc: ["Tiles/news/news.css?v=1"],
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
            slidesFrom: ["Tiles/features/feature1.html",
                "Tiles/features/feature2.html",
                "Tiles/features/feature3.html"],
            cssSrc: ["Tiles/features/features.css"]
        };
    },

    howto: function (uniqueId) {
        return {
            uniqueId: uniqueId,
            name: "howto",
            color: "bg-color-blue",
            size: "tile-triple tile-triple-vertical",
            appUrl: "http://oazabir.github.com/Droptiles/",
            slidesFrom: ["Tiles/features/howto.html?2"]
        };
    },

    dynamicTile: function (uniqueId) {
        return {
            uniqueId: uniqueId,
            name: "dynamicTile",
            color: "bg-color-darkBlue",
            size: "tile-triple tile-double-vertical",
            label: "Server side Tile in ASP.NET",
            slidesFrom: ["Tiles/DynamicTile/DynamicTile.aspx"]
            //cssSrc: ["Tiles/DynamicTile/visualize.css"],
            //scriptSrc: ["Tiles/DynamicTile/tablechart.js",
            //    "Tiles/DynamicTile/DynamicTile.js"],
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
            slidesFrom: ["Tiles/Buy/buy.html?v=1"],
            cssSrc: ["Tiles/Buy/buy.css"]
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