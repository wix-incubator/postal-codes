'use strict'

import Q from 'q'
import _ from 'lodash'

const supportedCountries = ['AU', 'CA', 'FR', 'GB', 'US']

const normalize = (countryCode, postalCode) => {
	switch (countryCode) {
		case 'CA': // fall-through
		case 'GB':
			return postalCode.trim().split(' ')[0].toUpperCase()
		default:
			return postalCode.trim()
	}
}

const getJsonUrl = (countryCode, postalCode) => {
	return `https://storage.googleapis.com/postal-codes/${countryCode}/${normalize(countryCode, postalCode)}.json`
}


export default class PostalCodes {
	constructor({XMLHttpRequest}) {
		this._XMLHttpRequest = XMLHttpRequest
	}
	
	supportedCountries() {
		return Q({
			countryCodes: supportedCountries
		})
	}
	
	area({countryCode, postalCode}) {
		if (_(supportedCountries).includes(countryCode)) {
			const deferred = Q.defer()
			const xhr = new this._XMLHttpRequest()
			xhr.onreadystatechange = () => {
				if (xhr.readyState == 4) {
					if (xhr.status == 200) {
						deferred.resolve(JSON.parse(xhr.responseText))
					} else {
						deferred.reject({
							code: 'invalid_postal_code',
							message: `invalid postal code for ${countryCode}: ${postalCode}`
						})
					}
				}
			}
			
			xhr.open('GET', getJsonUrl(countryCode, postalCode), true)
			xhr.send()
			
			return deferred.promise
		} else {
			return Q.reject({
				code: 'invalid_country',
				message: `invalid country: ${countryCode}`
			})
		}
	}
	
}
