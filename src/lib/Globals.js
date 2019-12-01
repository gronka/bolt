import { AddressDataObject } from "./DataObjects.js"
import { OneshotterTrafficController } from "./RequestHandlers.js"


export function asLocation(lat, lng) {
	return {
		latitude: lat,
		longitude: lng,
	}
}


export const NewTacObj = new AddressDataObject()

export const MapsacAutocompleteOneshotter = new OneshotterTrafficController("/mapsac/predictions")
export const MapsacLookupOneshotter = new OneshotterTrafficController("/mapsac/lookup.byPlaceId")

export const AddTacController = new OneshotterTrafficController("/tac/add")
export const GetTacsController = new OneshotterTrafficController("/tac/get.byUserUuid")
