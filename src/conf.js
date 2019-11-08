let protocol = "http://"
//let url = "192.168.1.169"
//let url = "192.168.8.221"
let url = "192.168.43.27"
let port = ":9090"
let version = "/v1"
let kapi = protocol + url + port + version


export const conf = {
	"env": "dev",
	"kapi": kapi,
	"autoLogin": true,
	"autoLoginEmail": "asdf@asdf.com",
	"autoLoginPassword": "asdf",

	"kapiImages": "makeThisURL",

	tzFormat: "standard",

	"ACCEPTED": "ACCEPTED",
	"INFO_ACCEPTED": "ACCEPTED",
	"USER_LOGIN_INVALID": "USER_LOGIN_INVALID",
	"USER_EXISTS": "USER_EXISTS",
	"USER_CREATED": "USER_CREATED",
	"USER_VERIFIED": "USER_VERIFIED",
	"USER_BANNED": "USER_BANNED",

	"FAILED_TO_LOAD": "Failed to load",

	"BLUE": "#428AF8",
	"LIGHT_GRAY": "#D3D3D3",

	"REDIRECT": "REDIRECT",

}


import { Dimensions } from "react-native"


export const WIDTH = Dimensions.get("window").width
export const HEIGHT = Dimensions.get("window").width
