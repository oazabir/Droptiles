/// <reference path="jquery-1.7.2.min.js" />
/// <reference path="jQueryEnhancement.js" />
/// <reference path="Knockout-2.1.0.js" />
/// <reference path="Underscore.js" />

// Copyright 2012 Omar AL Zabir
// This is part of Droptiles open source project.

var Tile = function (param, ui) {
    var self = this;

    this.uniqueId = param.uniqueId;
    this.name = param.name;
    this.index = param.index || 0;
    this.size = param.size || "";
    this.color = param.color || ui.tile_color;
    this.additionalClass = param.additionalClass || "";
    this.tileImage = param.tileImage || "";

    this.cssSrc = param.cssSrc || [];
    this.scriptSrc = param.scriptSrc || [];
    this.initFunc = param.initFunc || "";
    this.initParams = param.initParams || {};
    this.slidesFrom = param.slidesFrom || [];

    this.appTitle = param.appTitle || "";
    this.appUrl = param.appUrl || "";
    this.appInNewWindow = param.appInNewWindow || false;

    this.iconStyle = param.iconStyle || ui.tile_icon_size;
    this.iconAdditionalClass = param.iconAdditionalClass || "";
    this.iconSrc = param.iconSrc || ui.tile_icon_src;
    this.appIcon = param.appIcon || this.iconSrc;

    this.label = ko.observable(param.label || "");
    this.counter = ko.observable(param.counter || "");
    this.subContent = ko.observable(param.subContent || "");
    this.subContentColor = param.subContentColor || ui.tile_subContent_color;

    this.slides = ko.observableArray(param.slides || []);

    this.tileClasses = ko.computed(function () {
        return [ui.tile,
            this.size,
            this.color,
            this.additionalClass,
            (this.slides().length > 0 ? ui.tile_multi_content : "")].join(" ");
        ;
    }, this);

    this.hasIcon = ko.computed(function () {
        return this.iconSrc.length > 0;
    }, this);

    this.iconClasses = ko.computed(function () {
        return [this.iconStyle, this.iconAdditionalClass].join(" ");
    }, this);

    this.hasLabel = ko.computed(function () {
        return this.label().length > 0;
    }, this);

    this.hasCounter = ko.computed(function () {
        return this.counter().length > 0;
    }, this);

    this.hasSubContent = ko.computed(function () {
        return this.subContent().length > 0;
    }, this);

    this.subContentClasses = ko.computed(function () {
        return [ui.tile_content_sub, this.subContentColor].join(" ");
    }, this);

    this.attach = function (div) {
        var el = $(div);
        el.unbind("mouseenter mouseleave");
        el.mouseenter(function () {
            el = $(this);
            if (el.hasClass(ui.tile_multi_content_selector)) {
                var c_sub = $(ui.tile_content_sub, el);
                c_sub.animate({ "height": ui.subcontent_height, "opacity": 1 }, 200);
            }
        }).mouseleave(function () {
            el = $(this);
            if (el.hasClass(ui.tile_multi_content_selector)) {
                var c_sub = $(ui.tile_content_sub_selector, el);
                c_sub.animate({ "height": 0, "opacity": 0 }, 200);
            }
        });
        if (!_.isEmpty(self.appUrl)) {
            el.click(function (event) {
                if (event.target.nodeName !== "A" && event.target.parentNode.nodeName !== "A") {
                    if (self.appInNewWindow) {
                        var open_link = window.open('', '_blank');
                        open_link.location = self.appUrl;
                    }
                    else if ($(this).data("noclick") !== true) {
                        self.launch();
                    }
                }
            });
        }

        if (_.isArray(self.cssSrc)) {
            var head = $('head');
            _.each(self.cssSrc, function (url) {
                $("<link>")
                  .appendTo(head)
                  .attr({ type: 'text/css', rel: 'stylesheet' })
                  .attr('href', url);
            });
        }

        if (!_.isEmpty(self.slidesFrom)) {
            $.get((_.isArray(self.slidesFrom) ? self.slidesFrom : [self.slidesFrom]),
                function (slides) {
                    _.each(slides, function (slide) {
                        self.slides.push(slide);
                    });
                    self.loadScripts(div);
                });
        }
        else {
            self.loadScripts(div);
        }
    }

    this.loadScripts = function (div) {
        if (!_.isEmpty(self.scriptSrc)) {
            $.getScript(self.scriptSrc, function () {
                if (!_.isEmpty(self.initFunc)) {
                    var func = eval(self.initFunc);
                    if (_.isFunction(func))
                        func(self, div, self.initParams);
                    else {
                        //console.log("Not a function: " + self.initFunc);
                    }
                }
            })
        }
    }

    this.launch = function () {
        var tileDiv = $('#' + self.uniqueId);
        var clone = $("<div/>")
            .addClass(self.tileClasses())
            .css({
                'position': 'absolute',
                'left': tileDiv.offset().left,
                'top': tileDiv.offset().top,
                'width': tileDiv.width() + "px",
                'height': tileDiv.height() + "px",
                'z-index': ui.splash_screen_zindex
            })
            .appendTo(document.body)
            .animate({
                left: $(window).scrollLeft(),
                top: $(window).scrollTop(),
                width: "100%",
                height: "100%"
            }, 500, function () {
                viewModel.launchApp(self.name, self.appTitle, self.appUrl, function () {
                    clone.fadeOut();
                });
            })
            .append(
                $('<img />')
                    .attr('src', self.appIcon)
                    .addClass(self.iconClasses())
                    .css({
                        'position': 'absolute',
                        'left': ($(window).width() - 512) / 2,
                        'top': ($(window).height() - 512) / 2
                    })
            );


    }
};

