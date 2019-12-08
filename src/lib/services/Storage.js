import { AsyncStorage } from "react-native"


function isNullFromStorage(value) {
	if (value == null) {
		return true
	}
	
	if (value === "undefined") {
		return true
	}

	return false
}


class Location {
	// TODO: implement geolocation.watchPosition
	timestamp = 0.0
	speed = 0
	// TODO: localize the default lat/lng somehow
	enabled = false

	constructor(Static) {
		this.lat = Static.defaultLat
		this.lng = Static.defaultLng
	}

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

	setLat(p) {
		if (p == null) {
			return
		}
		this.lat = p
	}
	getLat() {
		return this.lat
	}

	setLng(p) {
		if (p == null) {
			return
		}
		this.lng = p
	}
	getLng() {
		return this.lng
	}

}


class Storage {
	constructor(Static) {
		// Items to save to disk
		this.userUuid = ""
		this.jwt = ""
		this.language = ""

		this.loc = new Location(Static)

	}

	getUserUuid() {
		return this.userUuid
	}
17
	isSignedIn() {
		if (this.userUuid) {
			return true
		}
		return false
	}


	async loadFromDisk() {
		const userUuid = await AsyncStorage.getItem("userUuid")
		if (userUuid !== null) {
			this.userUuid = userUuid
			this.jwt  = await AsyncStorage.getItem("jwt")  // jwtProxy

			this.loc.setLat(await AsyncStorage.getItem("lat"))
			this.loc.setLng(await AsyncStorage.getItem("lng"))
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
		this.Ctx.Ax.signOut()
		await AsyncStorage.clear()
	}
}
