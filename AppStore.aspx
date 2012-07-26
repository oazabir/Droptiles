<%@ Page Language="C#" AutoEventWireup="true" CodeFile="AppStore.aspx.cs" Inherits="Tiles_AppStore" MasterPageFile="Droptiles.master" %>
<asp:Content runat="server" ContentPlaceHolderID="head">
    <link rel="stylesheet" type="text/css" href="css/AppStore.css" /> 
</asp:Content>
<asp:Content runat="server" ContentPlaceHolderID="scripts">
    <!-- Copyright 2012 Omar AL Zabir -->
    <script type="text/javascript" src="js/TheCore.js?v=1"></script>
    <script type="text/javascript" src="Tiles/AppStoreTiles.js?v=1"></script>
    <script type="text/javascript" src="js/AppStore.js?v=1"></script>       
</asp:Content>

<asp:Content runat="server" ContentPlaceHolderID="body">
    <div id="body" class="appstore">
        <div id="navbar" class="navbar navbar-fixed-top">
            <div class="navbar-inner">
                <div class="container-fluid">
                    <a class="pull-left" style="margin-top: 7px; margin-right: 5px;" href="Default.aspx">
                        <img src="img/avatar474_2.gif" style="max-height: 16px;" />
                    </a>
                    <h1><a class="brand" href="Default.aspx">Droptiles</a></h1>
                    <div class="nav-collapse">
                        <ul class="nav">
                            <li><a class="active" href="Default.aspx"><i class="icon-th-large"></i>Dashboard</a></li>
                            <li><a href="http://oazabir.github.com/Droptiles/"><i class="icon-gift"></i>I want this!</a></li>                            
                        </ul>                        
                    </div>
                </div>
            </div>
        </div>

        <div id="content" style="visibility: hidden">
            <a class="backbutton" href="Default.aspx">
                <img src="img/Left.png" />
            </a>
            <div id="start" data-bind="text: title"></div>
            
            <div id="metro-sections-container" class="metro">
                <div id="trash" class="trashcan">
                    <img src="img/Trashcan.png" width="64" height="64" />
                </div>
                <div class="metro-sections" data-bind="foreach: sections">
                    
                    <div class="metro-section" data-bind="attr: {id : uniqueId}">
                        <div class="metro-section-title" data-bind="{text: name}"></div>
                        <!-- ko foreach: sortedTiles -->
                            <div data-bind="attr: { id: uniqueId, 'class': tileClasses }">
                                <b class="check"></b>
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
                        <!-- /ko -->
                    </div>

                </div>
            </div>
        </div>
        <div id="copyright">
            Copyright 2012 Omar AL Zabir. 
            For license or to get the code, <a href="http://oazabir.github.com/Droptiles/">Click here</a>
        </div>
    </div>
</asp:Content>