import Cache from './Cache'
import { EventObject } from "../objects/EventObject.js"
//import EventListCache from './EventListCache'


export class EventCacher extends Cache {
	constructor(Ctx) {
		super(Ctx, EventObject, "/event/get")
		this.updateFieldUrl = "/event/field.update"
	}
}
