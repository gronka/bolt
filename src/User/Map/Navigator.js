import React from "react"
import MapView from "react-native-maps"
import { Button, Text, View, Image, ScrollView } from "react-native"
import { Ionicons } from '@expo/vector-icons';
import { createStackNavigator } from "react-navigation-stack"
import { createMaterialTopTabNavigator } from "react-navigation-tabs"

import { Ctx, EventMapData, RestaurantMapData } from "../../Globals.js"


// TODO: could give iOS users apple maps option
// TODO: examples show setting of width and style in StyleSheet. Is that
// needed?
class EventsMap extends React.Component {
	constructor(props) {
		super(props)
		this.map = React.createRef()
	}

	onRegionChangeComplete(region) => {

	}

	render() {
		return (
			<MapView
				style={{ flex: 1 }}
				provider="google"
				ref={ref => {this.map = ref}}
				onRegionChangeComplete={ region => this.onRegionChangeComplete(region) }
				initialRegion={{
					latitude: Ctx.Storage.loc.getLat(),
					longitude: Ctx.Storage.loc.getLng(),
					latitudeDelta: EventMapData.defaultLatDelta,
					longitudeDelta: EventMapData.defaultLngDelta,
				}}
			/>
		)
	}
}


class RestaurantsMap extends React.Component {
	constructor(props) {
		super(props)
		this.map = React.createRef()
	}

	render() {
		return (
			<MapView
				style={{ flex: 1 }}
				provider="google"
				ref={ref => {this.map = ref}}
				initialRegion={{
					latitude: Ctx.Storage.loc.getLat(),
					longitude: Ctx.Storage.loc.getLng(),
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
