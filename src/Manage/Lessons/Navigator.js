import * as React from "react"
import { Button, Text, View, Image, ScrollView } from "react-native"
import { Ionicons } from '@expo/vector-icons';
import { createStackNavigator } from "react-navigation-stack"
import { createMaterialTopTabNavigator } from "react-navigation-tabs"

import Blanket from "../../styles/blanket.js"


class TrainersScreen extends React.Component {
	render() {
		return (
			<View style={{ flex: 1, alignItems: "center", justifyContent: "center"}}>
				<Text>Trainers Screen</Text>
			</View>
		)
	}
}


class MessagesScreen extends React.Component {
	render() {
		return (
			<View style={{ flex: 1, alignItems: "center", justifyContent: "center"}}>
				<Text>Messages Screen</Text>
			</View>
		)
	}
}


const ScheduleNavigator =	createMaterialTopTabNavigator(
	{
		Trainers: {
			screen: TrainersScreen
		},
		Messages: {
			screen: MessagesScreen
		},

	}
)


export default ScheduleNavigator
