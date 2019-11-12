import React from "react"

import Profile from "../components/Profile.js"
import Storage from "../stores/Storage.js"


class ViewProfileScreen extends React.Component {
	static navigationOptions = ({navigation}) => {
		const { state } = navigation
		if (!state.params) {
			state.params = {}
		}
		if (!state.params.title) {
			state.params.title = "Loading/user not found..."
		}
		return {
			title: `${state.params.title}`,
		}
	}

	constructor(props) {
		super(props)
		this.userUuid = this.determineUserUuid()
	}

	// tbg: I agree, it's weird that we have to do this
	determineUserUuid() {
		const { navigation } = this.props
		if (navigation != null && navigation.getParam("userUuid") != null) {
			return navigation.getParam("userUuid")
		}

		if (this.props != null && this.props.userUuid != null) {
			return this.props.userUuid
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
				userUuid={this.userUuid}
				onLoad={this.setTitle}
			/>
		)
	}
}


export default ViewProfileScreen
