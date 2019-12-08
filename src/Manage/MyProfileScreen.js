import React from "react"

import { Ctx } from "../Globals.js"
import Profile from "../components/Profile.js"


class MyProfileScreen extends React.Component {
	//static navigationOptions = ({navigation}) => ({
		//title: `${this.state.fullname}`,
	//})
	//
	static navigationOptions = ({navigation}) => {
		const { state } = navigation
		if (!state.params) {
			state.params = {}
		}
		if (!state.params.title) {
			state.params.title = "Loading..."
		}
		return {
			title: `${state.params.title}`,
		}
	}

	setTitle = (titleText) => {
		const { setParams } = this.props.navigation
		setParams({ title: titleText })
	}

	render() {
		return (
			<Profile
				userUuid={Ctx.Storage.userUuid}
				onLoad={this.setTitle}
			/>
		)
	}
}


export default MyProfileScreen
