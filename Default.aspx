<%@ Page Language="C#" AutoEventWireup="true"  CodeFile="Default.aspx.cs" Inherits="_Default" MasterPageFile="~/Droptiles.master" %>
<%@ OutputCache NoStore="true" Location="None"  %>

<asp:Content ContentPlaceHolderID="head" runat="server">
    <!-- Copyright 2012 Omar AL Zabir -->
    <script type="text/javascript" src="js/TheCore.js"></script>
    <script type="text/javascript" src="Tiles/Tiles.js"></script>
    <script type="text/javascript" src="https://www.google.com/jsapi"></script>

    <script type="text/javascript">
        var ui = {
            subcontent_height: 50,
            metro_sections_selector: '.metro-sections',
            metro_section_selector: '.metro-section',
            metro_section: 'metro-section',
            hover_metro_section: 'hover-metro-section',
            metro_section_overflow: 'metro-section-overflow',
            app_iframe_id: 'app_iframe',
            app_iframe_zindex: 60000,
            navbar: '#navbar',
            navbar_zindex: '60001',
            tile: 'tile',
            tile_content_main_selector: '.tile-content-main',
            tile_selector: '.tile',
            tile_color: 'bg-color-blue',
            tile_icon_size: 'tile-icon-large',
            tile_icon_src: 'img/update.png',
            tile_subContent_color: 'bg-color-blueDark',
            tile_multi_content_selector: '.tile-multi-content',
            tile_multi_content: 'tile-multi-content',
            tile_content_slide_delay: 10000,
            tile_content_sub_selector: '.tile-content-sub',
            tile_content_sub: 'tile-content-sub',
            trash: '#trash',
            position_cookie: 'tiles',
            splash_screen_zindex: 65000,
            splash_screen_icon_class: 'tile-icon-large',
            signin_splash_color: 'bg-color-green',
            signin_splash_icon: 'img/User No-Frame.png',
            settings_splash_color: 'bg-color-purple',
            settings_splash_icon: 'img/configure.png',
            appStore_splash_color: 'bg-color-blue',
            appStore_splash_icon: 'img/App Store.png',
            anon_first_name: 'John',
            anon_last_name: 'Anonymous',
            anon_photo: 'img/User No-Frame.png',

            login_page: "ServerStuff/Login.aspx",
            logout_page: "ServerStuff/Logout.ashx",
            settings_page: "ServerStuff/Settings.aspx"
        };

        var viewModel = new DashboardModel("Start", [], window.currentUser, ui, TileBuilders);

        $(document).ready(function () {

            $('#content').css('visibility', 'visible');
            
            ko.applyBindings(viewModel);

            // See if user has a previous session where page setup was stored
            var cookie = readCookie("p");
            if (cookie != null && cookie.length > 0) {
                try {
                    viewModel.loadSectionsFromString(cookie);
                } catch (e) {
                    viewModel.loadSectionsFromString(DefaultTiles);
                }
            }
            else {
                viewModel.loadSectionsFromString(DefaultTiles);
            }

            viewModel.onTileOrderChange = function () {                
                var newOrder = viewModel.toSectionString();
                if (newOrder !== DefaultTiles) {
                    createCookie("p", newOrder, 2);

                    if (!window.currentUser.isAnonymous) {
                        $.get("SaveTiles.aspx");
                    }
                }
            }
            
            $(window).resize(function () {
                viewModel.resize();
            });

            $("body").on("mousewheel", function (event, delta, deltaX, deltaY) {
                window.scrollBy(-delta*100, 0);
            });

            $("#navbar").tooltip({
                title: "I am still here. Come here to go back to Dashboard",
                animate: true,
                placement: 'bottom',
                trigger: 'manual'
            });
            
            
            // Bind an event to window.onhashchange that, when the hash changes, gets the
            // hash and adds the class "selected" to any matching nav link.
            $(window).hashchange(function () {
                var hash = location.hash;

                if (hash == "" || hash == "#") {
                    if (viewModel.appRunning)
                        viewModel.closeApp();
                }
            })

            $('#googleSearchText').keypress(function (e) {
                if (e.keyCode == 13)
                    $('#googleForm').submit();
            });

            //_.delay(function () {
            //    $('#email_omar').attr('href', 'mailto:' + 'omaralzabir' + '@' + 'gmail' + '.com');
            //}, 1000);
            
            if ($.browser.msie && parseInt($.browser.version) < 9)
                $("#browser_incompatible").show();
                
        });

       
    </script>
   

</asp:Content>

