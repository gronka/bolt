import React from "react"
import { Button, Text, View, Image, ScrollView } from "react-native"
import { Ionicons } from '@expo/vector-icons';
import { createStackNavigator } from "react-navigation-stack"
import { createBottomTabNavigator } from "react-navigation-tabs"

import EditProfileScreen from "./EditProfileScreen.js"
import MyProfileScreen from "./MyProfileScreen.js"
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
			<Ionicons name="md-home" size={30}
				style={{ paddingRight: 10 }}
				onPress={() => navigation.navigate("Dashboard")}
			/>
		),
	}
}


class DashboardScreen extends React.Component {
	render() {
		return (
			<View style={{ flex: 1, alignItems: "center", justifyContent: "center"}}>

				<Text>Player Settings Dashboard Screen</Text>
				<Button
					title="Go to HomeBase"
					onPress={() => this.props.navigation.navigate("HomeBase")}
				/>
			</View>
		)
	}
}


const MyProfileStack = createStackNavigator(
	{
		MyProfile: {
			screen: MyProfileScreen,
			defaultNavigationOptions: {
				title: "My Profile",
			}
		}
	},
	{
		defaultNavigationOptions: ({ navigation }) => {
			return defNavOpts(navigation)
		}
	}
)


const EditProfileStack = createStackNavigator(
	{
		EditProfile: {
			screen: EditProfileScreen,
			navigationOptions: {
				title: "Edit Profile",
			}
		}
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


const PlayerSettingsNavigator = createBottomTabNavigator(
	{
		MyProfile: {
			screen: MyProfileStack,
			navigationOptions: {
				title: "My Profile",
			},
		},

		EditProfile: {
			screen: EditProfileStack,
			navigationOptions: {
				title: "Edit Profile",
			},
		},

		Schedule: {
			screen: ScheduleStack,
			navigationOptions: {
				title: "Schedule",
			},
		},

		Lessons: {
			screen: LessonsStack,
			navigationOptions: {
				title: "Lessons",
			},
		},

		Conversations: {
			screen: ConversationsNavigator,
			navigationOptions: {
				title: "Conversations",
			},
		},
	},

	{
		//initialRouteName: "MyProfile",
		//navigationOptions: ({ navigation }) => {
			//const {routeName} = navigation.state.routes[navigation.state.index]
			//return {
				//headerTitle: routeName
			//}
		//}
	}
)


export default PlayerSettingsNavigator
