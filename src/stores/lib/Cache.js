import Ax from '../Ax.js'
import FlashMsgs from '../FlashMsgs.js'
import Log from '../../Log'

import { conf } from "../../conf.js"


// TODO: should there be a lock so 2 versions of the same query don't run at
// once?
// REQUIREMENTS:
// items being cached must have the function unpackItemFromApi defined
export default class Cache {
	cachedItems = {}
	cachedTimes = {}
	flaggedForUpdate = new Set([])

	constructor(itemClass, getUrl, updateFieldUrl, uuidName) {
		// itemClass is the class of items which will be cached
		this.itemClass = itemClass
		this.getUrl = getUrl
		this.updateFieldUrl = updateFieldUrl
		this.uuidName = uuidName
	}

	setItem(uuid, item) {
		this.cachedItems[uuid] = item
		this.cachedTimes[uuid] = Date.now()
	}

	flagForUpdate(uuid) {
		this.flaggedForUpdate.add(uuid)
	}

	async deleteItem(uuid) {
		this.cachedItems[uuid] = null
	}

	shouldUpdate(uuid) {
		const timeDiff = (this.cachedTimes[uuid] - Date.now()) / 1000
		const updateInterval = 10  // seconds
		if (this.cachedItems[uuid] == null ||
				this.flaggedForUpdate.has(uuid) ||
				timeDiff > updateInterval
			 ) {
			return true
		}
		return false
	}

	async getItem(uuid) {
		if (this.shouldUpdate(uuid)) {
			this.cachedItems[uuid] = new this.itemClass()
			this.flaggedForUpdate.delete(uuid)
			this.cachedTimes[uuid] = Date.now()
			await this.getItemFromApi(uuid)
		} 
		//alert(JSON.stringify(this.cachedItems[uuid]))
		return this.cachedItems[uuid]
	}

	async getItemFromApi(uuid) {
		// TODO: Does this need to be handled better?
		if (uuid == null) {
			return
		}

		try{
			data = {}
			data[this.uuidName] = uuid
			var resp = await Ax.ax.post(this.getUrl, data)
			if (resp.data.i === conf["ACCEPTED"]) {
				this.unpackResponse(resp, uuid)
			} else {
				Log.warn("Response rejected: " + JSON.stringify(resp.status))
				FlashMsgs.unpackFlashMsgs(err.response.data)
			}
		} catch(err) {
			console.log(err)
			Log.warn("Response failed: " + JSON.stringify(data))
			FlashMsgs.addFlash("Failed to get response from API", "error")
		}
		return
	} 

	unpackResponse(resp, uuid) {
		// TODO: can this be handled better?
		if (resp.data.b !== undefined) {
			var body = JSON.parse(JSON.stringify(resp.data.b))
			this.cachedItems[uuid].unpackItemFromApi(body)
		} else {
			Log.warn(uuid + " did not return correctly formatted data")
		}
	}

}
