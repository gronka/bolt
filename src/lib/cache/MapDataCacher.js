export class MapDataCacher {
	contructor(Ctx) {
		this.lat = Ctx.Storage.loc.getLat()
		this.lng = Ctx.Storage.loc.getLng()
		this.defaultLatDelta = Ctx.Conf.defaultLatDelta
		this.defaultLngDelta = Ctx.Conf.defaultLngDelta

	}

	getLat() {
		return this.lat
	}

	getLng() {
		return this.lng
	}
}
