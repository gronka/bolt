import { post } from "../lib/network.js"


class ConvoSummaryCache {
	_recentConvos = {}
	recentConvosSorted = []
	lastUpdateTime = {}

	// TODO: how to handle paging?
	async pullRecentConvos() {
		data  = {
			apparentUuid: Storage.userUuid,
		}

		onResponse = (resp) => {
			convos = resp.b.results
			for (var i = 0; i < convos.length; i++) {
				this._recentConvos[convos[i].convoUuid] = convos[i]
			}
			lastUpdateTime = Date.now()
		}

		post(this, "/convo/get.recent", data, onResponse)
		return this.getRecentConvosSorted()
	}

	getRecentConvosSorted() {
		this.recentConvosSorted = []
		for (const convo of this._recentConvos) {
			this.recentConvosSorted.append(convo)
		}

		// this should sort with newest first
		this.recentConvosSorted.sort(function(a, b) {
			return b.last_message_time - a.last_message_time
		})

		return this.recentConvosSorted
	}
}


const singleton = new ConvoSummaryCache()
export default singleton
