import { showMessage, hideMessage } from "react-native-flash-message"


export class FlashMsgsService {
	msgs = []

	addFlash(msg, severity) {
		showMessage({
			message: msg,
			type: severity,
		})
	}

	clearMsgs() {
		this.msgs = []
	}

	removeFlash(p) {
		this.msgs.splice(p, 1)
	}

	unpackFlashMsgs(p) {
		if (p.flashMsgs != null) {
			for (let i=0; i<p.flashMsgs.length; i++) {
				this.addFlash(p.flashMsgs[i].msg, p.flashMsgs[i].severity)
			}
		}
	}

}
