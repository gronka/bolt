import React from "react"
import MapView from "react-native-maps"
import { Button, Text, View, Image, ScrollView } from "react-native"
import { Ionicons } from '@expo/vector-icons';
import { createStackNavigator } from "react-navigation-stack"
import { createMaterialTopTabNavigator } from "react-navigation-tabs"

import Storage from "../../stores/Storage.js"
import { EventMapData } from "../../stores/MapData.js"
import { RestaurantMapData } from "../../stores/MapData.js"


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
					latitudeDelta: EventMapData.defaultLatDelta,
					longitudeDelta: EventMapData.defaultLngDelta,
				}}
			/>
		)
	}
}


class RestaurantsMap extends React.Component {
	render() {
		return (
			<MapView
				style={{ flex: 1 }}
				provider="google"
				initialRegion={{
					latitude: RestaurantMapData.getLat(),
					longitude: RestaurantMapData.getLng(),
					latitudeDelta: RestaurantMapData.defaultLatDelta,
					longitudeDelta: RestaurantMapData.defaultLngDelta,
				}}
			/>
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
