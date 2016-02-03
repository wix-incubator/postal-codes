# postal-codes
[![NPM version][npm-image]][npm-url] [![Downloads][downloads-image]][npm-url]

Maps postal codes to polygons.

### Usage
Install the library with `npm install postal-codes`

```javascript
var PostalCodes = require('postal-codes');

var postalCodes = new PostalCodes();

// Get supported countries
postalCodes.supportedCountries().then(function(value) {
  value.countryCodes; //->  Array of ISO 3166-1 alpha-2 country codes
});

// Get some postal code
postalCodes.area({
  countryCode: "US",
  postalCode: "90210"
}).then(function(value) {
  value.countryCode; //-> "US"
  value.id;          //-> "90210"
  value.polygons;    //-> Array of polygons that represent this postal code
});
```

[downloads-image]: https://img.shields.io/npm/dm/postal-codes.svg

[npm-url]: https://npmjs.org/package/postal-codes
[npm-image]: https://img.shields.io/npm/v/postal-codes.svg

## Reporting Issues

Please use [the issue tracker](https://github.com/wix/postal-codes/issues) to report issues related to this library.

## License
This library uses the Apache License, version 2.0.
