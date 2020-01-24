// TODO: should there be a lock so 2 versions of the same query don't run at
// once?
// REQUIREMENTS:
// items being cached must have the function unpackItemFromApi defined
export default class Cache {
	constructor(Ctx, itemClass, getUrl) {
		this.Ctx = Ctx
		// itemClass is the class of items which will be cached
		this.itemClass = itemClass
		this.getUrl = getUrl
		this.cachedItems = {}
		this.cachedTimes = {}
		this.flaggedForUpdate = new Set([])
	}

	getEmptyItem() {
		return new this.itemClass(this.Ctx)
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

	async getItem(uuid, data={}) {
		if (this.shouldUpdate(uuid)) {
			this.cachedItems[uuid] = new this.itemClass(this.Ctx)
			this.flaggedForUpdate.delete(uuid)
			this.cachedTimes[uuid] = Date.now()
			await this.getItemFromApi(uuid, data)
		} 
		//alert(JSON.stringify(this.cachedItems[uuid]))
		return this.cachedItems[uuid]
	}

	async getItemFromApi(uuid, data) {
		// TODO: Does this need to be handled better?
		if (uuid == null) {
			return
		}

		onResponse = (resp) => {
			this.unpackResponse(resp, uuid)
		}

		const temp = new this.itemClass(this.Ctx)
		data[temp.uuidName] = uuid
		var resp = await this.Ctx.Ax.blindPost(this.getUrl, data, onResponse)

		return
	} 

	unpackResponse(resp, uuid) {
		// TODO: can this be handled better?
		if (resp.data.b != null && resp.data.b.item != null) {
			var item = JSON.parse(JSON.stringify(resp.data.b.item))
			this.cachedItems[uuid].unpackItemFromApi(item)
		} else {
			console.log(uuid + " did not return correctly formatted data")
		}
	}

}
