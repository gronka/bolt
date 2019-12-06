import Ax from "../stores/Ax.js"
import FlashMsgs from "../stores/FlashMsgs.js"
import { conf } from "../conf.js"


export const simplePost = async (endpoint, data) => {
	try {
		const resp = await Ax.ax.post(endpoint, data)
	} catch (err) {
		// TODO: pass onError?
		console.log(err)
		FlashMsgs.addFlash("Failed to get response from API", "error")
	}

	if (resp.data.i === conf["ACCEPTED"]) {
		onResponse(resp)
	} else {
		console.log("Response rejected: " + JSON.stringify(resp.status))
		FlashMsgs.unpackFlashMsgs(err.response.data)
	} 
	return resp
}


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
				console.log("Response rejected: " + JSON.stringify(resp.status))
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
