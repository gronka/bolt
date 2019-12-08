import React from "react"
import { Button, Text, View, Image, ScrollView } from "react-native"
import { Ionicons } from '@expo/vector-icons';
import { createStackNavigator } from "react-navigation-stack"
import { createMaterialTopTabNavigator } from "react-navigation-tabs"

import PeopleScreen from "./PeopleScreen.js"


class MeetupScreen extends React.Component {
	render() {
		return (
			<View style={{ flex: 1, alignItems: "center", justifyContent: "center"}}>
				<Text>Community Meetup Screen</Text>
			</View>
		)
	}
}


class CoursesScreen extends React.Component {
	render() {
		return (
			<View style={{ flex: 1, alignItems: "center", justifyContent: "center"}}>
				<Text>Community Courses Screen</Text>
			</View>
		)
	}
}


class TournyScreen extends React.Component {
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
		Meetup: {
			screen: MeetupScreen
		},
		People: {
			screen: PeopleScreen
		},
		Courses: {
			screen: CoursesScreen
		},
		Tourny: {
			screen: TournyScreen
		},

	}
)


export default CommunityNavigator
