![Droptiles screenshot](https://github.com/oazabir/Droptiles/raw/master/doc/Screenshot600.png)

### Introduction
*Droptiles* is a **Windows 8 Start** like **Metro style** Web 2.0 Dashboard. It builds the experience using **Tiles**. Tiles are **mini apps** that can fetch data from external sources. Clicking on a tile launches the full app. Apps can be from any existing website to customized website specifically built to fit the Dashboard experience. 
*Droptiles* is built almost entirely of **HTML, Javascript and CSS** and thus highly portable to any platform. The sample project is built using ASP.NET to show some server side integration, like Signup, Login and getting dynamic data from server. But with very little change you can port it to **PHP, Ruby, JSP** or any other platform.
*Droptiles* is the sequel of my [Dropthings](http://dropthings.omaralzabir.com/), which is the first Open Source Web 2.0 Dashboard.

### [See it live!](http://droptiles.com), go to [Droptiles.com](http://droptiles.com)

### Features
* Metro style user interface. CSS framework to build metro style websites, inspired by metroui.org.ua.
* Drag & Drop tiles to personalize the experience. 
* Client side object model and data binding for easy MVVM implementation.
* Server side platform neutral implementation. Can be ported to PHP, JSP easily.
* Live tiles. Tiles are mini-apps, loading data from variety of sources.

### How can you use Droptiles
* **Enterprise Dashboard** aggregating data from various systems and offering a launch pad for intranet/internet applications.
* **Web 2.0 Portal** offering portlets in the form of tiles. Aggregating data from various services and as a launch pad for different services.
* **Touch enabled Kiosk** front-end.
* **Content aggregator** for News and Research purpose.

### Who am I?
I am Omar AL Zabir, the Chief Architect of SaaS Platform, BT (aka British Telecom). Microsoft MVP on ASP.NET/IIS. Ex Co-Founder and CTO of the first Web 2.0 Social Start Page - Pageflakes, owner of popular open source projects - [Dropthings](http://dropthings.omaralzabir.com), [Codeuml.com](http://codeuml.com). 

Follow me on [my blog](http://omaralzabir.com) for future updates.

### License
*Droptiles* is **Open Source**. It is free for personal use as long as you keep the copyright notices intact. In order to buy license, go to the [Droptiles production site](http://www.droptiles.com/) and there's a tile on the right side to place the order through Paypal.

### Technologies
* [jQuery](http://jquery.com/) for all client side effects.
* [KnockoutJS](http://knockoutjs.com/) for client side Object Model and data binding.
* [UnderscoreJS](http://underscorejs.org/).
* [Bootstrap](http://twitter.github.com/bootstrap/) for cross-browser CSS framework and jQuery plugins.

### Screenshots
#### App Store
![App Store](https://github.com/oazabir/Droptiles/raw/master/doc/AppStore.png)

AppStore offers new applications

#### Tiles are mini apps, built using Javascript
![Tiles](https://github.com/oazabir/Droptiles/raw/master/doc/Tiles.png)

Tiles are mini apps that can have their own html, javascript and css. They are loaded by the Dashboard dynamically and executed dynamically. Each tile runs on its own delivering the in-tile experience. There's no special Widget framework to follow. Just plain simple Javascript.


#### Tiles can be dynamic, loaded from server side pages
![Dynamic Tile](https://github.com/oazabir/Droptiles/raw/master/doc/DynamicTile.png)

Tiles can be dynamic pages delivered from the server. Here is a tile that captures the html output of an ASPX page. Tiles can be intercative as well. You can embed a form inside a tile.

#### Apps running inside Droptiles
![Apps](https://github.com/oazabir/Droptiles/raw/master/doc/Apps.png)

External applications can run inside Droptiles offering a seamless integration experience. 

### Why shouldn't I just code it myself?
* *Droptiles* has 100+ hours of my effort and 200+ hours of community effort to get it where it is now. If you try to build it from scratch, by the time you get to production quality, you would probably have spent more money than just buying commercial license for the code.
* *Droptiles* has a highly readable, extensible, maintainable codebase. 
* *Droptiles* is a minimalistic framework to build apps on top of it. It’s not a full blown CMS, which you need to spend months learning in order to customize it. The codebase is small, and highly reusable – making it very easy to build bespoke sites on top of it.
* *Droptiles* will force your developers to use industry best practices. For instance, using MVVM architecture, building sites on top of cross-browser CSS and JS frameworks, pluggable architecture where features are dynamically loaded and so on.
* *Droptiles* is built specifically to be integrated with existing ASP.NET/PHP/JSP/Ruby web applications, where most other CMS are built to be run as a standalone app.

### Documentation
Please go over to the [Wiki](https://github.com/oazabir/Droptiles/wiki) for detail project documentation.