# slideways2

horizontal slider control widget

It's a fork of https://github.com/substack/slideways.

Provides various enhancements compared to original version:
- works in standard mode: 55234a7d9d05befac4d796f4dae56f714366cf30
- toggle classNames instead of overwriting all css classes: 2bcfcf17dca27e75e378893cce3be9f56b155c86
- do not disable text selection in the whole webpage: 34f71b03c711aabf7d6b13eb843dbca7e99a755f
- and some minor repo/build enhancements
 
# example

[view this example](http://substack.net/projects/slideways2/)

``` js
var slideways2 = require('slideways2');
var slider = slideways2({ min: 2, max: 10, snap: 0.1, init: 5 });
slider.appendTo('#slider');

var result = document.querySelector('#result');
slider.on('value', function (value) {
  result.value = value;
});
```

# methods

## var slider = slideways2(opts)

Return a new slider instance from the optional `opts`.

`opts.min` and `opts.max` may specify a range to interpolate slider values with.
Default values are 0 and 1 respectively.

If you set a `opts.snap`, values will be rounded to the nearest `opts.snap`
increment.

Set an initial value with `opts.value`. The default initial value is the
`opts.min`.

## slider.appendTo(target)

Append the slider widget to the dom element or query selector string `target`.

## slider.set(value)

Set the interpolated slider value directly.

## slider.interpolate(x)

From an uninterpolated value `x` between 0 and 1 inclusive, return the
interpolated value respecting the `min`, `max`, and `snap` values if those
values were provided when the `slider` was initialized.

# events

## slider.on('value', function (value) {})

Each time the slider value changes, `slider` emits a `'value'` event with the
new interpolated value.

# attributes

## slider.element

html dom element container

# install

With [npm](https://npmjs.org) do:

```
npm install slideways2
```

Use [browserify](http://browserify.org) to `require('slideways2')`.

# license

MIT
