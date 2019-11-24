class OneshotterTrafficController {
	constructor(endpoint) {
		this.endpoint = endpoint
		this.requests = {}
	}

	async request(data) {
		this.prepareRequest(data)
		await this.sendRequest(data)
		return this.getResponse(data)
	}

	prepareRequest(data) {
		const uuid = this.getUuid(data)
		// If a similar request exists, don't add this one
		if (!this.requests[uuid]) {
			this.requests[uuid] = new RequestHandler(this.endpoint)
			this.requests[uuid].setData(data)
		}
	}

	cancelRequest(data) {
		const uuid = this.getUuid(data)
		this.requests[uuid].setStatus("cancelled")
	}

	async sendRequest(data) {
		const uuid = this.getUuid(data)
		var req = this.requests[uuid]
		req.status = "sent"
		Ax.ax.post(this.endpoint, req.data)
		.then((resp) => {
			if (resp.data.i === conf["ACCEPTED"]) {
				if (this.req.status === "waitingResponsee") {
					this.req.response = resp
					this.req.status = "received"
				}

			} else {
				if (this.req.status === "waitingResponsee") {
					Log.warn("Response rejected: " + JSON.stringify(resp.status))
					FlashMsgs.unpackFlashMsgs(err.response.data)
					this.req.status = "failed"
				}
			}
		})
		.catch((err) => {
			if (this.status === "waitingResponsee") {
				// TODO: pass onError?
				console.log(err)
				FlashMsgs.addFlash(this.req.errorMsg, "error")
				this.req.status = "failed"
			}
		})
		return
	}

	getResponse (data) {
		const uuid = this.getUuid(data)
		return this.requests[uuid].response
	}
}


class RequestHandler {
	constructor(endpoint) {
		this.endpoint = endpoint
		this.response = {}
		// Status values:
		// initialized
		// waitingResponsee -> response will only update if this status is active
		// received
		// failed
		// cancelled
		this.status = "initialized"
		this.errorMsg = "Handler failed to get response from API"

		// Data object
		this.data = {}
	}

	setData(data) { this.data = data }
	setErrorMsg(msg) { this.errorMsg = msg}
	setStatus(status) { this.status = status}
}


class RequestDataObject {
	getUuid() {
		throw("this function must be overwritten")
	}
}


export class PlacesAutocompleteData extends RequestDataObject {
	input = ""
	latLngString = ""

	getUuid() {
		return input + latLngString
	}

	packaged() {
		return {
			input: this.input,
			latLngString: this.latLngString
		}
	}
}
