var slideways = require('../');
var slider = slideways({ min: 2, max: 10, value: 5 });
slider.appendTo('#slider');

var result = document.querySelector('#result');
slider.on('value', function (value) {
    result.value = value;
});
