var slideways = require('../');
var slider = slideways({ min: 2, max: 10, snap: 0.1, init: 5 });
slider.appendTo('#slider');

var result = document.querySelector('#result');
slider.on('value', function (value) {
  result.value = value;
});
