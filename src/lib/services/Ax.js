import axios from 'axios'
//import { NavigationActions } from "react-navigation"


class Command {
	contructor(kind="", instruction="") {
		this.kind = kind
		this.instruction = instruction

		// TODO: is command being used at all? can we remove it?
		// Items that do not need to be saved
		this.command = new Command()
	}
}

export class AxService {
	constructor(Static, FlashMsgs) {
		this.Static = Static
		this.FlashMsgs = FlashMsgs
		console.log(this.FlashMsgs)
		this.remakeAxios("")
	}

	makeAxiosWithDefaults(jwt) {
		this.ax = axios.create({
			baseURL: this.Static["kapi"],
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json',
				'Authorization': jwt,
			}
		})
	}

	setAxiosInterceptors() {
		this.ax.interceptors.response.use(
			(resp) => {
				if (resp.data == null) {
					this.FlashMsgs.addFlash("api response body was null", "error")
				} else {
					// COMMENT: capture interesting data from kapi
					this.FlashMsgs.unpackFlashMsgs(resp.data)
					this.unpackCommand(resp.data)
				}
				return Promise.resolve(resp)
			}, 

			(err) => {
				this.FlashMsgs.addFlash("Network Error", "error")
				//alert(JSON.stringify(err))
				//this.FlashMsgs.unpackFlashMsgs(err.response.data)
				return Promise.reject(err)
			});

	}

	remakeAxios(jwt) {
		this.makeAxiosWithDefaults(jwt)
		this.setAxiosInterceptors()
	}

	post(endpoint, data) {
		return this.ax.post(endpoint, data)
	}

	// TODO
	// TODO: sort these unorganized functions
	//async simplePost(endpoint, data) {
		//try {
			//const resp = await this.ax.post(endpoint, data)
		//} catch (err) {
			//// TODO: pass onError?
			//console.log(err)
			//this.FlashMsgs.addFlash("Failed to get response from API", "error")
		//}

		//if (resp.data.i === this.Static["ACCEPTED"]) {
			//onResponse(resp)
		//} else {
			//console.log("Response rejected: " + JSON.stringify(resp.status))
			//this.FlashMsgs.unpackFlashMsgs(err.response.data)
		//} 
		//return resp
	//}


	submitWithLoading(component, endpoint, data, onResponse) {
		component.setState({
			loading: true
		})

		this.post(endpoint, data)
		.then((resp) => {
			onResponse(resp)
		})
		.catch((error) => {
			// TODO: pass onError?
			console.log(error)
		})

		// TODO: put timeout on this setState
		component.setState({
			loading: false
		})
	}


	async blindPost(endpoint, data, onResponse) {
		this.ax.post(endpoint, data)
		.then((resp) => {
			if (resp.data.i === this.Static["ACCEPTED"]) {
				onResponse(resp)
			} else {
				console.log("Response rejected: " + JSON.stringify(resp.status))
				this.FlashMsgs.unpackFlashMsgs(err.response.data)
			}
		})
		.catch((err) => {
			// TODO: pass onError?
			console.log(err)
			this.FlashMsgs.addFlash("Failed to get response from API", "error")
		})
		return
	}


	blindGet(endpoint, onResponse) {
		this.ax.get(endpoint)
		.then((resp) => {
			onResponse(resp)
		})
		.catch((err) => {
			// TODO: pass onError?
			console.log(err)
		})
	}


	getCommand() {
		return this.command
	}
	signOut() {
		this.command = new Command()
	}

	unpackCommand(b) {
		if (b.command != null) {
			if (b.command !== "") {
				this.command = new Command()
				this.command.kind = b.command.kind
				this.command.instruction = b.command.instruction
			}
		}
	}

	processCommand(nav) {
		if (this.command.kind === this.Static["REDIRECT"]) {
			//alert(this.command.instruction)
			nav.navigate(this.command.instruction)
		}

		// TODO: should we perform this action if command doesn't exist?
		//const ALL_COMMANDS = Object.values(this.Static["COMMANDS"])
		//if (! (ALL_COMMANDS.indexOf(this.command) > -1) ) {
			//// RELEASE_CHECK: should we do something more severe if the command is
			//// not recognized?
			//this.command = ""
		//}
	}
}
