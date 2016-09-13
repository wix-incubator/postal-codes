'use strict'

import {assert, expect} from 'chai'
import PostalCodes from '../src/PostalCodes'
import {XMLHttpRequest} from 'xmlhttprequest'

describe("PostalCodes", () => {
	const postalCodes = new PostalCodes({XMLHttpRequest});
	
	describe("supportedCountries", () => {
		it ('lists all supported countries', () => {
			return postalCodes.supportedCountries().then((value) => {
				expect(value.countryCodes).to.have.length(5);
				expect(value.countryCodes).to.include("US");
				expect(value.countryCodes).to.include("GB");
				expect(value.countryCodes).to.include("FR");
				expect(value.countryCodes).to.include("CA");
				expect(value.countryCodes).to.include("AU");
			});
		});
	})
	
	describe("area", () => {
		it ('gracefully fails for unsupported country', () => {
			return postalCodes.area({
				countryCode: "XXX",
				postalCode: "ignored"
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
				postalCode: "XXX"
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
				postalCode: "90210"
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
				postalCode: "aB11 6eQ"
			}).then((value) => {
				expect(value.countryCode).to.be.equal("GB");
				expect(value.id).to.be.equal("AB11");
			}, (error) => {
				assert.fail(`GB postal code was not normalized: ${JSON.stringify(error)}`);
			});
		});
	})
});
