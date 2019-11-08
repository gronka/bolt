import React from "react"
import { Text, View } from "react-native"
import { createStackNavigator } from "react-navigation-stack"
import { createMaterialTopTabNavigator } from "react-navigation-tabs"

import ConnectScreen from "./ConnectScreen.js"
import PeopleSearchNameScreen from "./PeopleSearchNameScreen.js"
import PeopleSearchNearestScreen from "./PeopleSearchNearestScreen.js"


class CoursesScreen extends React.Component {
	render() {
		return (
			<View style={{ flex: 1, alignItems: "center", justifyContent: "center"}}>
				<Text>Community Courses Screen</Text>
			</View>
		)
	}
}


class TournamentsScreen extends React.Component {
	render() {
		return (
			<View style={{ flex: 1, alignItems: "center", justifyContent: "center"}}>
				<Text>Community Tournies Screen</Text>
			</View>
		)
	}
}


const CommunityNavigator =	createMaterialTopTabNavigator(
	{
		Connect: {
			screen: ConnectScreen,
		},
		PeopleSearchName: {
			screen: PeopleSearchNameScreen,
			navigationOptions: {
				title: "Search by name",
			}
		},
		PeopleSearchNearest: {
			screen: PeopleSearchNearestScreen,
			navigationOptions: {
				title: "Nearby players",
			}
		},
		Courses: {
			screen: CoursesScreen,
		},
		Tournaments: {
			screen: TournamentsScreen,
		},

	},
	{
		lazy: true,
		tabBarOptions: {
			upperCaseLabel: false,
			scrollEnabled: true,
		},
	}
)


export default CommunityNavigator
