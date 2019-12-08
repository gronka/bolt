import React from "react"
import { Button, Text, View, Image, ScrollView } from "react-native"
import { Ionicons } from '@expo/vector-icons';
import { createStackNavigator } from "react-navigation-stack"
import { createMaterialTopTabNavigator } from "react-navigation-tabs"


class ConversationsScreen extends React.Component {
	render() {
		return (
			<View style={{ flex: 1, alignItems: "center", justifyContent: "center"}}>
				<Text>Conversations Screen</Text>
			</View>
		)
	}
}


const ConversationsNavigator =	createStackNavigator(
	{
		"Conversations": {
			screen: ConversationsScreen
		},

	},

	{
		headerMode: "none",
	}

)


export default ConversationsNavigator
