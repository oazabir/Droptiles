/* Copyright (c) 2011 Brandon Aaron (http://brandonaaron.net)
 * Licensed under the MIT License (LICENSE.txt).
 *
 * Thanks to: Andrew Cobby (@andrewcobby http://github.com/cobbweb)
 *              - Refactored for jQuery 1.7+ only
 *              - Use MozMousePixelScroll for new Gecko browsers
 * Thanks to: http://adomas.org/javascript-mouse-wheel/ for some pointers.
 * Thanks to: Mathias Bank(http://www.mathias-bank.de) for a scope bug fix.
 * Thanks to: Seamus Leahy for adding deltaX and deltaY
 *
 * Version: 2.0.0
 *
 * Requires jQuery: 1.7+
 */(function (a, b) { function e(d) { var f = d || window.event, g = [].slice.call(arguments, 1), h = 0, i = 0, j = 0; return d = a.event.fix(f), d.type = "mousewheel", f.wheelDelta && (h = f.wheelDelta / 120), f.detail && (f.type == c[2] ? (this.removeEventListener(c[0], e, !1), h = -f.detail / 42) : h = -f.detail / 3), j = h, f.axis !== b && f.axis === f.HORIZONTAL_AXIS && (j = 0, i = -1 * h), f.wheelDeltaY !== b && (j = f.wheelDeltaY / 120), f.wheelDeltaX !== b && (i = -1 * f.wheelDeltaX / 120), g.unshift(d, h, i, j), (a.event.dispatch || a.event.handle).apply(this, g) } var c = ["DOMMouseScroll", "mousewheel", "MozMousePixelScroll"]; if (a.event.fixHooks) for (var d = c.length; d;) a.event.fixHooks[c[--d]] = a.event.mouseHooks; a.event.special.mousewheel = { setup: function () { if (this.addEventListener) for (var a = c.length; a;) this.addEventListener(c[--a], e, !1); else this.onmousewheel = e }, teardown: function () { if (this.removeEventListener) for (var a = c.length; a;) this.removeEventListener(c[--a], e, !1); else this.onmousewheel = null } } })(jQuery);