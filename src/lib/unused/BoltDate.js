import { conf } from "../conf.js"


// TODO: I think we need to create some sort of Date manager that can handle
// all date objects and reset or force rerender them as user makes config
// changes
//
// Date uses:
// Calendar - local or user set TZ
// Browsing events
// Map of events - TZ of location being viewed


export class BoltDate {
	constructor() {
		this.date = new Date(Date.UTC())
		// TODO: determine user timezone
		//this.tzOffset = 
	}
}
