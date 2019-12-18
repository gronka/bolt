import React from "react"
import { createMaterialTopTabNavigator } from "react-navigation-tabs"

import { Ctx } from "../../Globals.js"
import CalendarView from "../../components/Planner/CalendarView.jsx"
import CreateEventNavigator from "./CreateEvent/Navigator.jsx"
import ListicleNavigator from "./Listicle/Navigator.jsx"


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

		ListicleNavigator: {
			screen: ListicleNavigator,
			navigationOptions: {
				title: "My Events",
			}
		},

	},
	{
		initialRouteName: "ListicleNavigator",
		swipeEnabled: false,
		lazy: true,
		tabBarOptions: {
			upperCaseLabel: false,
		},
	}
)


export default EventsNavigator
