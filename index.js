var hyperglue = require('hyperglue');
var EventEmitter = require('events').EventEmitter;
var html = require('./static/html');
var css = require('./static/css');

module.exports = Slider;
var insertedCss = false;

function Slider (opts) {
    if (!(this instanceof Slider)) return new Slider(opts);
    EventEmitter.call(this);
    
    if (!insertedCss && opts.insertCss !== false) {
        var style = document.createElement('style');
        style.appendChild(document.createTextNode(css));
        if (document.head.childNodes.length) {
            document.head.insertBefore(style, document.head.childNodes[0]);
        }
        else {
            document.head.appendChild(style);
        }
        insertedCss = true;
    }
    var root = this.element = hyperglue(html);
    
    var turtle = root.querySelector('.turtle');
    var runner = root.querySelector('.runner');
    
    var down = false;
    
    turtle.addEventListener('mousedown', function (ev) {
        ev.preventDefault();
        turtle.className = 'turtle pressed';
        down = {
            x: ev.clientX - root.offsetLeft - turtle.offsetLeft
        }
    });
    root.addEventListener('mousedown', function (ev) {
        ev.preventDefault();
    });
    window.addEventListener('mouseup', mouseup);
    window.addEventListener('mousemove', onmove);
    
    function onmove (ev) {
        ev.preventDefault();
        if (!down) return;
        var style = {
            root: window.getComputedStyle(root),
            turtle: window.getComputedStyle(turtle)
        };
        var w = num(style.root.width) - num(style.turtle.width)
            - num(style.turtle['border-width'])
        ;
        var x = Math.max(0, Math.min(w, ev.clientX - root.offsetLeft - down.x));
        turtle.style.left = x;
    }
    
    function mouseup () {
        down = true;
        turtle.className = 'turtle';
    }
}

Slider.prototype = new EventEmitter;

Slider.prototype.appendTo = function (target) {
    if (typeof target === 'string') {
        target = document.querySelector(target);
    }
    target.appendChild(this.element);
}

function num (s) {
    return Number((/^(\d+)/.exec(s) || [0,0])[1]);
}
;
