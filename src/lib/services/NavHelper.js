import { EventObject } from "../objects/EventObject.js"


export class NavHelperClass {
	event = new EventObject()

	setEvent(event) {
		this.event = event
	}

	getEvent() {
		return this.event
	}
}
