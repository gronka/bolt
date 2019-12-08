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

	"BLUE": "#428AF8",
	"LIGHT_GRAY": "#D3D3D3",
	"green": "#429633",
	"brown": "#A0522D",
	"blue": "#3cf",

}


class Ctx {
	constructor(Ax, Conf, FlashMsgs, Storage, Static) {

		this.Ax = Ax
		this.Conf = Conf
		this.FlashMsgs = FlashMsgs
		this.Storage = Storage
		this.Static = Static

	}

}


class Configuration {
	constuctor(Static) {
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

import FlashMsgs from "./lib/services/FlashMsgs.js"
const FlashMsgs = new FlashMsgs()

// These objects have dependencies
import Storage from "./lib/services/Storage.js"
const Storage = new Storage(Static)

import { AX } from "./lib/services/Ax.js"
const Ax = new Ax(Static, FlashMsgs)

const singleton = new Ctx(Ax, Conf, FlashMsgs, Storage, Static)
export default singleton
