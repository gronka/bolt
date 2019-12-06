import React from "react"
import { createStackNavigator } from "react-navigation-stack"

import CreateEventScreen from "./CreateEventScreen.js"
import EditEventScreen from "./EditEventScreen.js"
import ManageTacsStack from "./ManageTacsStack.js"


const CreateEventStack = createStackNavigator(
	{
		CreateEventScreen: {
			screen: CreateEventScreen,
			navigationOptions: { header: null },
		},

		ManageTacsStack: {
			screen: ManageTacsStack,
			navigationOptions: { header: null },
		},

		EditEventScreen: {
			screen: EditEventScreen,
			navigationOptions: { header: null },
		},
	}
)


export default CreateEventStack
