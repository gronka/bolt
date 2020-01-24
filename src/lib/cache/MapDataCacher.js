import Cache from "./Cache"
import Geohash from "../Geohash.js"


export class MapDataCacher {
	constructor(Ctx) {
		this.lat = Ctx.Storage.loc.getLat()
		this.lng = Ctx.Storage.loc.getLng()
		this.defaultLatDelta = Ctx.Conf.defaultLatDelta
		this.defaultLngDelta = Ctx.Conf.defaultLngDelta
		this.pinCache = new PinCacher(Ctx)
	}

	getLat() {
		return this.lat
	}

	getLng() {
		return this.lng
	}

	async getPinsFromApi(region) {
		const cacheId = this.genPinCacheId(region)
		console.log("cacheId: " + cacheId)
		var data = {
			lat: region.latitude,
			lng: region.longitude,
			latDelta: region.latitudeDelta,
			lngDelta: region.longitudeDelta,
			timestamp: Date.now()
		}
		var pinGroup = await this.pinCache.getItem(cacheId, data)
		console.log("pinGroup: " + JSON.stringify(pinGroup))
		return pinGroup
	}

	genPinCacheId(region) {
		// todo: find zoom and relevant geohash
		const zoom = getZoomIdxFromDeltas(region.latitudeDelta, region.longitudeDelta)
		const bitgeohash = Geohash.encode(region.latitude, region.longitude, zoom)
		const cacheId = zoom.toString() + bitgeohash
		return cacheId
	}
}

function getZoomIdxFromDeltas(latDelta, lngDelta) {
	var zoomIdx, latZoom, lngZoom = 0
	var latCurrent = latDelta
	var lngCurrent = lngDelta

	var latStart = 180.0
	while(latStart > latCurrent) {
		latZoom++
		latCurrent = latCurrent * 2
	}

	// repeat process for lngZoom
	var lngStart = 360.0
	while(lngStart > lngCurrent) {
		lngZoom++
		lngCurrent = lngCurrent * 2
	}

	if (latZoom <= lngZoom) {
		zoomIdx = latZoom
	} else {
		zoomIdx = lngZoom
	}
	zoomIdx++
	return zoomIdx
}


class PinCacher extends Cache {
	constructor(Ctx) {
		super(Ctx, PinGroups, "/pinGroup/search.byRegion")
	}
}


class PinGroups {
	constructor() {
		this.uuidName = "cacheId"
		this.pinGroups = {}
	}

	unpackItemFromApi(body) {
		this.pinGroups = body.pinGroups
		console.log(this.pinGroups)
		// TODO: make a this.paginate function which parses and orders response
		// into pages for user browsing convenience
	}
}
