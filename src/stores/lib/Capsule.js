import AxiosStore from '../AxiosStore'


// REQUIREMENTS:
// this.capsulePost: URL to post to 
// this.prepCapsule(): returns json payload
export default class Capsule {
	prepCapsule(field, value) {
		// example
		//var data = {
			//userUuid: this.userUuid,
			//field: field,
			//value: this[field],
		//}
		//return data
		throw new Error("This function must be overwritten")
	}

	saveFieldToDb(field, value) {
		// TODO: use this field for creating an authorization failure test.
		//userUuid: "00000000-0000-0000-0000-000000000003",
		//
		// TODO: don't save if cached data does not equal current data. Maybe make
		// a function called checkCache
		var data = this.prepCapsule(field, value)
		AxiosStore.ax.post(this.capsulePost, data)
	}

}
