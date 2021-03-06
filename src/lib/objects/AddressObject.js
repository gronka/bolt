import { RequestObject } from "../RequestHandlers.js"
import { 
	AddressValue,
	LatValue,
	LngValue,
	NameValue,
	QuickInfoValue,
	DateValue,
	TitleValue,
} from "./DataValues.js"


export class AddressObject extends RequestObject {
	constructor(Ctx) {
		super(Ctx)
		this.Ctx = Ctx
		this.uuid = ""
		this.address = new AddressValue("")
		this.lat = new LatValue(0)
		this.lng = new LngValue(0)
		this.name = new NameValue("")
		this.hasLocation = false

		// properties to match google maps
		this.ggLat = 0
		this.ggLng = 0
		this.ggPlaceId = ""
		this.ggFormattedAddress = ""
		//distanceMeters = 0  // might not actually be useful (yet)
		this.ggName = ""
		this.mapsUrl = ""
		this.tzOffset = 0
	}

	reinit() {
		this.constructor(this.Ctx)
	}

	reinitToUserLoc() {
		this.reinit()
		const userLat = this.Ctx.Storage.loc.getLat()
		const userLng = this.Ctx.Storage.loc.getLng()
		this.setLat(userLat)
		this.setLat(userLng)
		//this.setLat(this.Ctx.Storage.loc.getLat())
		//this.setLng(this.Ctx.Storage.loc.getLng())
	}

	getReqUuid() {
		// overwritten from RequestObjects
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

	isValidForSetLocation() {
		if (!this.name.isValid()) {
			this.Ctx.FlashMsgs.addFlash("Name is not valid.", "error")
			return false
		}

		if (!this.address.isValid()) {
			this.Ctx.FlashMsgs.addFlash("Address is not valid.", "error")
			return false
		}
		return true
	}

	setName(p) { this.name.setAndValidate(p) }
	getName() { return this.name.value }

	setAddress(p) { this.address.setAndValidate(p) }
	getAddress() { return this.address.value }

	setLat(p) { this.lat.setAndValidate(p) }
	getLat() { return this.lat.value }
	setLng(p) { this.lng.setAndValidate(p) }
	getLng() { return this.lng.value }

	asMapsacAutocompleteJson() {
		return {
			input: this.getInput(),
			latLngString: this.getLatLngString(),
		}
	}

	asAddTacJson() {
		return {
			name: this.getName(),
			address: this.getAddress(),
			lat: this.getLat(),
			lng: this.getLng(),
			latLngString: this.getLatLngString(),
			ggPlaceId: this.ggPlaceId,
			ggName: this.ggName,
			ggFormattedAddress: this.ggFormattedAddress,
			ggLat: this.ggLat,
			ggLng: this.ggLat,
			mapsUrl: this.mapsUrl,
			tzOffset: this.tzOffset,
		}
	}

	setFromMapsac(place) {
		const lat = place.geometry.location.lat
		const lng = place.geometry.location.lng

		this.setAddress(place.formatted_address)
		this.setLat(lat)
		this.setLng(lng)

		this.ggFormattedAddress = place.formatted_address
		this.ggLat = lat
		this.ggLng = lng
		this.ggName = place.name
		this.ggPlaceId = place.place_id
		this.mapsUrl = place.url
		this.tzOffset = place.utc_offset

		this.hasLocation = true
	}
}
