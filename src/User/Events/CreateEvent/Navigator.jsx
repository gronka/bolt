import React from "react"
import { createStackNavigator } from "react-navigation-stack"

import CreateEventScreen from "./CreateEventScreen.jsx"
import ManageTacsStack from "./ManageTacsStack.jsx"


// NOTE: we don't want to include EditEventScreen here, since we don't want
// people to go "back" after creating an event. It's better that they modify
// the event they just made than to create a new one
const CreateEventNavigator = createStackNavigator(
	{
		CreateEventScreen: {
			screen: CreateEventScreen,
			navigationOptions: { header: null },
		},

		ManageTacsStack: {
			screen: ManageTacsStack,
			navigationOptions: { header: null },
		},
	}
)


export default CreateEventNavigator
