/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  */
/* Geohash encoding/decoding and associated functions   
	* based on code from (c) Chris Veness 2014-2019 / MIT Licence, but looks
	* almost nothing like it
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  */

const base32 = '0123456789bcdefghjkmnpqrstuvwxyz'; // (geohash-specific) Base32 map

/**
 * Geohash: Algorithm based on Gustavo Niemeyer’s geocoding system.
 */
class Geohash {

	/**
	 * Encodes latitude/longitude to a binary geohash to a specified precision 
	 *
	 * @param   {number} lat - Latitude in degrees.
	 * @param   {number} lng - Longitude in degrees.
	 * @param   {number} [bitPrecision] - Number of binary characters in resulting geohash.
	 * @returns {string} Geohash of supplied latitude/longitude.
	 * @throws  Invalid geohash.
	 *
	 * @example
	 *     const geohash = Geohash.encode(52.205, 0.119, 7); // => '? something
	 *     binary...'
	 */
	static encode(lat, lng, zoom) {
		bitPrecision = Number(zoom) * 2

		if (isNaN(lat) || isNaN(lng) || isNaN(bitPrecision)) throw new Error('Invalid geohash')

		let bitgeohash = ''

		let latMin =  -90, latMax =  90
		let lngMin = -180, lngMax = 180

		while (bitgeohash.length < bitPrecision) {
			// bisect E-W longitude
			const lngMid = (lngMin + lngMax) / 2
			if (lng >= lngMid) {
				bitgeohash += "1"
				lngMin = lngMid
			} else {
				bitgeohash += "0"
				lngMax = lngMid
			}

			// bisect N-S latitude
			const latMid = (latMin + latMax) / 2
			if (lat >= latMid) {
				bitgeohash += "1"
				latMin = latMid
			} else {
				bitgeohash += "0"
				latMax = latMid
			}

		}

		return bitgeohash
	}

}

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  */

export default Geohash;

