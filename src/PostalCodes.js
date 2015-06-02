var Q              = require('q');
var _              = require('lodash');
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

module.exports = function(params) {
	var supportedCountries = ["AU", "CA", "FR", "GB", "US"];
	
	function getJsonUrl(countryCode, postalCode) {
		return "https://storage.googleapis.com/postal-codes/" + countryCode + "/" + postalCode + ".json";
	}
	
	var self = {};
	
	self.supportedCountries = function() {
		var deferred = Q.defer();
		
		deferred.resolve({
			countryCodes: supportedCountries
		});
		
		return deferred.promise;
	};
	
	self.area = function(params) {
		params = params || {};
		var countryCode = params.countryCode;
		var postalCode = params.postalCode;
		
		var deferred = Q.defer();
		
		if (_(supportedCountries).includes(countryCode)) {
			var xhr = new XMLHttpRequest();
			xhr.onreadystatechange = function() {
				if (xhr.readyState == 4) {
					if (xhr.status == 200) {
						deferred.resolve(JSON.parse(xhr.responseText));
					} else {
						deferred.reject({
							code: "invalid_postal_code",
							message: "invalid postal code for " + countryCode + ": " + postalCode
						});
					}
				}
			};
			
			xhr.open("GET", getJsonUrl(countryCode, postalCode), true);
			xhr.send();			
		} else {
			deferred.reject({
				code: "invalid_country",
				message: "invalid country: " + countryCode
			});
		}
		
		return deferred.promise;
	};
	
	return self;
};
