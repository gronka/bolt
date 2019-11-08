import Cache from './lib/Cache'
//import EventListCache from './EventListCache'


class ProfileCache extends Cache {
}


export class Profile {
	userUuid = ""
	user = ""
	fullname = ""
	about = ""
	hometown = ""
	status = ""
	profilePicUrl = ""
	loadedFromApi = false
	isSeller = false
	isTrainer = false
	isVideographer = false

	// TODO update
	//userIsAdminOfEvent(eventUuid) {
		//const adminList = EventListCache.getEventList(this.adminEventListKey)
		//for (var i=0; i<adminList.uuids.length; i++) {
			//if (eventUuid === adminList.uuids[i]) {
				//return true
			//}
		//}
		//return false
	//}

	
	unpackItemFromApi(body) {
		let user = body.user
		this.userUuid = user.userUuid
		this.uuid = user.userUuid
		this.fullname = user.fullname
		this.about = user.about
		this.hometown = user.hometown
		this.profilePicUrl = user.profilePicUrl
		//this.status = user.status
		this.hometown = user.hometown

		this.isSeller = user.isSeller
		this.isTrainer = user.isTrainer
		this.isVideographer = user.isVideographer

		//EventListCache.setFromProfile(this.userUuid, body)
	}

}


const singleton = new ProfileCache(Profile, 
																	 "/user/get", 
																	 "/user/field.update",
																	"userUuid")
export default singleton
