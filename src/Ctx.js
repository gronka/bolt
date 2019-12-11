//
// Static is conf that doesn't change
// Conf is conf that can be updated by the user or saved to disk
//

let protocol = "http://"
let url = "192.168.1.209"
//let url = "192.168.8.221"
//let url = "192.168.43.27"
let port = ":9090"
let version = "/v1"
let kapi = protocol + url + port + version


const Static = {
	"env": "dev",
	"kapi": kapi,
	"autoLogin": true,
	"autoLoginEmail": "asdf@asdf.com",
	"autoLoginPassword": "asdf",

	"kapiImages": "makeThisURL",

	// USER VARIABLES
	defaultLat: 40.7228,
	defaultLng: -74.0000,
	defaultLatDelta: 0.0230,
	defaultLngDelta: 0.0105,

	tzFormat: "standard",

	"ACCEPTED": "ACCEPTED",
	"INFO_ACCEPTED": "ACCEPTED",
	"USER_LOGIN_INVALID": "USER_LOGIN_INVALID",
	"USER_EXISTS": "USER_EXISTS",
	"USER_CREATED": "USER_CREATED",
	"USER_VERIFIED": "USER_VERIFIED",
	"USER_BANNED": "USER_BANNED",

	"FAILED_TO_LOAD": "Failed to load",
	"REDIRECT": "REDIRECT",
}


class Context {
	constructor(Ax, Conf, FlashMsgs, Storage, Static) {
		this.Ax = Ax
		this.Conf = Conf
		this.FlashMsgs = FlashMsgs
		this.Storage = Storage
		this.Static = Static
	}
}


class Configuration {
	constructor(Static) {
		this.defaultLat = Static.defaultLat
		this.defaultLng = Static.defaultLng
		this.defaultLatDelta = Static.defaultLatDelta
		this.defaultLngDelta = Static.defaultLngDelta
		this.tzFormat = "standard"

		this.Static = Static
	}
}

// These objects have no dependencies
const Conf = new Configuration(Static)

import { FlashMsgsService } from "./lib/services/FlashMsgs.js"
const FlashMsgs = new FlashMsgsService()

// These objects have dependencies
import { StorageService } from "./lib/services/Storage.js"
const Storage = new StorageService(Static)

import { AxService } from "./lib/services/Ax.js"
const Ax = new AxService(Static, FlashMsgs)

// Initialize necessary data
Storage.loadFromDisk()
Ax.remakeAxios(Storage.jwt)

const Ctx = new Context(Ax, Conf, FlashMsgs, Storage, Static)
export default Ctx
