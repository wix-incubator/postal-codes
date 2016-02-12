var chai = require('chai');
var expect = chai.expect;
var assert = chai.assert;
var PostalCodes = require("../src/PostalCodes.js");
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

describe("PostalCodes", () => {
	var postalCodes = new PostalCodes();
	
    it ('supports the US', () => {
		return postalCodes.supportedCountries().then((value) => {
			expect(value.countryCodes).to.include("US");
		});
    });
	
    it ('gracefully fails for unsupported country', () => {
		return postalCodes.area({
			countryCode: "XXX",
			postalCode: "ignored",
            XMLHttpRequest : XMLHttpRequest
		}).then((value) => {
			// Unexpected success
			assert.fail(`Invalid country returned ${JSON.stringify(value)}`);
		}, (error) => {
			expect(error.code).to.be.equal("invalid_country");
		});
    });
	
    it ('gracefully fails for unsupported postal code', () => {
		return postalCodes.area({
			countryCode: "US",
			postalCode: "XXX",
            XMLHttpRequest : XMLHttpRequest
		}).then((value) => {
			// Unexpected success
			assert.fail(`Invalid US postal code returned ${JSON.stringify(value)}`);
		}, (error) => {
			expect(error.code).to.be.equal("invalid_postal_code");
		});
    });
	
    it ('successfully returns polygons for supported postal codes', () => {
		return postalCodes.area({
			countryCode: "US",
			postalCode: "90210",
            XMLHttpRequest : XMLHttpRequest
		}).then((value) => {
			expect(value.countryCode).to.be.equal("US");
			expect(value.id).to.be.equal("90210");
			expect(value.polygons).to.not.be.empty;
			expect(value.polygons[0]).to.not.be.empty;
		}, (error) => {
			assert.fail(`Supported postal code returned ${JSON.stringify(error)}`);
		});
    });
	
    it ('normalizes GB postal codes', () => {
		return postalCodes.area({
			countryCode: "GB",
			postalCode: "aB11 6eQ",
            XMLHttpRequest : XMLHttpRequest
		}).then((value) => {
			expect(value.countryCode).to.be.equal("GB");
			expect(value.id).to.be.equal("AB11");
		}, (error) => {
			assert.fail(`GB postal code was not normalized: ${JSON.stringify(error)}`);
		});
    });
});
