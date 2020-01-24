import Constants from 'expo-constants';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';

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


class UserLocation {
	// TODO: implement geolocation.watchPosition
	// TODO: localize the default lat/lng somehow

	constructor(Static) {
		this.speed = 0.0
		this.expiresAt = 0.0
		this.lat = Static.defaultLat
		this.lng = Static.defaultLng
	}

	async update() {
		// TODO: ask for geolocation position on app launch, or maybe put a banner
		// on the map
		try {
			var location = await Location.getCurrentPositionAsync()
		} catch(err) {
			console.log(err)
			alert("Error getting location, search results will be impacted.")
		}
		if (location.coords == null) {
			return
		}

		var oneMin = 1 * 60 * 1000
		this.expiresAt = Date.now() + oneMin
		this.speed = location.coords.speed
		this.lat = location.coords.latitude
		this.lng = location.coords.longitude
	}

	mustUpdate() {
		if (isNullFromStorage(this.lat) ||
				isNullFromStorage(this.lng) ||
			  isNullFromStorage(this.expiresAt)) {
			return true
		} else {
			// TODO: check this
			var now = Date.now()
			if (now > this.expiresAt) {
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


export class StorageService {
	constructor(Static) {
		// Items to save to disk
		this.userUuid = ""
		this.jwt = ""
		this.language = ""

		this.loc = new UserLocation(Static)

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
			this.loc.expiresAt  = await AsyncStorage.getItem("locExpiresAt")  
			if (this.loc.mustUpdate()) {
				this.loc.update()
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
