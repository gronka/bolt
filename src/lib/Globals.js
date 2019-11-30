import { AddressDataObject } from "./DataObjects.js"


export function asLocation(lat, lng) {
	return {
		latitude: lat,
		longitude: lng,
	}
}


export const NewVenueObj = new AddressDataObject()
