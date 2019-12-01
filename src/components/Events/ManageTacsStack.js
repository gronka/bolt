import React from "react"
import { 
	FlatList,
	Text, 
	TextInput, 
	TouchableOpacity,
	View, 
} from "react-native"
import { createStackNavigator } from "react-navigation-stack"

import SetTacLocationScreen from "./SetTacLocationScreen.js"
import SelectTacScreen from "./SelectTacScreen.js"
import AddTacScreen from "./AddTacScreen.js"


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
