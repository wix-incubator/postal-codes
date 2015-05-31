var Q = require('q');
var _ = require('lodash');

module.exports = function(params) {
	// TODO: remove this after switching to web-service
	var postalCodesByCountry = {
		"US": {
			"90210": [{"lat":34.115428,"lng":-118.439626},{"lat":34.128716,"lng":-118.441946},{"lat":34.130898,"lng":-118.442158},{"lat":34.131579,"lng":-118.438363},{"lat":34.1306,"lng":-118.43481},{"lat":34.1317,"lng":-118.433193},{"lat":34.131909,"lng":-118.429755},{"lat":34.131274,"lng":-118.428174},{"lat":34.134567,"lng":-118.429083},{"lat":34.135255,"lng":-118.428491},{"lat":34.134123,"lng":-118.428558},{"lat":34.13236,"lng":-118.42734},{"lat":34.134544,"lng":-118.426275},{"lat":34.133545,"lng":-118.425015},{"lat":34.131325,"lng":-118.425178},{"lat":34.132239,"lng":-118.423144},{"lat":34.12974,"lng":-118.419847},{"lat":34.127959,"lng":-118.419994},{"lat":34.126725,"lng":-118.41632},{"lat":34.130982,"lng":-118.414903},{"lat":34.134156,"lng":-118.411948},{"lat":34.130727,"lng":-118.411468},{"lat":34.13073,"lng":-118.408385},{"lat":34.127475,"lng":-118.405856},{"lat":34.127958,"lng":-118.40415},{"lat":34.125887,"lng":-118.403281},{"lat":34.126972,"lng":-118.401123},{"lat":34.125469,"lng":-118.398147},{"lat":34.122524,"lng":-118.399105},{"lat":34.121213,"lng":-118.398054},{"lat":34.120193,"lng":-118.398129},{"lat":34.115759,"lng":-118.399087},{"lat":34.116769,"lng":-118.397329},{"lat":34.114722,"lng":-118.398623},{"lat":34.113552,"lng":-118.398663},{"lat":34.115479,"lng":-118.395593},{"lat":34.117099,"lng":-118.394968},{"lat":34.115768,"lng":-118.393076},{"lat":34.112937,"lng":-118.391604},{"lat":34.112426,"lng":-118.391583},{"lat":34.109203,"lng":-118.390574},{"lat":34.106261,"lng":-118.392114},{"lat":34.099054,"lng":-118.392084},{"lat":34.096173,"lng":-118.395412},{"lat":34.096182,"lng":-118.396506},{"lat":34.095013,"lng":-118.395914},{"lat":34.091055,"lng":-118.395844},{"lat":34.091065,"lng":-118.394545},{"lat":34.089635,"lng":-118.393586},{"lat":34.088495,"lng":-118.389755},{"lat":34.080759,"lng":-118.389725},{"lat":34.07649,"lng":-118.389733},{"lat":34.076501,"lng":-118.390718},{"lat":34.07529,"lng":-118.390714},{"lat":34.075294,"lng":-118.39033},{"lat":34.073574,"lng":-118.390347},{"lat":34.072331,"lng":-118.390419},{"lat":34.072338,"lng":-118.390705},{"lat":34.072082,"lng":-118.390295},{"lat":34.067615,"lng":-118.39029},{"lat":34.06705,"lng":-118.389672},{"lat":34.067056,"lng":-118.399077},{"lat":34.068494,"lng":-118.400508},{"lat":34.06707,"lng":-118.399972},{"lat":34.067782,"lng":-118.401529},{"lat":34.067078,"lng":-118.402593},{"lat":34.06708,"lng":-118.409499},{"lat":34.068845,"lng":-118.411414},{"lat":34.067078,"lng":-118.411593},{"lat":34.067079,"lng":-118.416319},{"lat":34.06884,"lng":-118.416371},{"lat":34.072361,"lng":-118.418462},{"lat":34.072652,"lng":-118.419642},{"lat":34.075428,"lng":-118.420928},{"lat":34.075689,"lng":-118.423289},{"lat":34.07974,"lng":-118.423828},{"lat":34.079931,"lng":-118.423023},{"lat":34.080812,"lng":-118.425266},{"lat":34.080835,"lng":-118.425974},{"lat":34.083948,"lng":-118.428124},{"lat":34.083614,"lng":-118.426968},{"lat":34.085864,"lng":-118.426991},{"lat":34.088772,"lng":-118.432762},{"lat":34.090252,"lng":-118.433207},{"lat":34.092128,"lng":-118.434898},{"lat":34.091106,"lng":-118.435351},{"lat":34.092817,"lng":-118.437569},{"lat":34.111177,"lng":-118.442378}],
			"90211": [{"lat":34.066445,"lng":-118.390229},{"lat":34.06705,"lng":-118.389672},{"lat":34.067615,"lng":-118.39029},{"lat":34.072082,"lng":-118.390295},{"lat":34.072122,"lng":-118.383764},{"lat":34.069684,"lng":-118.383728},{"lat":34.069709,"lng":-118.377403},{"lat":34.070097,"lng":-118.375755},{"lat":34.063867,"lng":-118.372027},{"lat":34.0622,"lng":-118.372244},{"lat":34.059965,"lng":-118.376001},{"lat":34.059462,"lng":-118.376174},{"lat":34.062954,"lng":-118.37733},{"lat":34.062937,"lng":-118.383534},{"lat":34.057099,"lng":-118.383666},{"lat":34.057085,"lng":-118.390298}]
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
