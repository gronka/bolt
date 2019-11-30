import { RequestDataObject } from "./RequestHandlers.js"
import { 
	AddressValue,
	TitleValue,
	VenueValue,
	LatValue,
	LngValue,
} from "./DataValues.js"
import Storage from "../stores/Storage.js"


export class AddressDataObject extends RequestDataObject {
	constructor() {
		super()
		this.address = new AddressValue("")
		this.lat = new LatValue(0)
		this.lng = new LngValue(0)
		this.venue = new VenueValue("")
		this.hasLocation = false

		// properties to match google maps
		this.ggLat = 0
		this.ggLng = 0
		this.ggPlaceId = ""
		this.ggFormattedAddress = ""
		//distanceMeters = 0  // might not actually be useful (yet)
		this.ggName = ""
		this.mapsUrl = ""
	}

	reinit() {
		this.constructor()
	}

	reinitToUserLoc() {
		this.reinit()
		this.setLat(Storage.loc.getLat())
		this.setLng(Storage.loc.getLng())
	}

	getUuid() {
		return this.getInput() + this.getLatLngString()
	}

	getInput() {
		// input is for google places autocomplete
		return this.address.value
	}

	getLatLngString() {
		// latLngString is for google places autocomplete
		if (this.lat.value !== 0 && this.lng.value !== 0){
			return this.lat.value + "," + this.lng.value
		}
		return ""
	}

	setVenue(p) { this.venue.setAndValidate(p) }
	getVenue() { return this.venue.value }

	setAddress(p) { this.address.setAndValidate(p) }
	getAddress() { return this.address.value }

	setLat(p) { this.lat.setAndValidate(p) }
	getLat() { return this.lat.value }
	setLng(p) { this.lng.setAndValidate(p) }
	getLng() { return this.lng.value }

	asPlacesAutocompleteJson() {
		return {
			input: this.getInput(),
			latLngString: this.getLatLngString(),
		}
	}

	setFromPlaces(place) {
		const lat = place.geometry.location.lat
		const lng = place.geometry.location.lng

		this.setAddress(place.formatted_address)
		this.setLat(lat)
		this.setLng(lng)

		this.ggFormattedAddress = place.formatted_address
		this.ggLat = lat
		this.ggLng = lng
		this.ggPlaceId = place.place_id
		this.mapsUrl = place.url

		this.hasLocation = true
	}
}