var Section = function (section) {
    var self = this;

    this.name = ko.observable(section.name);
    this.uniqueId = _.uniqueId('section_');
    this.tiles = ko.observableArray(section.tiles);

    this.sortedTiles = ko.computed(function () {
        return self.tiles().sort(function (left, right) {
            return left.index == right.index ? 0 :
                (left.index < right.index ? -1 : 1)
        });
    }, this);

    this.getTilesSorted = function () {
        return self.tiles().sort(function (left, right) {
            return left.index == right.index ? 0 :
                (left.index < right.index ? -1 : 1)
        });
    }

    this.getTile = function(uniqueId) {
        return ko.utils.arrayFirst(self.tiles(), function(tile) {
            return tile.uniqueId == uniqueId;
        });
    }

};

var DashboardModel = function (title, sections, user, ui, tileBuilder) {
    var self = this;

    this.appRunning = false;
    this.currentApp = "";
    this.user = ko.observable(user);
    this.title = ko.observable(title);
    this.sections = ko.observableArray(sections);

    this.timerId = 0;

    this.onTileOrderChange = function () { }

    this.addTile = function (tile) {
        self.sections()[0].tiles.push(tile);
        self.makeTile($('#' + tile.uniqueId));
        self.reflow();
    }

    this.removeTile = function (id) {
        var tile = self.getTile(id);
        ko.utils.arrayForEach(self.sections(), function (section) {
            //ko.utils.arrayRemoveItem(section.tiles(), tile);
            section.tiles.remove(tile);
        });
        $('#' + tile.uniqueId).remove();
        return tile;
    }

    this.getTile = function (id) {
        var foundTile = null;
        ko.utils.arrayFirst(self.sections(), function (section) {
            foundTile = ko.utils.arrayFirst(section.tiles(), function (item) {
                return item.uniqueId == id;
            });
            return foundTile != null;
        });
        return foundTile;
    }

    this.resize = function () {
        //self.resetTiles();
        //self.reflow();
    }

    this.init = function () {
        self.attachTiles();
        //self.reflow();
        self.makeSortable();
        self.animateTiles();
        self.subscribeToChange();
        _.delay(self.showMetroSections, 1000);
    }

    this.subscribeToChange = function () {
        ko.utils.arrayForEach(self.sections(), function (section) {
            section.tiles.subscribe(function () {
                self.onTileOrderChange();
            });
        });

    }

    this.loadSectionsFromString = function (tileSerialized) {
        // Format: Section1~weather1,weather.youtube1,youtube|Section2~ie1,ie.

        var sections = ("" + tileSerialized).split("|");
        var sectionArray = [];

        _.each(sections, function (section) {
            var sectionName = _.string.strLeft(section, '~');

            var tiles = _.string.strRight(section, '~').split(".");

            var sectionTiles = [];

            var index = 0;
            _.each(tiles, function (tile) {
                if (tile.length > 0) {
                    var tileId = _.string.strLeft(tile, ",");
                    var tileName = _.string.strRight(tile, ",");

                    if (tileName.length > 0) {
                        var builder = tileBuilder[tileName];
                        if (builder == null) {
                            //console.log("No builder found for tile: " + tileName);
                        }
                        else {
                            var tileParams = builder(tileId);
                            var newTile = new Tile(tileParams, ui);
                            newTile.index = index++;
                            sectionTiles.push(newTile);
                        }
                    }
                }
            });

            var newSection = new Section({
                name: sectionName,
                tiles: sectionTiles
            });
            sectionArray.push(newSection);

        });


        self.hideMetroSections();
        self.sections(sectionArray);
        self.init();
    }

    this.toSectionString = function () {
        // Format: Section1~weather1,weather.youtube1,youtube|Section2~ie1,ie.

        return ko.utils.arrayMap(self.sections(), function (section) {
            return section.name() + "~" +
                ko.utils.arrayMap(section.getTilesSorted(), function (tile) {
                    return tile.uniqueId + "," + tile.name;
                }).join(".");
        }).join("|");
    }

    this.hideMetroSections = function () {
        $(ui.metro_sections_selector).hide();
    }

    this.showMetroSections = function () {

        $(ui.metro_sections_selector)
            .css({
                'margin-left': 50,
                'margin-top': 20,
                'opacity': 0
            })
            .show()
            .animate({
                'margin-left': 0,
                'opacity': 1
            }, 1000, 'swing');
    }

    this.launchApp = function (id, title, url, loaded) {

        self.hideMetroSections();

        self.appRunning = true;
        self.currentApp = url;

        var iframe = $('<iframe id="' + ui.app_iframe_id + '" frameborder="no" />')
           .css({
               'position': 'absolute',
               'left': "0",
               'top': "0px",
               'width': '100%',
               'height': '100%',
               'z-index': ui.app_iframe_zindex,
               'visibility': 'hidden',
               'background-color': 'white'
           })
           .appendTo(document.body)
           .attr({ 'src': url })
           .load(function () {
               self.hideNavBar();
               loaded();
               $(this).css('visibility', 'visible');
           });


        location.hash = id;
    }

    this.closeApp = function () {
        $('#' + ui.app_iframe_id).remove();
        self.showNavBar();

        this.appRunning = false;
        this.currentApp = "";

        self.showMetroSections();

        location.hash = "";
    }

    this.hideNavBar = function () {
        var navbar = $(ui.navbar);
        navbar
            .css("z-index", ui.navbar_zindex)
            .delay(3000)
            .animate({
                top: -(navbar.height() - 5) + "px"
            }, function () {
                $('#navbar').tooltip('show');
                _.delay(function () {
                    $('#navbar').tooltip('hide');
                }, 10000);
            }).bind("mouseenter", function () {
                navbar
                    .stop(true, true)
                    .animate({
                        top: "0px"
                    });
            }).bind("mouseleave", function () {
                navbar
                    .stop(true, true)
                    .delay(3000)
                    .animate({
                        top: -(navbar.height() - 5) + "px"
                    });
            });
    }

    this.showNavBar = function () {
        var navbar = $(ui.navbar);
        navbar
            .unbind("mouseenter mouseleave")
            .animate({
                top: "0px"
            });
    }

    this.fullscreenAppClosed = function () {
        self.showMetroSections();
    }

    this.animateTiles = function () {
        window.clearInterval(self.timerId);
        self.timerId = window.setInterval(function () {
            $(ui.tile_selector).each(function () {
                var el = $(this);
                var slides = $(ui.tile_content_main_selector, el);
                if (slides.length > 0) {
                    var slideIndex = el.data("slideIndex") || 1;
                    if (slideIndex == slides.length) {
                        slideIndex = 0;
                    }
                    var firstPage = slides.first();
                    firstPage.animate({ marginTop: -(slideIndex * firstPage.height()) }, 500);
                    el.data("slideIndex", ++slideIndex);
                }
            });
        }, ui.tile_content_slide_delay);
    }

    //this.resetTiles = function () {
    //    var dynamicSection = $(ui.metro_section_selector + '+.' + ui.metro_section_overflow).each(function () {
    //        var section = $(this);
    //        var prevSection = section.prev();
    //        $(ui.tile_selector, section).appendTo(prevSection);
    //        section.remove();
    //    });
    //}

    this.attachTiles = function (tiles) {
        ko.utils.arrayForEach(self.sections(), function (section) {
            ko.utils.arrayForEach(section.tiles(), function (tile) {
                tile.attach($('#' + tile.uniqueId));
            });
        });
    }

    this.makeSortable = function () {
        $(ui.trash).droppable({
            tolerance: 'touch',
            over: function (event, o) {
                $(this).animate({ "zoom": "1.5" });
            },
            out: function (event, o) {
                $(this).animate({ "zoom": "1.0" });
            },
            drop: function (event, o) {
                $(this).animate({ "zoom": "1.0" });
                var tileId = o.draggable[0].id;
                self.removeTile(tileId);
            }
        });

        $(ui.metro_section_selector).sortable({
            connectWith: ui.metro_section_selector,
            revert: true,
            distance: 10,
            tolerance: "pointer",
            "opacity": 0.6,
            start: function (event, o) {
                o.item.data("noclick", true);
                $(ui.trash).fadeIn();
            },
            stop: function (event, o) {
                //console.log(o);
                o.item.data("noclick", false);
                $(ui.trash).fadeOut();

                self.recalcIndex();
                self.onTileOrderChange();

                //self.reflow();
                return true;
            }
        });
    }

    this.getSection = function (uniqueId) {
        return ko.utils.arrayFirst(self.sections(), function (section) {
            return section.uniqueId == uniqueId;
        });
    }

    this.recalcIndex = function () {
        $(ui.metro_section_selector).each(function (sectionIndex, sectionDiv) {
            var section = self.getSection(sectionDiv.id);
            $(ui.tile_selector, sectionDiv).each(function (index, tileDiv) {
                var tileId = tileDiv.id;
                var tileObject = section.getTile(tileId);
                if (tileObject != null) {
                    tileObject.index = index;
                }
                else {
                    var tileFromSomewhere;
                    var containingSection = ko.utils.arrayFirst(self.sections(), function (s) {
                        tileFromSomewhere = ko.utils.arrayFirst(s.tiles(), function (t) {
                            return t.uniqueId == tileId;
                        });
                        return tileFromSomewhere != null;
                    });
                    if (containingSection != null) {
                        containingSection.tiles.remove(tileFromSomewhere);
                    }
                    if (tileFromSomewhere != null) {
                        section.tiles.splice(index, 0, tileFromSomewhere);
                        tileFromSomewhere.index = index;
                        $(tileDiv).remove();
                    }
                }

            });
        });
    }

    //this.reflow = function (fromIndex) {
    //    var metroSectionHeight = $(window).height(); 

    //    $(ui.tile_selector).slice(fromIndex | 0).each(function (index, item) {
    //        var tile = $(item);
    //        var pos = tile.offset();

    //        if (tile.index() > 0 && (pos.top + tile.height()) > metroSectionHeight) {
    //            var mySection = tile.parents(ui.metro_section_selector);
    //            var nextSection = mySection.next();

    //            // If the next section isn't a dynamically created section especially
    //            // made to hold overflowing tiles, then move the tiles to that section.
    //            // otherwise make a new dynamic section.
    //            if (nextSection.length > 0 && nextSection.hasClass(ui.metro_section_overflow)) {
    //                nextSection.prepend(tile);
    //                return _.delay(function () {
    //                    reflow(index + 1)
    //                }, 100);
    //            }
    //            else {
    //                nextSection = $('<div />').addClass(ui.metro_section).addClass(ui.metro_section_overflow);
    //                nextSection.insertAfter(mySection);
    //                //nextSection.appendTo(mySection.parent());
    //                nextSection.prepend(tile);

    //                return _.delay(function () {
    //                    reflow(index + 1)
    //                }, 100);
    //            }
    //        }
    //    });

    //    self.makeSortable();
    //}

    this.splashScreen = function (colorClass, icon, complete) {

        return $("<div/>")
            .addClass(colorClass)
            .css({
                'position': 'absolute',
                'left': -($(window).width() / 4) + 'px',
                'top': $(window).height() / 4,
                'width': $(window).width() / 4 + 'px',
                'height': $(window).height() / 4 + 'px',
                'z-index': ui.splash_screen_zindex,
                'opacity': 0.3
            })
            .appendTo(document.body)
            .animate({
                left: '50px',
                top: '50px',
                'width': $(window).width() - 100 + 'px',
                'height': $(window).height() - 100 + 'px',
                'opacity': 1.0
            }, 500, function () {
                $(this).animate({
                    left: '0px',
                    top: '0px',
                    width: '100%',
                    height: '100%'
                }, 500, function () { complete($(this)) });
            })
            .append(
                $('<img />')
                    .attr('src', icon)
                    .addClass(ui.splash_screen_icon_class)
                    .css({
                        'position': 'absolute',
                        'left': ($(window).width() - 512) / 2,
                        'top': ($(window).height() - 512) / 2
                    })
            );
    }

    this.login = function () {
        self.splashScreen(ui.signin_splash_color, ui.signin_splash_icon, function (div) {
            self.launchApp("Login", "Login", ui.login_page, function () {
                div.fadeOut();
            });
        });
    }

    this.logout = function () {
        self.splashScreen(ui.signin_splash_color, ui.signin_splash_icon, function (div) {
            self.launchApp("Logout", "Logout", ui.logout_page, function () {
                div.fadeOut();
            });
        });
    }

    this.settings = function () {
        if (self.user().isAnonymous)
            self.login();
        else {
            self.splashScreen(ui.settings_splash_color, ui.settings_splash_icon, function (div) {
                self.launchApp("Settings", "Settings", ui.settings_page, function () {
                    div.fadeOut();
                });
            });
        }
    }

    this.apps = function () {
        self.splashScreen(ui.appStore_splash_color, ui.appStore_splash_icon, function (div) {
            self.launchApp("AppStore", "App Store", "AppStore.html", function () {
                div.fadeOut();
            });
        });
    }

    this.switchTheme = function (themename) {
        var classes = $("body").prop("class").split(" ");
        _.each(classes, function (c) {
            if (_.string.startsWith(c, 'theme-'))
                $("body").removeClass(c);
        });

        $("body").addClass(themename);
    }

    this.reload = function () {
        document.location.href = _.string.strLeft(document.location.href, '#');
    }
};