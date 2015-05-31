var chai = require('chai');
var expect = chai.expect;
var assert = chai.assert;
var PostalCodes = require("../src/PostalCodes.js");

describe("PostalCodes", function() {
	var postalCodes = new PostalCodes();
	
    it ('supports the US', function() {
		return postalCodes.supportedCountries().then(function(value) {
			expect(value.countryCodes).to.include("US");
		});
    });
	
    it ('gracefully fails for unsupported country', function() {
		return postalCodes.area({
			countryCode: "XXX",
			postalCode: "ignored"
		}).then(function(value) {
			// Unexpected success
			assert.fail("Invalid country returned " + JSON.stringify(value));
		}, function(error) {
			expect(error.code).to.be.equal("invalid_country");
		});
    });
	
    it ('gracefully fails for unsupported postal code', function() {
		return postalCodes.area({
			countryCode: "US",
			postalCode: "XXX"
		}).then(function(value) {
			// Unexpected success
			assert.fail("Invalid US postal code returned " + JSON.stringify(value));
		}, function(error) {
			expect(error.code).to.be.equal("invalid_postal_code");
		});
    });
	
    it ('successfully returns polygons for supported postal codes', function() {
		return postalCodes.area({
			countryCode: "US",
			postalCode: "90210"
		}).then(function(value) {
			expect(value.countryCode).to.be.equal("US");
			expect(value.postalCode).to.be.equal("90210");
			expect(value.polygon).to.not.be.empty;
		}, function(error) {
			assert.fail("Supported postal code returned " + JSON.stringify(error));
		});
    });
});
