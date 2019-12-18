import { EventObject } from "../objects/EventObject.js"


class Crumb {
	constructor(path="", params={}) {
		this.path = path
		this.params = params
	}
}


export class CrumbNavigator {
	constructor() {
		this.history = []
		// Note: there is no forwards button, so no forwards stack (wew)
		this.activeCrumb = new Crumb()
	}

	resetHistory() {
		this.history = []
	}

	to(nav, path, params) {
		console.log(path)
		this.history.push(this.activeCrumb)
		this.activeCrumb = new Crumb(path, params)
		nav.navigate(path)
	}

	toWithReset(nav, path, params) {
		console.log(path + " with reset")
		this.resetHistory()
		this.history.push(this.activeCrumb)
		this.activeCrumb = new Crumb(path, params)
		nav.navigate(path)
	}

	back(nav) {
		// Only pop from history if we're browsing stuff that needs crumb nav
		// we need to programmatically determine if we need to pop params info for
		// the user
		const route = nav.state.routeName
		console.log("crumb naving back to " + route)
		//if (route === "ViewEventScreen) {
		//  this.activeCrumb = this.history.pop()
		//}
		
		nav.goBack(null)  // react navigation method
	}

	getActiveCrumb() { return this.activeCrumb }
	getParams() {
		const crumb =  this.getActiveCrumb()
		return crumb.params
	}
	getParam(param) {
		const params =  this.getParams()
		if (params[param] != null) {
			return params[param]
		} 
		throw("crumb does not contain param: " + param)
	}
}
