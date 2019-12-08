import React from "react"
import { createStackNavigator } from "react-navigation-stack"
import { createMaterialTopTabNavigator } from "react-navigation-tabs"

import { Blanket } from "../../Globals.js"
import RecentConvosScreen from "./RecentConvosScreen.js"


const ConvosNavigator =	createStackNavigator(
	{
		"Conversations": {
			screen: RecentConvosScreen
		},

	},

	{
		headerMode: "none",
	}

)


export default ConvosNavigator
