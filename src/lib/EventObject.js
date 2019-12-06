import { RequestObject } from "./RequestHandlers.js"
import { 
	AddressValue,
	LatValue,
	LngValue,
	NameValue,
	QuickInfoValue,
	DateValue,
	TitleValue,
} from "./DataValues.js"
import Storage from "../stores/Storage.js"
import FlashMsgs from "../stores/FlashMsgs.js"


export class EventObject extends RequestObject {
	constructor() {
		super()
		this.title = new TitleValue()
		this.address = new AddressValue()
		this.lat = new LatValue()
		this.lng = new LngValue()
		this.tacName = new NameValue()
		this.tzOffset = 0
		this.startTime = new DateValue()
		this.endTime = new DateValue()
		this.quickInfo = new QuickInfoValue()

		this.admins = []
		this.organizers = []
		// TODO:?
		//this.organizerGroups = []
		//this.promoters = []
	}

	canUserOrganize() {
		if (this.admins.indexOf(Storage.UserUuid) > -1 || 
				this.organizers.indexOf(Storage.UserUuid) > -1) {
			return true
		}
		return false
	}

	canUserAdmin() {
		if (this.admins.indexOf(Storage.UserUuid) > -1) {
			return true
		}
		return false
	}

	reinit() {
		this.constructor()
	}

	getUuid() {
		return this.getTitle() + this.getAddress()
	}

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

	setFromTac(tac) {
		this.uuid = tac.tacUuid
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
			startTime: this.startTime.asUTC(),
			endTime: this.endTime.asUTC(),
			tzOffset: this.getTzOffset(),
		}
	}

	isValidForCreate() {
		if (!this.title.isValid()) {
			FlashMsgs.addFlash("Title is invalid", "error")
			return false
		}

		if (!this.address.isValid()) {
			FlashMsgs.addFlash("Address is invalid", "error")
			return false
		}

		if (!this.lat.isValid()) {
			FlashMsgs.addFlash("Latitude is invalid. Try again or tell support.", "error")
			return false
		}

		if (!this.lng.isValid()) {
			FlashMsgs.addFlash("Longitude is invalid. Try again or tell support.", "error")
			return false
		}

		if (!this.tacName.isValid()) {
			FlashMsgs.addFlash("Tac name is invalid. Try again or tell support.", "error")
			return false
		}

		if (this.startTime.asUTC() <= this.startTime.asUTC()) {
			FlashMsgs.addFlash("Event cannot end before it begins!", "error")
			return false
		}

		if (!this.quickInfo.isValid()) {
			FlashMsgs.addFlash("Quick info is invalid. Try again.", "error")
			return false
		}

		// TODO: no direct testing of TimeValue values

		return true

	}
}
