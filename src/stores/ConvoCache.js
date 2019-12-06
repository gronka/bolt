import { post } from "../lib/network.js"


class ConvoCache {
	// TODO: allow updating from push notifications
	convos = {}
	mostRecentTimestamp = {}
	lastViewed = {}
	flaggedForRefresh = new Set([])

	constructor() {
	}

	async pullMsgRange(convoUuid, startId, endId) {

		return
	}


}


export class Convo {
	convoUuid = ""
	msgs = []
	participants = []
	last_message = ""
	last_message_time = ""
	msg_count = 0  // for scrolling
	// TODO: do we need a latest message type?

	unpackItemFromApi(body) {
		let convo = body.convo
		this.convoUuid = convo.convoUuid
		this.messages = convo.messages
		this.last_message = convo.last_message
		this.last_message_time = convo.last_message_time
	}

	async getRecentMsgs() {
		data  = {
			convoUuid: this.convoUuid,
		}

		onResponse = (resp) => {
			this.unpackItemFromApi(resp.b)
		}

		post(this, "/convo/get.recent", data, onResponse)
	}
}


const singleton = new ConvoCache()
export default singleton
