import React from "react"
import { createStackNavigator } from "react-navigation-stack"

import ListAttendingScreen from "./ListAttendingScreen.jsx"
import ViewEventScreen from "./ViewEventScreen.jsx"
import EditEventScreen from "./EditEventScreen.jsx"
import { TacsStackForEditEvent } from "../../../nested/Tacs/Navigators.jsx"


const ListicleNavigator = createStackNavigator(
	{
		ListAttendingScreen: {
			screen: ListAttendingScreen,
			navigationOptions: { header: null },
		},

		ViewEventScreen: {
			screen: ViewEventScreen,
			navigationOptions: { header: null },
		},

		EditEventScreen: {
			screen: EditEventScreen,
			navigationOptions: { header: null },
		},

		TacsStackForEditEvent: {
			screen: TacsStackForEditEvent,
			navigationOptions: { header: null },
		},
	}
)


export default ListicleNavigator
