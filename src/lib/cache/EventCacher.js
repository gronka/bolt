import Cache from './Cache'
import { EventObject } from "../objects/EventObject.js"
//import EventListCache from './EventListCache'


export class EventCacher extends Cache {
	constructor(Ctx) {
		super(Ctx, EventObject, "/event/get")
		this.updateFieldUrl = "/event/field.update"
	}

	async cloneFromCache(uuid, clone) {
		let event = await this.getItem(uuid)
		//console.log(event)
		clone.setEventUuid(event.getEventUuid())
		clone.setTacUuid(event.getTacUuid())
		clone.setTitle(event.getTitle())
		clone.setQuickInfo(event.getQuickInfo())
		clone.setLongInfo(event.getLongInfo())
		clone.setTacName(event.getTacName())
		clone.setLat(event.getLat())
		clone.setLng(event.getLng())
		//clone.setTitle(event.getTitle())
		//clone.setTitle(event.getTitle())
		//clone.setTitle(event.getTitle())
		console.log(event.getTitle())
		console.log(clone.getTitle())
	}
}
