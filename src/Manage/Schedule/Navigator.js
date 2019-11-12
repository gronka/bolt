import * as React from "react"
import { Button, Text, View, Image, ScrollView } from "react-native"
import { Ionicons } from '@expo/vector-icons';
import { createMaterialTopTabNavigator } from "react-navigation-tabs"

import Blanket from "../../styles/blanket.js"


class CalendarScreen extends React.Component {
	render() {
		return (
			<View style={{ flex: 1, alignItems: "center", justifyContent: "center"}}>
				<Text>Schedule Calendar Screen</Text>
			</View>
		)
	}
}


class ListScreen extends React.Component {
	render() {
		return (
			<View style={{ flex: 1, alignItems: "center", justifyContent: "center"}}>
				<Text>Schedule List Screen</Text>
			</View>
		)
	}
}


const ScheduleNavigator =	createMaterialTopTabNavigator(
	{
		Calendar: {
			screen: CalendarScreen
		},
		List: {
			screen: ListScreen
		},

	}
)


export default ScheduleNavigator
