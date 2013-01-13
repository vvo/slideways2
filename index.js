var hyperglue = require('hyperglue');
var EventEmitter = require('events').EventEmitter;
var html = require('./static/html');
var css = require('./static/css');

module.exports = Slider;
var insertedCss = false;

function Slider (opts) {
    if (!(this instanceof Slider)) return new Slider(opts);
    
    if (!insertedCss && opts.insertCss !== false) {
        var style = document.createElement('style');
        style.appendChild(document.createTextNode(css));
        if (document.head.childNodes.length) {
            document.head.insertBefore(document.head.childNodes[0], style);
        }
        else {
            document.head.appendChild(style);
        }
        insertedCss = true;
    }
    this.element = hyperglue(html);
}

Slider.prototype = new EventEmitter;

Slider.prototype.appendTo = function (target) {
    if (typeof target === 'string') {
        target = document.querySelector(target);
    }
    target.appendChild(this.element);
};
