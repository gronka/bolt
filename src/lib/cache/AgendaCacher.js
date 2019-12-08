import Cache from './Cache.js'
import { makeTimeLabel } from "../helpers.js"


export class AgendaCacher extends Cache {
	constructor(Ctx) {
		super(Ctx, Agenda, "/agenda/get")
	}

	// Note: an AgendaCache uuid is a combination of the userUuid and the date 
	// of the agenda
	async getAgenda(userUuid, year, month, day) {
		//var agendaUuid = [userUuid, year, month, day].join("_")
		//this.getItem(agendaUuid)
		var agenda = new Agenda()
		//console.log(agenda)
		var item = new AgendaItem(this.Ctx)
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

class AgendaItem {
	constructor(Ctx) {
		this.Ctx = Ctx
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

		this.startTimeLabel = makeTimeLabel(this.Ctx.Conf.tzFormat, this.startTime, this.tzOffset)
		this.endTimeLabel = makeTimeLabel(this.Ctx.Conf.tzFormat, this.endTime, this.tzOffset)
	}
}
