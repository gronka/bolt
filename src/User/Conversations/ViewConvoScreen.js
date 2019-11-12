import React from "react"

import Convo from "./Convo.js"
import Storage from "../../stores/Storage.js"


class ViewConvoScreen extends React.Component {
	static navigationOptions = ({navigation}) => {
		const { state } = navigation
		if (!state.params) {
			state.params = {}
		}
		if (!state.params.title) {
			state.params.title = "Loading/conversation not found..."
		}
		return {
			title: `${state.params.title}`,
		}
	}

	constructor(props) {
		super(props)
		this.convoUuid = this.determineConvoUuid()
	}

	// tbg: I agree, it's weird that we have to do this
	// TODO: we have to do this for profiles, but we might not have to for convos
	determineConvoUuid() {
		const { navigation } = this.props
		if (navigation != null && navigation.getParam("convoUuid") != null) {
			return navigation.getParam("convoUuid")
		}

		if (this.props != null && this.props.convoUuid != null) {
			return this.props.convoUuid
		}

		return ""
	}

	setTitle = (titleText) => {
		const { setParams } = this.props.navigation
		setParams({ title: titleText })
	}

	render() {
		return (
			<Profile
				convoUuid={this.convoUuid}
				onLoad={this.setTitle}
			/>
		)
	}
}


export default ViewConvoScreen
