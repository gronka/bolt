import React from "react"
import { createStackNavigator } from "react-navigation-stack"

import ListAttendingScreen from "./ListAttendingScreen.js"
import ViewEventScreen from "./ViewEventScreen.js"


const CreateEventNavigator = createStackNavigator(
	{
		ListAttendingScreen: {
			screen: ListAttendingScreen,
			navigationOptions: { header: null },
		},

		ViewEventScreen: {
			screen: ViewEventScreen,
			navigationOptions: { header: null },
		},

	}
)


export default CreateEventNavigator
