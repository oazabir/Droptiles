<%@ Page Language="C#" AutoEventWireup="true"  CodeFile="RssReader.aspx.cs" Inherits="RssReader" MasterPageFile="~/Droptiles.master" %>
<%@ OutputCache NoStore="true" Duration="360" Location="None" VaryByParam="None"  %>
<asp:Content ContentPlaceHolderID="head" runat="server">
    <link rel="stylesheet" type="text/css" href="css/RssReader.css?v=14" />
</asp:Content>

<asp:Content ContentPlaceHolderID="scripts" runat="server">
    <!-- Copyright 2012 Omar AL Zabir -->
    <script type="text/javascript" src="https://www.google.com/jsapi"></script>

    <script type="text/javascript" src="js/TheCore.js?v=14"></script>
    <script type="text/javascript" src="RssTiles.ashx"></script>
    <script type="text/javascript" src="js/RssReader.js?v=14"></script>

    <script type="text/ecmascript">

        var _gaq = _gaq || [];
        _gaq.push(['_setAccount', 'UA-33406100-1']);
        _gaq.push(['_trackPageview']);

        (function() {
            var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
            ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
            var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
        })();

    </script>

</asp:Content>

<asp:Content ContentPlaceHolderID="body" runat="server">
    <div id="body" class="unselectable">
        <div id="content" style="visibility: hidden">
            <div id="metro-sections-container" class="metro">
                <div id="trash" class="trashcan">
                    <img src="img/Trashcan.png" width="64" height="64" />
                </div>
                <div class="metro-sections" data-bind="foreach: sections">
                    <div class="metro-section" data-bind="attr: {id : uniqueId}">
                        <div class="metro-section-title" data-bind="text: name"></div>
                        <!-- ko foreach: tiles -->
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
    </div>

</asp:Content>
