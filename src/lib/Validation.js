export class Validator {
	isValid = false
	description = ""

	validateString(string, minLength, maxLength) {
		if (string.length < minLength) {
			this.isValid = false
			this.description = "Field must be longer than " + minLength + " characters."
			return 
		} else if (string.length > maxLength) {
			this.isValid = false
			this.description = "Field must be shorter than " + maxLength + " characters."
			return 
		}
		this.isValid = true
		return 
	}

	validateNumber(float, minValue, maxValue) {
		if (float < minValue) {
			this.isValid = false
			this.description = "Value must be greater than " + minValue + "."
			return 
		} else if (float > maxValue) {
			this.isValid = false
			this.description = "Value must be less than " + maxValue + "."
			return 
		}
		this.isValid = true
		return 
	}

	validateTime(float, minValue, maxValue) {
		this.isValid = true
		return 
	}
}

