import React from 'react';
import { 
	ActivityIndicator, 
	StatusBar,
	View,
} from "react-native"
import { createSwitchNavigator } from "react-navigation"

import { Ctx } from "./Globals.js"
import AppNavigator from "./AppNavigator.js"
import AuthNavigator from "./Auth/Navigator.js"


class AuthLoadingScreen extends React.Component {
	constructor(props) {
		super(props)
		this._bootstrapAsync();
	}

	_bootstrapAsync = async () => {
		var navigateTo = ""
		if (Ctx.Storage.isSignedIn()) {
			navigateTo = "App"
		} else {
			navigateTo = "Auth"
		}

		// Switch to App or Auth screen then unmount and discard this screen
		this.props.navigation.navigate(navigateTo)
	}

	render() {
		return (
			<View>
				<ActivityIndicator />
				<StatusBar barStyle="default" />
			</View>
		)
	}
}


const BaseNavigator = createSwitchNavigator(
	{
		AuthLoading: AuthLoadingScreen,
		Auth: AuthNavigator,
		App: AppNavigator,
	},
	{
		// AuthLoading while get retrieve stored auth details
		initialRouteName: "AuthLoading",
	}
)


export default BaseNavigator
