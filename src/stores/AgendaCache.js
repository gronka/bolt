import Cache from './lib/Cache'
import { conf } from "../conf.js"


class AgendaCache extends Cache {
	// Note: an AgendaCache uuid is a combination of the userUuid and the date 
	// of the agenda
	async getAgenda(userUuid, year, month, day) {
		//var agendaUuid = [userUuid, year, month, day].join("_")
		//this.getItem(agendaUuid)
		var agenda = new Agenda()
		//console.log(agenda)
		var item = new AgendaItem()
		item.status = 2
		agenda.items.push(item)
		agenda.items.push(item)
		return agenda
	}
}


class Agenda {
	constructor() {
		// TODO: load hourLabel list from config
		//this.totalPending = 0
		//this.totalConfirmed = 0
		this.items = []
	}
}

function makeTimeLabel(format, time, tzOffset) {
	var timeLabel = ""
	var localTime = time + tzOffset
	var hour = localTime.getHours()
	var minute = localTime.getMinutes()
	if (format === "standard") {
		var suffix = " AM"
		if (hour > 12) {
			suffix = " PM"
			hour = hour - 12
		}
		timeLabel = hour + ":" + minute + suffix
	} else {
		timeLabel = hour + ":" + minute
	}
	return timeLabel
}

class AgendaItem {
	constructor() {
		this.time = new Date()
		this.timeLabel = this.time.getHours() + ":" + this.time.getMinutes()
		this.apptUuid = "apptUuidNotSet"
		this.status = 0
	}


	unpackItemFromApi(body) {
		let item = body.item
		this.startTime = item.startTime
		this.endTime = item.endTime
		this.tzOffset = item.tzOffset

		this.startTimeLabel = makeTimeLabel(conf.tzFormat, this.startTime, this.tzOffset)
		this.endTimeLabel = makeTimeLabel(conf.tzFormat, this.endTime, this.tzOffset)
	}
}


const singleton = new AgendaCache(
	Agenda, 
	"/user/get", 
	"/user/field.update",
	"userUuid")
export default singleton
