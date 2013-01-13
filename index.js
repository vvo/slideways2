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
    this.element = hyperglue(html);
    
    var turtle = this.element.querySelector('.turtle');
    var runner = this.element.querySelector('.runner');
    
    var down = false;
    
    turtle.addEventListener('mousedown', function () { down = true });
    turtle.addEventListener('mouseup', function () { down = false });
    runner.addEventListener('mouseup', function () { down = false });
    window.addEventListener('mouseup', function () { down = false });
    
    turtle.addEventListener('mousemove', onmove);
    runner.addEventListener('mousemove', onmove);
    
    function onmove (ev) {
        if (!down) return;
        var style = {
            runner: window.getComputedStyle(runner),
            turtle: window.getComputedStyle(turtle)
        };
        turtle.style.left = ev.clientX;
    }
}

Slider.prototype = new EventEmitter;

Slider.prototype.appendTo = function (target) {
    if (typeof target === 'string') {
        target = document.querySelector(target);
    }
    target.appendChild(this.element);
};
