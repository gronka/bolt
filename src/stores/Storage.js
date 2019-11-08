import { AsyncStorage } from "react-native"
import { NavigationActions } from "react-navigation"

import { conf } from "../conf.js"


function isNullFromStorage(value) {
	if (value == null) {
		return true
	}
	
	if (value === "undefined") {
		return true
	}

	return false
}


class Command {
	contructor(kind="", instruction="") {
		this.kind = kind
		this.instruction = instruction
	}
}


class Location {
	// TODO: implement geolocation.watchPosition
	timestamp = 0.0
	speed = 0
	lat = -999.9
	lng = -999.9
	enabled = false

	async update() {
		await navigator.geolocation.getCurrentPosition(
			position => {
			this.loc = JSON.stringify(position)
			this.timestamp = position.timestamp
			this.speed = position.coords.speed
			this.lat = position.coords.latitude
			this.lng = position.coords.longitude
			this.enabled = true
		},
		error => {
			alert("Error getting location, search results will be impacted.")
		})
	}

	mustUpdate() {
		// TODO: separate function for mustUpdate and isValid?

		if (isNullFromStorage(this.lat) ||
				isNullFromStorage(this.lng) ||
			  isNullFromStorage(this.timestamp)) {
			return true
		} else {
			// TODO: check this
			let fiveMins = 5 * 60 * 1000
			let timeDiff = this.timestamp - fiveMins
			if (timeDiff < 0) {
				return true
			}
		}

		return false
	}

	isValid() {
		if (this.lat === -999.9 || this.lng === -999.9) {
			return false
		}
		return true
	}
}


class Storage {
	constructor() {
		// Items to save to disk
		this.userUuid = ""
		this.jwt = ""
		this.language = ""

		this.loc = new Location()

		// Items that do not need to be saved
		this.command = new Command()
	}

	getUserUuid() {
		return this.userUuid
	}

	isSignedIn() {
		if (this.userUuid) {
			return true
		}
		return false
	}

	getCommand() {
		return this.command
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
		if (this.command.kind === conf["REDIRECT"]) {
			//alert(this.command.instruction)
			nav.navigate(this.command.instruction)
		}

		// TODO: should we perform this action if command doesn't exist?
		//const ALL_COMMANDS = Object.values(conf["COMMANDS"])
		//if (! (ALL_COMMANDS.indexOf(this.command) > -1) ) {
			//// RELEASE_CHECK: should we do something more severe if the command is
			//// not recognized?
			//this.command = ""
		//}
	}

	async loadFromDisk() {
		const userUuid = await AsyncStorage.getItem("userUuid")
		if (userUuid !== null) {
			this.userUuid = userUuid
			this.jwt  = await AsyncStorage.getItem("jwt")  // jwtProxy

			this.loc.lat  = await AsyncStorage.getItem("lat")  
			this.loc.lng  = await AsyncStorage.getItem("lng")  
			this.loc.timestamp  = await AsyncStorage.getItem("locTimestamp")  
			if (this.loc.mustUpdate()) {
				this.loc.update()
			} else {
				this.enabled = true
			}

		} else {
			// not signed in
		}
	}

	async signIn(userUuid, jwt) {
		// jwt and userUuid are required
		this.jwt = jwt  // jwtProxy
		this.userUuid = userUuid

		await AsyncStorage.setItem("userUuid", userUuid)
		await AsyncStorage.setItem("jwt", jwt)
	}

	async signOut() {
		this.jwt = ""  // jwtProxy
		this.userUuid = ""
		this.command = new Command()
		await AsyncStorage.clear()
	}
}


const singleton = new Storage()
export default singleton
