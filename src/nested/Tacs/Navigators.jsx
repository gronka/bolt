import React from "react"
import { createStackNavigator } from "react-navigation-stack"

import SetTacLocationScreen from "./SetTacLocationScreen.jsx"
import SelectTacScreen from "./SelectTacScreen.jsx"
import AddTacScreen from "./AddTacScreen.jsx"


export const TacsStackForCreateEvent = createStackNavigator(
	{
		CeSelectTac: {
			screen: SelectTacScreen,
			navigationOptions: { header: null },
		},

		CeAddTac: {
			screen: AddTacScreen,
			navigationOptions: { header: null },
		},

		CeSetTacLocation: {
			screen: SetTacLocationScreen,
			navigationOptions: { header: null },
		},
	}
)


export const TacsStackForEditEvent = createStackNavigator(
	{
		EeSelectTac: {
			screen: SelectTacScreen,
			navigationOptions: { header: null },
		},

		EeAddTac: {
			screen: AddTacScreen,
			navigationOptions: { header: null },
		},

		EeSetTacLocation: {
			screen: SetTacLocationScreen,
			navigationOptions: { header: null },
		},
	}
)
