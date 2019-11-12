import * as React from "react"
import { Button, Text, View, Image, ScrollView } from "react-native"
import { Ionicons } from '@expo/vector-icons';
import { createMaterialTopTabNavigator } from "react-navigation-tabs"

import Blanket from "../../styles/blanket.js"


class CalendarScreen extends React.Component {
	render() {
		return (
			<View style={{ flex: 1, alignItems: "center", justifyContent: "center"}}>
				<Text>Events Calendar Screen</Text>
			</View>
		)
	}
}


class ListScreen extends React.Component {
	render() {
		return (
			<View style={{ flex: 1, alignItems: "center", justifyContent: "center"}}>
				<Text>Events List Screen</Text>
			</View>
		)
	}
}


const EventsNavigator =	createMaterialTopTabNavigator(
	{
		Calendar: {
			screen: CalendarScreen
		},
		List: {
			screen: ListScreen
		},

	},
	{
		lazy: true,
		tabBarOptions: {
			upperCaseLabel: false,
		},
	}
)


export default EventsNavigator
