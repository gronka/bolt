import React from "react"
import { Ionicons } from '@expo/vector-icons';

import Ax from "./stores/Ax.js"
import Storage from "./stores/Storage.js"
import FlashMsgs from "./stores/FlashMsgs.js"
import { conf } from "./conf.js"


export const submitWithLoading = (component, endpoint, data, onResponse) => {
		component.setState({
			loading: true
		})

		Ax.ax.post(endpoint, data)
		.then((resp) => {
			onResponse(resp)
		})
		.catch((error) => {
			// TODO: pass onError?
			console.log(error)
		})

		// TODO: put timeout on this setState
		component.setState({
			loading: false
		})

}


export const post = async (component, endpoint, data, onResponse) => {
		Ax.ax.post(endpoint, data)
		.then((resp) => {
			if (resp.data.i === conf["ACCEPTED"]) {
				onResponse(resp)
			} else {
				Log.warn("Response rejected: " + JSON.stringify(resp.status))
				FlashMsgs.unpackFlashMsgs(err.response.data)
			}
		})
		.catch((err) => {
			// TODO: pass onError?
			console.log(err)
			FlashMsgs.addFlash("Failed to get response from API", "error")
		})
		return
}


export const get = (component, endpoint, onResponse) => {
		Ax.ax.get(endpoint)
		.then((resp) => {
			onResponse(resp)
		})
		.catch((err) => {
			// TODO: pass onError?
			console.log(err)
		})
}


export function cleanResults(results, uuidName) {
	// NOTE tbg: don't sort by distance since lat lng is private data
	let sorted = []
	let sortedUuids = []

	// remove duplicates
	results.forEach((result, idx) => {
		if (sortedUuids.indexOf(result[uuidName]) === -1) {
			sorted.push(result)
			sortedUuids.push(result[uuidName])
		}
	})
	
	return sorted
}


export function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
