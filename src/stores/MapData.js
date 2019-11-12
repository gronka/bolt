import Storage from "./Storage.js"
import { conf } from "../conf.js"


class MapData {
	lat = conf.defaultLat
	lng = conf.defaultLng

	getLat() {
		console.log("getting lat")
		console.log("this.lat: " + this.lat)
		console.log("Storage.loc.getLat(): " + this.lat)
		if (this.lat === conf.defaultLat) {
			console.log("returning Storage.loc.lat")
			return Storage.loc.getLat()
		}
		console.log("returning this.lat")
		return this.lat
	}

	getLng() {
		if (this.lng === conf.defaultLng) {
			return Storage.loc.getLng()
		}
		return this.lng
	}
}


export const EventMapData = new MapData()
export const RestaurantMapData = new MapData()
