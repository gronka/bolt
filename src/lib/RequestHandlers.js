import { conf } from "../conf.js"
import Ax from "../stores/Ax.js"
import FlashMsgs from "../stores/FlashMsgs.js"


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

	async requestWithLoading(uuid, data, component) {
		component.setState({
			loading: true
		})

		var response = await this.request(uuid, data)

		console.log(response)
		if (response.code !== 200) {
			FlashMsgs.append("Request might have failed, you might have to try again.")
			this.requests[uuid] = null
		}

		component.setState({
			loading: false
		})

		return response
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


export class RequestDataObject {
	getUuid() {
		throw("this function must be overwritten")
	}
}


export const PlacesAutocompleteOneshotter = new OneshotterTrafficController("/places/predictions")
export const PlacesLookupOneshotter = new OneshotterTrafficController("/places/lookup.byPlaceId")

export const AddVenueController = new OneshotterTrafficController("/places/lookup.byPlaceId")