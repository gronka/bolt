import Storage from "./Storage.js"
import { conf } from "../conf.js"


class MapData {
	lat = Storage.loc.getLat()
	lng = Storage.loc.getLng()
	defaultLatDelta = conf.defaultLatDelta
	defaultLngDelta = conf.defaultLngDelta

	getLat() {
		return this.lat
	}

	getLng() {
		return this.lng
	}
}


export const EventMapData = new MapData()
export const RestaurantMapData = new MapData()
