import Ax from "../stores/Ax.js"
import FlashMsgs from "../stores/FlashMsgs.js"


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
