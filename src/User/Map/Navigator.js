import React from "react"
import MapView from "react-native-maps"
import { Button, Text, View, Image, ScrollView } from "react-native"
import { Ionicons } from '@expo/vector-icons';
import { createStackNavigator } from "react-navigation-stack"
import { createMaterialTopTabNavigator } from "react-navigation-tabs"

import Storage from "../../stores/Storage.js"
import { EventMapData } from "../../stores/MapData.js"


// TODO: could give iOS users apple maps option
// TODO: examples show setting of width and style in StyleSheet. Is that
// needed?
class EventsMap extends React.Component {
	render() {
		return (
			<MapView
				style={{ flex: 1 }}
				provider="google"
				initialRegion={{
					latitude: EventMapData.getLat(),
					longitude: EventMapData.getLng(),
					latitudeDelta: 0.0230,
					longitudeDelta: 0.0105,
				}}
			/>
		)
	}
}


class RestaurantsMap extends React.Component {
	render() {
		return (
			<View style={{ flex: 1, alignItems: "center", justifyContent: "center"}}>
				<Text>Restaurants Screen</Text>
			</View>
		)
	}
}


const ScheduleNavigator =	createMaterialTopTabNavigator(
	{
		Events: {
			screen: EventsMap
		},
		Restaurants: {
			screen: RestaurantsMap
		},

	},
	{
		lazy: true,
		tabBarOptions: {
			upperCaseLabel: false,
		},
	}
)


export default ScheduleNavigator