<asp:Content ContentPlaceHolderID="body" runat="server">


    <div id="body">
        <div id="navbar" class="navbar navbar-fixed-top">
            <div class="navbar-inner">
                <div class="container-fluid">
                    <a class="pull-left" style="margin-top: 7px; margin-right: 5px;" href="">
                        <img src="img/avatar474_2.gif" style="max-height: 16px;" />
                    </a>
                    <h1><a class="brand" href="?">Droptiles</a></h1>
                    <div class="nav-collapse">
                        <ul class="nav">
                            <li><a class="active" href="?"><i class="icon-th-large"></i>Dashboard</a></li>
                            <li><a href="ServerStuff/AppStore.aspx"><i class="icon-shopping-cart"></i>Apps</a></li>
                            <li><a href="http://oazabir.github.com/Droptiles/"><i class="icon-gift"></i>I want this!</a></li>
                            <li>
                                <form id="googleForm" class="navbar-search pull-left" action="http://www.google.com/search" target="_blank">
                                    <input id="googleSearchText" type="text" class="search-query span2" name="q" placeholder="Search">
                                </form>
                            </li>
                        </ul>
                        <ul class="nav pull-right">
                            <li><a href="javascript:fullscreen()"><i class="icon-facetime-video"></i>Go Fullscreen</a></li>
                            <li><a href="ServerStuff/Logout.ashx"><i class="icon-refresh"></i>Start over</a></li>
                            <li class="dropdown">
                                <a href="#" class="dropdown-toggle" data-toggle="dropdown"><i class="icon-tint"></i>Theme<b class="caret"></b></a>
                                <ul class="dropdown-menu">
                                    <li><a href="#" data-bind="click: switchTheme.bind($data, 'theme-green')">Green</a></li>
                                    <li><a href="#" data-bind="click: switchTheme.bind($data, 'theme-cyan')">Cyan</a></li>
                                    <li><a href="#" data-bind="click: switchTheme.bind($data, 'theme-darkblue')">Darkblue</a></li>
                                    <li><a href="#" data-bind="click: switchTheme.bind($data, 'theme-red')">Red</a></li>
                                    <li><a href="#" data-bind="click: switchTheme.bind($data, 'theme-tiles')">Tiles</a></li>
                                </ul>
                            </li>
                            <li><a data-bind="click: settings" href="#settings"><i class="icon-cog"></i>Settings</a></li>
                            <li data-bind="if: user().isAnonymous"><a data-bind="click: login" href="#login"><i class="icon-user"></i>Login</a></li>
                            <li data-bind="if: !user().isAnonymous"><a href="ServerStuff/Logout.ashx"><i class="icon-user"></i>Logout</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>

        <div id="content" style="visibility: hidden">
            <div id="start" data-bind="text: title"></div>
            <div id="user" data-bind="with: user, click: settings">
                <div id="name">
                    <div id="firstname" data-bind="text: firstName">Omar</div>
                    <div id="lastname" data-bind="text: lastName">AL Zabir</div>
                </div>
                <div id="photo">
                    <img src="img/User No-Frame.png" data-bind="attr: {src: photo}" width="40" height="40" />
                </div>
            </div>
            <div id="browser_incompatible" class="alert">
                <button class="close" data-dismiss="alert">×</button>
                <strong>Warning!</strong>
                Your browser is incompatible with Droptiles. Please use Internet Explorer 9+ or Chrome or Firefox.
            </div>
            <div id="metro-sections-container" class="metro">
                <div id="trash" class="trashcan">
                    <img src="img/Trashcan.svg" width="64" height="64" />
                </div>
                <div class="metro-sections" data-bind="foreach: sections">
                    <div class="metro-section" data-bind="attr: {id : uniqueId}, foreach: sortedTiles">
                        <div data-bind="attr: { id: uniqueId, 'class': tileClasses }">
                            <!-- ko if: tileImage -->
                            <div class="tile-image">
                                <img data-bind="attr: { src: tileImage }" src="img/Internet%20Explorer.png" />
                            </div>
                            <!-- /ko -->
                            <!-- ko if: iconSrc -->
                            <!-- ko if: slides().length == 0 -->
                            <div data-bind="attr: { 'class': iconClasses }">
                                <img data-bind="attr: { src: iconSrc }" src="img/Internet%20Explorer.png" />
                            </div>
                            <!-- /ko -->
                            <!-- /ko -->
                            <div data-bind="foreach: slides">
                                <div class="tile-content-main">
                                    <div data-bind="html: $data">
                                    </div>
                                </div>
                            </div>
                            <!-- ko if: label -->
                            <span class="tile-label" data-bind="html: label">Label</span>
                            <!-- /ko -->
                            <!-- ko if: counter -->
                            <span class="tile-counter" data-bind="html: counter">10</span>
                            <!-- /ko -->
                            <!-- ko if: subContent -->
                            <div data-bind="attr: { 'class': subContentClasses }, html: subContent">
                                subContent
                            </div>
                            <!-- /ko -->
                        </div>
                    </div>

                </div>
            </div>
        </div>
        <div id="copyright">
            Copyright 2012 Omar AL Zabir. 
            Free for personal use. 
            For commercial distribution,         
            <a href="http://oazabir.github.com/Droptiles/">Click here</a>
        </div>
    </div>



</asp:Content>
