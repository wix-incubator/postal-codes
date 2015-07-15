var chai = require('chai');
var expect = chai.expect;
var assert = chai.assert;
var PostalCodes = require("../src/PostalCodes.js");
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

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
			postalCode: "ignored",
            XMLHttpRequest : XMLHttpRequest
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
			postalCode: "XXX",
            XMLHttpRequest : XMLHttpRequest
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
			postalCode: "90210",
            XMLHttpRequest : XMLHttpRequest
		}).then(function(value) {
			expect(value.countryCode).to.be.equal("US");
			expect(value.id).to.be.equal("90210");
			expect(value.polygons).to.not.be.empty;
			expect(value.polygons[0]).to.not.be.empty;
		}, function(error) {
			assert.fail("Supported postal code returned " + JSON.stringify(error));
		});
    });
	
    it ('normalizes GB postal codes', function() {
		return postalCodes.area({
			countryCode: "GB",
			postalCode: "aB11 6eQ",
            XMLHttpRequest : XMLHttpRequest
		}).then(function(value) {
			expect(value.countryCode).to.be.equal("GB");
			expect(value.id).to.be.equal("AB11");
		}, function(error) {
			assert.fail("GB postal code was not normalized: " + JSON.stringify(error));
		});
    });
});
