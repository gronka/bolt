import React from "react"
import { Text, View } from "react-native"
import { Ionicons } from '@expo/vector-icons';
import { createStackNavigator } from "react-navigation-stack"
import { createBottomTabNavigator } from "react-navigation-tabs"

import ViewConvoScreen from "./Conversations/ViewConvoScreen.js"
import ViewProfileScreen from "./ViewProfileScreen.js"
import CommunityNavigator from "./Community/Navigator.js"
import ScheduleNavigator from "./Schedule/Navigator.js"
import LessonsNavigator from "./Lessons/Navigator.js"
import ConversationsNavigator from "./Conversations/Navigator.js"


export const defNavOpts = (navigation) => {
	return {
		headerLeft: (
			<Ionicons name="md-menu" size={30}
				style={{ paddingLeft: 10 }}
				onPress={() => navigation.openDrawer()}
			/>
		),

		headerRight: (
			<Ionicons name="md-person" size={30}
				style={{ paddingRight: 10 }}
				onPress={() => navigation.navigate("MyProfile")}
			/>
		),
	}
}


class DashboardScreen extends React.Component {
	render() {
		return (
			<View style={{ flex: 1, alignItems: "center", justifyContent: "center"}}>

				<Text>Player Dashboard Screen</Text>
			</View>
		)
	}
}


const DashboardStack = createStackNavigator(
	{
		Dashboard: {
			screen: DashboardScreen,
			navigationOptions: {
				title: "Dashboard",
			}
		}
	},
	{
		defaultNavigationOptions: ({ navigation }) => {
			return defNavOpts(navigation)
		}
	}
)


const CommunityStack = createStackNavigator(
	{
		Community: {
			screen: CommunityNavigator,
			navigationOptions: {
				title: "Community",
			}
		},

		CommunityViewProfile: {
			screen: ViewProfileScreen,
		},

		ViewConvoScreen: {
			screen: ViewConvoScreen,
		},
	},
	{
		defaultNavigationOptions: ({ navigation }) => {
			return defNavOpts(navigation)
		}
	}
)


const ScheduleStack = createStackNavigator(
	{
		Schedule: {
			screen: ScheduleNavigator,
			navigationOptions: {
				title: "Schedule",
			}
		}
	},
	{
		defaultNavigationOptions: ({ navigation }) => {
			return defNavOpts(navigation)
		}
	}
)


const LessonsStack = createStackNavigator(
	{
		Lessons: {
			screen: LessonsNavigator,
			navigationOptions: {
				title: "Lessons",
			}
		}
	},
	{
		defaultNavigationOptions: ({ navigation }) => {
			return defNavOpts(navigation)
		}
	}
)


const ConversationsStack = createStackNavigator(
	{
		Conversations: {
			screen: ConversationsNavigator,
			navigationOptions: {
				title: "Conversations",
			}
		}
	},
	{
		defaultNavigationOptions: ({ navigation }) => {
			return defNavOpts(navigation)
		}
	}
)


const PlayerNavigator = createBottomTabNavigator(
	{
		Dashboard: {
			screen: DashboardStack,
			navigationOptions: {
				title: "Dashboard",
			}
		},

		Community: {
			screen: CommunityStack,
			defaultNavigationOptions: {
				title: "Community",
			}
		},

		Schedule: {
			screen: ScheduleStack,
			navigationOptions: {
				title: "Schedule",
			}
		},

		Lessons: {
			screen: LessonsStack,
			navigationOptions: {
				title: "Lessons",
			}
		},

		Conversations: {
			screen: ConversationsStack,
			defaultNavigationOptions: {
				title: "Conversations",
			}
		},
	},

	{
		initialRouteName: "Dashboard",
		navigationOptions: ({ navigation }) => {
			const {routeName} = navigation.state.routes[navigation.state.index]
			return {
				headerTitle: routeName
			}
		}
	}
)


export default PlayerNavigator
