export class EventListCache {
	constructor(Ctx) {
		this.Ctx = Ctx
		this.list = []
		this.expiresAt = 0
		this.throttleTime = 0
	}

	setList(list) {
		if (list === null) {
			list = []
		} else {
			this.expiresAt = this.Ctx.getExpireTime()
		}
		this.list = list
		this.prepForListView()
	}
	getList() {
		return this.list
	}

	shouldUpdate() {
		const now = new Date().getTime()
		if (now > this.expiresAt || this.list === []) {
			if (now > this.throttleTime) {
				this.throttleTime = this.Ctx.getThrottleTime()
				return true
			}
		}
		return false
	}

	prepForListView() {
		this.list.sort((a, b) => (a.startTime > b.startTime) ? 1 : -1)
		this.list.forEach((event, idx) => {
			const nowMilli = new Date().getTime()
			if ( nowMilli > event.startTime ) {
				event.isOccuringNow = true
			}
		})
	}

}
