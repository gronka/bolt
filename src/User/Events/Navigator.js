import React from "react"
import { createMaterialTopTabNavigator } from "react-navigation-tabs"

import { Ctx } from "../../Globals.js"
import CalendarView from "../../components/Planner/CalendarView.js"
import CreateEventNavigator from "./CreateEvent/Navigator.js"
import ListAttendingNavigator from "./Attending/Navigator.js"


class CalendarScreen extends React.Component {
	render() {
		return (
			<CalendarView
			/>
		)
	}
}


const EventsNavigator =	createMaterialTopTabNavigator(
	{
		CreateEventNavigator: {
			screen: CreateEventNavigator,
			navigationOptions: {
				title: "Add your event",
			}
		},
		
		Calendar: {
			screen: CalendarScreen,
		},

		ListAttendingNavigator: {
			screen: ListAttendingNavigator,
			navigationOptions: {
				title: "All",
			}
		},

	},
	{
		initialRouteName: "ListAttendingNavigator",
		lazy: true,
		tabBarOptions: {
			upperCaseLabel: false,
		},
	}
)


export default EventsNavigator
