import { 
	Validator,
} from "./Validation.js"

export class DataValue {
	// value: value to set
	// defaultType: if not null, set to default value of this type
	constructor(defaultType) {
		this.defaultType = defaultType
		this.setToDefault()
		this.validator = new Validator()
	}

	setAndValidate(value) {
		if (value == null) {
			this.setToDefault()
		} else {
			this.value = value
		}
		this.validate()
	}

	setToDefault() {
		if (this.defaultType === "date") {
			this.value = new Date()
		}
		if (this.defaultType === "text") {
			this.value = ""
		}
		if (this.defaultType === "number") {
			this.value = 0
		}
		if (this.defaultType === "list") {
			this.value = []
		}
	}

	getValue() {
		return this.value
	}

	validate() {
		throw "function not implemented"
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

export class LongInfoValue extends DataValue {
	constructor() {
		super("text")
	}

	validate() {
		this.validator.validateString(this.value, 0, 2000)
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

export class ListValue extends DataValue {
	constructor() {
		super("list")
	}

	validate() {
		this.validator.validateToTrue()
	}
}

export class DateValue extends DataValue {
	constructor() {
		super("date")
	}

	validate() {
		this.validator.validateToTrue()
	}

	asUtc() {
		return this.value.getTime()
	}
}
