// Copyright 2012 Omar AL Zabir
// Part of Droptiles project.
// This file holds the definition of tiles and which tiles appear by default 
// to new visitors. 


// The default tile setup offered to new users.
window.AppStoreTiles = [
    {
        name: "Spotlight",
        tiles: [
           { id: "flickr1", name:"flickr" },
           { id: "angrybirds1", name: "angrybirds" },
           { id: "cuttherope1", name: "cutTheRope" }           
        ]
    },
    {
        name: "Tools",
        tiles: [
           { id: "youtube1", name: "youtube" },
           { id: "amazon1", name: "amazon" },
           { id: "library1", name: "library" },
           { id: "news1", name: "news" },
           { id: "weather1", name: "weather" }
           
        ]
    },
    {
        name: "Games",
        tiles: [
           { id: "angrybirds2", name: "angrybirds" },
           { id: "cuttherope2", name: "cutTheRope" }   
        ]
    }    
];


// Convert it to a serialized string
window.AppStoreTiles = _.map(window.AppStoreTiles, function (section) {
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
            size: "tile-double tile-double-vertical",
            tileImage: 'img/AppStore/Weather.png',
            onClick: 'addTile("weather")'
        };
    },

    amazon: function (uniqueId) {
        return {
            uniqueId: uniqueId,
            name: "amazon",
            size: 'tile-double',
            color: 'bg-color-yellow',
            iconSrc: 'img/amazon.png',
            label: 'Amazon, buy anything, from anywhere',
            onClick: 'addTile("amazon")'
        };
    },

    maps: function (uniqueId) {
        return {
            uniqueId: uniqueId,
            name: "maps",
        };
    },

    ie: function (uniqueId) {
        return {
            uniqueId: uniqueId,
            name: "ie",
            iconSrc: 'img/Internet Explorer.png',
            label: 'Internet Explorer 10'            
        };
    },

    facebook: function (uniqueId) {
        return {
            uniqueId: uniqueId,
            name: "facebook",
        };
    },

    calendar: function (uniqueId) {
        return {
            uniqueId: uniqueId,
            name: "calendar",
        };
    },

    library: function (uniqueId) {
        return {
            uniqueId: uniqueId,
            name: "library",
            iconSrc: 'img/Libraries.png',
            label: 'Library'
            
        };
    },

    skydrive: function (uniqueId) {
        return {
            uniqueId: uniqueId,
            name: "skydrive",
        };
    },

    flickr: function (uniqueId) {
        return {
            uniqueId: uniqueId,
            name: "flickr",
            size: 'tile-triple tile-triple-vertical',
            tileImage: 'img/AppStore/Flickr.png'
        };
    },

    email: function (uniqueId) {
        return {
            uniqueId: uniqueId,
            name: "email",
        };
    },

    youtube: function (uniqueId) {
        return {
            uniqueId: uniqueId,
            name: "email",
            tileImage: 'img/AppStore/YouTube.png'
        };
    },

    angrybirds: function (uniqueId) {
        return {
            uniqueId: uniqueId,
            name: "angrybirds",
            tileImage: "img/AppStore/Angrybirds.png",
            size: 'tile-double tile-double-vertical'
        };
    },

    wikipedia: function (uniqueId) {
        return {
            uniqueId: uniqueId,
            name: "wikipedia",
            iconSrc: "img/Wikipedia alt 1.png"            
        };
    },


    news: function (uniqueId) {
        return {
            uniqueId: uniqueId,
            name: "news",
            size: "tile-double tile-double-vertical",
            tileImage: 'img/AppStore/News.png'
        };
    },

    feature: function (uniqueId) {
        return {
            uniqueId: uniqueId,
            name: "feature",            
        };
    },

    dynamicTile: function (uniqueId) {
        return {
            niqueId: uniqueId,
            name: "dynamicTile",
            
        }
    },

    cutTheRope: function (uniqueId) {
        return {
            uniqueId: uniqueId,
            name: "cutTheRope",
            size: 'tile-double',
            tileImage: "img/AppStore/CutTheRope.png",
            subContent: "Feed the cute thing and win stars"
        };
    },

    buy: function (uniqueId) {
        return {
            uniqueId: uniqueId,
            name: "buy",            
        };

    }

};