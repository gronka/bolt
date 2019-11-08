import axios from 'axios'

import { conf } from '../conf'
import FlashMsgs from './FlashMsgs'
import Storage from "./Storage"


class Ax {
	constructor() {
		this.makeAxiosWithDefaults("")
		this.setAxiosInterceptors()
	}

	makeAxiosWithDefaults(jwt) {
		this.ax = axios.create({
			baseURL: conf["kapi"],
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json',
				'Authorization': jwt,
			}
		})
	}

	setAxiosInterceptors() {
		this.ax.interceptors.response.use(
			function(resp) {
				if (resp.data == null) {
					FlashMsgs.addFlash("api response body was null", "error")
				} else {
					// COMMENT: capture interesting data from kapi
					FlashMsgs.unpackFlashMsgs(resp.data)
					Storage.unpackCommand(resp.data)
				}
				return Promise.resolve(resp)
			}, 

			function (err) {
				FlashMsgs.addFlash("Network Error", "error")
				//alert(JSON.stringify(err))
				//FlashMsgs.unpackFlashMsgs(err.response.data)
				return Promise.reject(err)
			});

	}

	remakeAxios(jwt) {
		this.makeAxiosWithDefaults(jwt)
		this.setAxiosInterceptors()
	}
}


const singleton = new Ax()
export default singleton
