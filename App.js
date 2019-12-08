import React from 'react'
import { View } from "react-native"
import { createAppContainer } from 'react-navigation'
import FlashMessage from "react-native-flash-message"

import BaseNavigator from "./src/BaseNavigator.js"

// Initialize global data stores
import Ctx from "./src/Globals.js"

//// Optimizes memory use and performance
import { useScreens } from "react-native-screens"
useScreens()


const RootNavigator = createAppContainer(BaseNavigator)


export default class RootApp extends React.Component {
	constructor(props) {
		super(props)

		Ctx.Storage.loadFromDisk()
		Ctx.Ax.remakeAxios(Storage.jwt)
	}

	render() {
		return (
			<View style={{flex: 1}}>
				<RootNavigator />
				<FlashMessage position="top" />
			</View>
		)
	}
}
