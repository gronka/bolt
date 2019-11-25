import { conf } from "../conf.js"
import Ax from "../stores/Ax.js"

import { 
	AddressValue,
	TitleValue,
	VenueValue,
	LatValue,
	LngValue,
} from "./DataValues.js"


class OneshotterTrafficController {
	// Note: a oneshotter is a controller in which a data request against the API
	// will always return the same result. This allows us to simply logic and
	// number of network requests because results never become invalid
	constructor(endpoint) {
		this.endpoint = endpoint
		this.requests = {}
	}

	async request(uuid, data) {
		// If a similar request exists, don't add this one
		if (this.requests[uuid] == null) {
			this.requests[uuid] = new RequestHandler(this.endpoint, data)
			const dummy = await this._sendRequest(uuid)
		}
		return this.requests[uuid]
	}

	cancelRequest(uuid) {
		if (this.requests[uuid] != null) {
			this.requests[uuid].setStatus("cancelled")
		}
	}

	async _sendRequest(uuid) {
		var req = this.requests[uuid]
		var resp = {}
		if (req.status !== "cancelled") {
			req.status = "waitingResponse"
			try {
				resp = await Ax.ax.post(req.endpoint, req.data)
			} catch(err) {
				console.log(err)
				FlashMsgs.addFlash(req.errorMsg, "error")
				req.status = "failed"
			}

			if (resp.data.i === conf["ACCEPTED"]) {
				if (req.status === "waitingResponse") {
					// Note: we might not want to save the response if the uuid does not
					// exist. However, for a oneshotter I think it won't matter
					//console.log(resp.data.b)
					console.log("+++++++resp got++++++++")
					//req.response = resp
					req.status = "received"
					req.response = resp
				}

			} else {
				console.log("Response rejected: ")
			}
		}
		// TODO: what to return if request had been cancelled?
		return "dummy"
	}
}


class RequestHandler {
	constructor(endpoint, data) {
		this.endpoint = endpoint
		this.response = {}
		// Status values:
		// initialized
		// waitingResponse -> response will only update if this status is active
		// received
		// failed
		// cancelled
		this.status = "initialized"
		this.errorMsg = "Handler failed to get response from API"

		// data is the data sent to the server
		this.data = data
	}

	setErrorMsg(msg) { this.errorMsg = msg}
	setStatus(status) { this.status = status}
}


class RequestDataObject {
	getUuid() {
		throw("this function must be overwritten")
	}
}


export class AddressDataObj extends RequestDataObject {
	address = new AddressValue("")
	lat = new LatValue(0)
	lng = new LngValue(0)
	// matched let's us know if lat/lng matches google maps address
	matches = ""

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
}


export const PlacesAutocompleteOneshotter = new OneshotterTrafficController("/places/autocomplete")
