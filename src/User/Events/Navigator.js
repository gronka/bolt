import React from "react"
import { createMaterialTopTabNavigator } from "react-navigation-tabs"

import { Ctx } from "../../Globals.js"
import CalendarView from "../../components/Planner/CalendarView.js"
import CreateEventStack from "../../components/Events/CreateEventStack.js"
import ListEvents from "./ListEvents.js"


class CalendarScreen extends React.Component {
	render() {
		return (
			<CalendarView
			/>
		)
	}
}


class ListAttendingScreen extends React.Component {
	render() {
		return (
			<ListEvents
				userUuid={Ctx.Storage.userUuid}
			/>
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

		ListAttendingScreen: {
			screen: ListAttendingScreen,
			navigationOptions: {
				title: "All",
			}
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
