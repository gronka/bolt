import { RequestObject } from "../RequestHandlers.js"
import { 
	AddressValue,
	LatValue,
	ListValue,
	LngValue,
	LongInfoValue,
	NameValue,
	QuickInfoValue,
	DateValue,
	TitleValue,
} from "./DataValues.js"


export class EventObject extends RequestObject {
	constructor(Ctx) {
		super(Ctx)
		this.uuidName = "eventUuid"

		this.eventUuid = ""
		this.title = new TitleValue()
		this.address = new AddressValue()
		this.lat = new LatValue()
		this.lng = new LngValue()
		this.tacName = new NameValue()
		this.tzOffset = 0
		this.startTime = new DateValue()
		this.endTime = new DateValue()
		this.quickInfo = new QuickInfoValue()
		this.longInfo = new LongInfoValue()

		this.admins = new ListValue()
		this.organizers = new ListValue()
		// TODO:?
		//this.organizerGroups = []
		//this.promoters = []
	}

	canUserOrganize() {
		const userUuid = this.Ctx.Storage.userUuid
		const admins = this.getAdmins()
		const organizers = this.getOrganizers()
		if (admins.indexOf(userUuid) > -1 || 
				organizers.indexOf(userUuid) > -1) {
			return true
		}
		return false
	}

	canUserAdmin() {
		const userUuid = this.Ctx.Storage.userUuid
		const admins = this.getAdmins()
		if (admins.indexOf(userUuid) > -1) {
			return true
		}
		return false
	}

	reinit() {
		this.constructor()
	}

	getUuid() {
		// overwritten from RequestObjects
		return this.getTitle() + this.getAddress()
	}

	setEventUuid(p) { this.eventUuid = p }
	getEventUuid() { return this.eventUuid }

	setAdmins(p) { this.admins.setAndValidate(p) }
	getAdmins() { return this.admins.value }

	setOrganizers(p) { this.organizers.setAndValidate(p) }
	getOrganizers() { return this.organizers.value }

	setTitle(p) { this.title.setAndValidate(p) }
	getTitle() { return this.title.value }

	setTacName(p) { this.tacName.setAndValidate(p) }
	getTacName() { return this.tacName.value }

	setAddress(p) { this.address.setAndValidate(p) }
	getAddress() { return this.address.value }

	setLat(p) { this.lat.setAndValidate(p) }
	getLat() { return this.lat.value }
	setLng(p) { this.lng.setAndValidate(p) }
	getLng() { return this.lng.value }

	setTzOffset(p) { this.tzOffset = p }
	getTzOffset() { return this.tzOffset }

	setStartTime(p) { this.startTime.setAndValidate(p) }
	getStartTime() { return this.startTime.value }
	setEndTime(p) { this.endTime.setAndValidate(p) }
	getEndTime() { return this.endTime.value }

	setQuickInfo(p) { this.quickInfo.setAndValidate(p) }
	getQuickInfo() { return this.quickInfo.value }

	setLongInfo(p) { this.longInfo.setAndValidate(p) }
	getLongInfo() { return this.longInfo.value }

	setFromTac(tac) {
		this.update()
		this.setEventUuid(tac.tacUuid)
		this.setTacName(tac.name)
		this.setLat(tac.lat)
		this.setLng(tac.lng)
		this.setAddress(tac.address)
		this.setTzOffset(tac.tzOffset)
	}

	getLocation() {
		return {
			latitude: this.getLat(),
			longitude: this.getLng(),
		}
	}

	asCreateEventJson() {
		return {
			title: this.getTitle(),
			address: this.getAddress(),
			tacName: this.getTacName(),
			lat: this.getLat(),
			lng: this.getLng(),
			startTime: this.startTime.asUtc(),
			endTime: this.endTime.asUtc(),
			tzOffset: this.getTzOffset(),
		}
	}

	isValidForCreate() {
		if (!this.title.isValid()) {
			this.Ctx.FlashMsgs.addFlash("Title is invalid", "error")
			return false
		}

		if (!this.address.isValid()) {
			this.Ctx.FlashMsgs.addFlash("Address is invalid", "error")
			return false
		}

		if (!this.lat.isValid()) {
			this.Ctx.FlashMsgs.addFlash("Latitude is invalid. Try again or tell support.", "error")
			return false
		}

		if (!this.lng.isValid()) {
			this.Ctx.FlashMsgs.addFlash("Longitude is invalid. Try again or tell support.", "error")
			return false
		}

		if (!this.tacName.isValid()) {
			this.Ctx.FlashMsgs.addFlash("Tac name is invalid. Try again or tell support.", "error")
			return false
		}

		const startUtc = this.startTime.asUtc()
		const endUtc = this.endTime.asUtc()
		if (startUtc >= endUtc) {
			this.Ctx.FlashMsgs.addFlash("Event cannot end before it begins!", "error")
			return false
		}

		if (!this.quickInfo.isValid()) {
			this.Ctx.FlashMsgs.addFlash("Quick info is invalid. Try again.", "error")
			return false
		}

		// TODO: no direct testing of TimeValue values

		return true

	}

	unpackItemFromApi(item) {
		this.setEventUuid(item.eventUuid)
		this.setTacName(item.tacName)
		this.setTitle(item.title)
		this.setAddress(item.address)
		this.setQuickInfo(item.quicInfo)
		this.setAdmins(item.admins)
		this.setStartTime(item.startTime)
		this.setEndTime(item.endTime)
		//EventListCache.setFromProfile(this.userUuid, body)
	}

	isOccurringNow() {
		const nowMilli = new Date().getTime()
		if ( nowMilli > event.startTime ) {
			return true
		}
		return false
	}
}
