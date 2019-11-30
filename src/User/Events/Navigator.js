import React from "react"
import { Button, Text, View, Image, ScrollView } from "react-native"
import { Ionicons } from '@expo/vector-icons'
import { createMaterialTopTabNavigator } from "react-navigation-tabs"

import CalendarView from "../../components/Planner/CalendarView.js"
import CreateEventStack from "../../components/Events/CreateEventStack.js"


class CalendarScreen extends React.Component {
	render() {
		return (
			<CalendarView
			/>
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
		CreateEventStack: {
			screen: CreateEventStack,
			navigationOptions: {
				title: "Add your event",
			}
		},
		Calendar: {
			screen: CalendarScreen,
		},
		List: {
			screen: ListScreen,
		},

	},
	{
		initialRouteName: "CreateEventStack",
		lazy: true,
		tabBarOptions: {
			upperCaseLabel: false,
		},
	}
)


export default EventsNavigator
