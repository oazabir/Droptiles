<%@ Page Language="C#" AutoEventWireup="true"  CodeFile="Default.aspx.cs" Inherits="_Default" MasterPageFile="~/Droptiles.master" %>
<%@ OutputCache NoStore="true" Location="None"  %>

<asp:Content ContentPlaceHolderID="scripts" runat="server">
    <!-- Copyright 2012 Omar AL Zabir -->
    <script type="text/javascript" src="https://www.google.com/jsapi"></script>    
    
<% if (Request.IsLocal) { %>    
    <!-- 
        If you change any of the below javascript files, make sure you run the Combine.bat
        file in the /js folder to generate the CombinedDashboard.js file again. And then don't
        forget to update the ?v=14#. Otherwise user's will have cached copies in their browser
        and won't get the newly deployed file. -->
    <script type="text/javascript" src="js/TheCore.js?v=14"></script>
    <script type="text/javascript" src="tiles/tiles.js?v=14"></script>
    <script type="text/javascript" src="js/Dashboard.js?v=14"></script>
    
<% } else { %>    
    <script type="text/javascript" src="js/CombinedDashboard.js?v=14"></script>
<% } %>

    <script type="text/javascript">
        $(document).ready(function(){
            <%= GetAlerts() %>
            });
    </script>
    
</asp:Content>

<asp:Content ContentPlaceHolderID="body" runat="server">
    <div id="body" class="unselectable">
        <div id="navbar" class="navbar navbar-fixed-top navbar-inverse">
            <div class="navbar-inner">
                <div class="container">                    
                    <div class="nav-collapse collapse">
                        <ul class="nav">
                            <li class="active">                                
                                <a class="brand" href="?"><img src="img/avatar474_2.gif" style="max-height: 20px; margin-top: -2px; margin-right:5px; vertical-align: middle" />Droptiles</a>
                            </li>
                            <li><a class="active" href="?"><i class="icon-white icon-th-large"></i>Dashboard</a></li>
                            <li><a href="AppStore.aspx"><i class="icon-white icon-shopping-cart"></i>Apps</a></li>
                            <li><a href="http://oazabir.github.com/Droptiles/"><i class="icon-white icon-gift"></i>I want this!</a></li>
                            <li>
                                <form id="googleForm" class="navbar-search pull-left" action="http://www.google.com/search" target="_blank">
                                    <input id="googleSearchText" type="text" class="search-query span2" name="q" placeholder="Google">
                                </form>
                            </li>
                        </ul>
                        <ul class="nav pull-right">
                            <%--<li><a href="javascript:fullscreen()"><i class="icon-facetime-video"></i>Go Fullscreen</a></li>--%>
                            <li><a href="ServerStuff/Logout.ashx"><i class="icon-white icon-refresh"></i>Reset</a></li>
                            <li class="dropdown">
                                <a href="#" class="dropdown-toggle" data-toggle="dropdown"><i class="icon-white icon-tint"></i>Theme<b class="caret"></b></a>
                                <ul class="dropdown-menu">
                                    <li><a href="#" onclick="ui.switchTheme('theme-green')">Green</a></li>
                                    <li><a href="#" onclick="ui.switchTheme('theme-white')">White</a></li>
                                    <li><a href="#" onclick="ui.switchTheme('theme-Bloom')">Bloom</a></li>                                    
                                </ul>
                            </li>                            
                            <li data-bind="if: user().isAnonymous"><a onclick="ui.login()" href="#login"><i class="icon-white icon-user"></i>Login</a></li>
                            <li data-bind="if: !user().isAnonymous"><a href="ServerStuff/Logout.ashx"><i class="icon-white icon-user"></i>Logout</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>

        <div id="content" style="visibility: hidden">
            <div id="start" data-bind="text: title"></div>
            <div id="user" data-bind="with: user" onclick="ui.settings()">
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
                Your browser is incompatible with Droptiles. Please use Internet Explorer 9+, Chrome, Firefox or Safari.
            </div>
            <div id="CombinedScriptAlert" class="alert">
                <button class="close" data-dismiss="alert">×</button>
                <strong>Warning!</strong>
                Combined javascript files are outdated. 
                Please retun the js\Combine.bat file. 
                Otherwise it won't work when you will deploy on a server.
            </div>
            <div id="metro-sections-container" class="metro">
                <div id="trash" class="trashcan" data-bind="sortable: { data: trash }">
                    
                </div>
                <div class="metro-sections" data-bind="foreach: sections">
                    <%--<div class="metro-section" data-bind="attr: {id : uniqueId}, foreach: sortedTiles">--%>
                    <div class="metro-section" data-bind="sortable: { data: tiles }">
                        <div data-bind="attr: { id: uniqueId, 'class': tileClasses }">
                            <a class="metro-tile-link">                        
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
                            </a>
                        </div>   
                        
                    </div>
                </div>
            </div>
        </div>
        <div id="copyright">            
            Copyright 2012 <a href="http://omaralzabir.com/">Omar AL Zabir</a>. This is Open Source. 
            For license details and to get the code, <a href="http://oazabir.github.com/Droptiles/">See Droptiles GitHub</a>
        </div>
    </div>


</asp:Content>
