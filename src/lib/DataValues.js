import { 
	Validator,
} from "./Validation.js"

export class DataValue {
	constructor() {
		this.value = "notset"
		this.validator = new Validator()
	}

	validate() {
		throw "function not implemented"
	}

	setAndValidate(value) {
		this.value = value
		this.validate()
	}

	showWarning() {
		var hasValue = (this.value) ? true : false
		if (!this.validator.isValid & hasValue) {
			return true
		}
		return false
	}
}


export class TitleValue extends DataValue {
	constructor(value) {
		super()
		this.value = value
	}

	validate() {
		this.validator.validateString(this.value, 3, 50)
	}
}


export class NameValue extends DataValue {
	constructor(value) {
		super()
		this.value = value
	}

	validate() {
		this.validator.validateString(this.value, 3, 50)
	}
}


export class AddressValue extends DataValue {
	constructor(value) {
		super()
		this.value = value
	}

	validate() {
		this.validator.validateString(this.value, 3, 60)
	}
}

export class LatValue extends DataValue {
	constructor(value) {
		super()
		this.value = value
	}

	validate() {
		this.validator.validateNumber(this.value, -90, 90)
	}
}

export class LngValue extends DataValue {
	constructor(value) {
		super()
		this.value = value
	}

	validate() {
		this.validator.validateNumber(this.value, -180, 180)
	}
}

export class AddressObj {
	lat = 0
	lng = 0
	address = ""
	// status values:
	// 0: not set
	// 10: all good
	// 20: lat/lng do not match address result (user edited)
	// 21: lat/lng do not match venue (possible user edit)
	// 22: lat/lng does not match venue nor address
	// 30: lat/lng lookup failed
	status = 0
}
