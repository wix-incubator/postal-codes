var Q = require('q');
var _ = require('lodash');

module.exports = function(params) {
	// TODO: remove this after switching to web-service
	var postalCodesByCountry = {
		"US": {
			"90210": [{"lat":-118.439626,"lng":34.115428},{"lat":-118.441946,"lng":34.128716},{"lat":-118.442158,"lng":34.130898},{"lat":-118.438363,"lng":34.131579},{"lat":-118.43481,"lng":34.1306},{"lat":-118.433193,"lng":34.1317},{"lat":-118.429755,"lng":34.131909},{"lat":-118.428174,"lng":34.131274},{"lat":-118.429083,"lng":34.134567},{"lat":-118.428491,"lng":34.135255},{"lat":-118.428558,"lng":34.134123},{"lat":-118.42734,"lng":34.13236},{"lat":-118.426275,"lng":34.134544},{"lat":-118.425015,"lng":34.133545},{"lat":-118.425178,"lng":34.131325},{"lat":-118.423144,"lng":34.132239},{"lat":-118.419847,"lng":34.12974},{"lat":-118.419994,"lng":34.127959},{"lat":-118.41632,"lng":34.126725},{"lat":-118.414903,"lng":34.130982},{"lat":-118.411948,"lng":34.134156},{"lat":-118.411468,"lng":34.130727},{"lat":-118.408385,"lng":34.13073},{"lat":-118.405856,"lng":34.127475},{"lat":-118.40415,"lng":34.127958},{"lat":-118.403281,"lng":34.125887},{"lat":-118.401123,"lng":34.126972},{"lat":-118.398147,"lng":34.125469},{"lat":-118.399105,"lng":34.122524},{"lat":-118.398054,"lng":34.121213},{"lat":-118.398129,"lng":34.120193},{"lat":-118.399087,"lng":34.115759},{"lat":-118.397329,"lng":34.116769},{"lat":-118.398623,"lng":34.114722},{"lat":-118.398663,"lng":34.113552},{"lat":-118.395593,"lng":34.115479},{"lat":-118.394968,"lng":34.117099},{"lat":-118.393076,"lng":34.115768},{"lat":-118.391604,"lng":34.112937},{"lat":-118.391583,"lng":34.112426},{"lat":-118.390574,"lng":34.109203},{"lat":-118.392114,"lng":34.106261},{"lat":-118.392084,"lng":34.099054},{"lat":-118.395412,"lng":34.096173},{"lat":-118.396506,"lng":34.096182},{"lat":-118.395914,"lng":34.095013},{"lat":-118.395844,"lng":34.091055},{"lat":-118.394545,"lng":34.091065},{"lat":-118.393586,"lng":34.089635},{"lat":-118.389755,"lng":34.088495},{"lat":-118.389725,"lng":34.080759},{"lat":-118.389733,"lng":34.07649},{"lat":-118.390718,"lng":34.076501},{"lat":-118.390714,"lng":34.07529},{"lat":-118.39033,"lng":34.075294},{"lat":-118.390347,"lng":34.073574},{"lat":-118.390419,"lng":34.072331},{"lat":-118.390705,"lng":34.072338},{"lat":-118.390295,"lng":34.072082},{"lat":-118.39029,"lng":34.067615},{"lat":-118.389672,"lng":34.06705},{"lat":-118.399077,"lng":34.067056},{"lat":-118.400508,"lng":34.068494},{"lat":-118.399972,"lng":34.06707},{"lat":-118.401529,"lng":34.067782},{"lat":-118.402593,"lng":34.067078},{"lat":-118.409499,"lng":34.06708},{"lat":-118.411414,"lng":34.068845},{"lat":-118.411593,"lng":34.067078},{"lat":-118.416319,"lng":34.067079},{"lat":-118.416371,"lng":34.06884},{"lat":-118.418462,"lng":34.072361},{"lat":-118.419642,"lng":34.072652},{"lat":-118.420928,"lng":34.075428},{"lat":-118.423289,"lng":34.075689},{"lat":-118.423828,"lng":34.07974},{"lat":-118.423023,"lng":34.079931},{"lat":-118.425266,"lng":34.080812},{"lat":-118.425974,"lng":34.080835},{"lat":-118.428124,"lng":34.083948},{"lat":-118.426968,"lng":34.083614},{"lat":-118.426991,"lng":34.085864},{"lat":-118.432762,"lng":34.088772},{"lat":-118.433207,"lng":34.090252},{"lat":-118.434898,"lng":34.092128},{"lat":-118.435351,"lng":34.091106},{"lat":-118.437569,"lng":34.092817},{"lat":-118.442378,"lng":34.111177}],
			"90211": [{"lat":-118.390229,"lng":34.066445},{"lat":-118.389672,"lng":34.06705},{"lat":-118.39029,"lng":34.067615},{"lat":-118.390295,"lng":34.072082},{"lat":-118.383764,"lng":34.072122},{"lat":-118.383728,"lng":34.069684},{"lat":-118.377403,"lng":34.069709},{"lat":-118.375755,"lng":34.070097},{"lat":-118.372027,"lng":34.063867},{"lat":-118.372244,"lng":34.0622},{"lat":-118.376001,"lng":34.059965},{"lat":-118.376174,"lng":34.059462},{"lat":-118.37733,"lng":34.062954},{"lat":-118.383534,"lng":34.062937},{"lat":-118.383666,"lng":34.057099},{"lat":-118.390298,"lng":34.057085}]
		}
	}
	
	var self = {};
	
	self.supportedCountries = function() {
		var deferred = Q.defer();
		
		// TODO: replace with web-service call or hard-coded list
		_.defer(function() {
			deferred.resolve({
				countryCodes: _.keys(postalCodesByCountry)
			});
		});
		
		return deferred.promise;
	}
	
	self.area = function(params) {
		params = params || {};
		var countryCode = params.countryCode;
		var postalCode = params.postalCode;
		
		var deferred = Q.defer();
		
		// TODO: replace with web-service call
		_.defer(function() {
			var countryPostalCodes = postalCodesByCountry[countryCode];
			if (countryPostalCodes) {
				var polygon = countryPostalCodes[postalCode];
				if (polygon) {
					deferred.resolve({
						countryCode: countryCode,
						postalCode: postalCode,
						polygon: polygon
					});
				} else {
					deferred.reject({
						code: "invalid_postal_code",
						message: "invalid postal code for " + countryCode + ": " + postalCode
					});
				}
			} else {
				deferred.reject({
					code: "invalid_country",
					message: "invalid country: " + countryCode
				});
			}
		});
		
		return deferred.promise;
	}
	
	return self;
};
