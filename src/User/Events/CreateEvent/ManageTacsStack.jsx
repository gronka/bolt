import React from "react"
import { createStackNavigator } from "react-navigation-stack"

import SetTacLocationScreen from "./SetTacLocationScreen.jsx"
import SelectTacScreen from "./SelectTacScreen.jsx"
import AddTacScreen from "./AddTacScreen.jsx"


export default ManageTacStack = createStackNavigator(
	{
		SelectTac: {
			screen: SelectTacScreen,
			navigationOptions: { header: null },
		},

		AddTac: {
			screen: AddTacScreen,
			navigationOptions: { header: null },
		},

		SetTacLocation: {
			screen: SetTacLocationScreen,
			navigationOptions: { header: null },
		},

		//EditTac: {
			//screen: EditTacScreen,
			//navigationOptions: { header: null },
		//},
	}
)
