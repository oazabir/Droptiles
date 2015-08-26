#!/bin/sh

set -e

rm Combined.js
cat Underscore.js >> Combined.js
cat Underscore.string.js >> Combined.js
cat jquery-1.9.1.min.js >> Combined.js
cat jquery-ui-1.10.2.custom.min.js >> Combined.js
cat jQueryEnhancement.js >> Combined.js
cat jQuery.MouseWheel.js >> Combined.js
cat jquery.kinetic.js >> Combined.js
cat Knockout-2.1.0.js >> Combined.js
cat knockout.sortable.js >> Combined.js
cat cookie.js >> Combined.js
cat jQuery.hashchange.js >> Combined.js
cat jquery.ui.touch-punch.min.js >> Combined.js
cat bootstrap.min.js >> Combined.js
cat User.js >> Combined.js

rm CombinedDashboard.js
cat TheCore.js >> CombinedDashboard.js
cat ../Tiles/Tiles.js >> CombinedDashboard.js
cat Dashboard.js >> CombinedDashboard.js
