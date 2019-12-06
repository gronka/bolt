import { 
	Validator,
} from "./Validation.js"

export class DataValue {
	// value: value to set
	// defaultType: if not null, set to default value of this type
	constructor(defaultType) {
		if (defaultType === "date") {
			this.value = new Date()
		}
		if (defaultType === "text") {
			this.value = ""
		}
		if (defaultType === "number") {
			this.value = 0
		}
		this.validator = new Validator()
	}

	validate() {
		throw "function not implemented"
	}

	setAndValidate(value) {
		this.value = value
		this.validate()
	}

	get() {
		return this.value
	}

	isValid() {
		this.validate()
		return this.validator.isValid
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
	constructor() {
		super("text")
	}

	validate() {
		this.validator.validateString(this.value, 3, 50)
	}
}


export class NameValue extends DataValue {
	constructor() {
		super("text")
	}

	validate() {
		this.validator.validateString(this.value, 3, 50)
	}
}


export class AddressValue extends DataValue {
	constructor() {
		super("text")
	}

	validate() {
		this.validator.validateString(this.value, 5, 200)
	}
}

export class QuickInfoValue extends DataValue {
	constructor() {
		super("text")
	}

	validate() {
		this.validator.validateString(this.value, 5, 140)
	}
}

export class LatValue extends DataValue {
	constructor() {
		super("number")
	}

	validate() {
		this.validator.validateNumber(this.value, -90, 90)
	}
}

export class LngValue extends DataValue {
	constructor() {
		super("number")
	}

	validate() {
		this.validator.validateNumber(this.value, -180, 180)
	}
}

export class DateValue extends DataValue {
	constructor() {
		super("date")
	}

	validate() {
		this.validator.validateTime(this.value, 0, 0)
	}

	asUTC() {
		return this.value.getTime()
	}
}
