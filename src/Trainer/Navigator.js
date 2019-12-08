import React from "react"
import { Button, Text, View, Image, ScrollView } from "react-native"
import { Ionicons } from '@expo/vector-icons';
import { getActiveChildNavigationOptions } from "react-navigation"
import { createStackNavigator } from "react-navigation-stack"
import { createBottomTabNavigator } from "react-navigation-tabs"

import { Blanket } from "../Globals.js"


class TrainerProfile extends React.Component {
  static navigationOptions = {
    title: 'Profile',
    drawerIcon: ({ focused }) => (
      <Ionicons name="md-person" size={24} color={focused ? 'blue' : 'black'} />
    ),
  };

  render() {
    return (
      <View style={Blanket.container}>
        <Text
          style={Blanket.paragraph}
          onPress={() => {
            this.props.navigation.navigate('Home');
          }}>
          Go back home
        </Text>
      </View>
    );
  }
}


class HomeBaseButton extends React.Component {
	render() {
		return (
				<Button
					title="Go to HomeBase"
					onPress={() => this.props.navigation.navigate("HomeBase")}
				/>
		)
	}
}



class NotificationsScreen extends React.Component {
	//static navigationOptions = {
		//title: "Notifications",
	//}

	render() {
		return (
			<View style={{ flex: 1, alignItems: "center", justifyContent: "center"}}>
				<Text>Trainer Notifications Screen</Text>
				<Button
					title="Go to HomeBase"
					onPress={() => this.props.navigation.navigate("HomeBase")}
				/>
			</View>
		)
	}
}


class MessagesScreen extends React.Component {
	render() {
		return (
			<View style={{ flex: 1, alignItems: "center", justifyContent: "center"}}>
				<Text>Trainer Messages Screen</Text>
				<HomeBaseButton {...this.props} />
			</View>
		)
	}
}


class SchedulerScreen extends React.Component {
	render() {
		return (
			<View style={{ flex: 1, alignItems: "center", justifyContent: "center"}}>
				<Text>Trainer Scheduler Screen</Text>
				<Button
					title="Go to details"
					onPress={() => this.props.navigation.navigate("Details")}
				/>
			</View>
		)
	}
}


class ProfileScreen extends React.Component {
	render() {
		return (
			<View style={{ flex: 1, alignItems: "center", justifyContent: "center"}}>
				<Text>Trainer Profile Screen</Text>
				<Button
					title="Go to schedule"
					onPress={() => this.props.navigation.navigate("Scheduler")}
				/>
			</View>
		)
	}
}


const TrainerNavigator = createBottomTabNavigator(
	{
		TrainerNotifications: {
			screen: NotificationsScreen,
			navigationOptions: {
				title: "where am i"
				//tabBarLabel: "where am i",
			},
		},

		Messages: {
			screen: MessagesScreen
		},
		Scheduler: {
			screen: SchedulerScreen
		},
		Profile: {
			screen: ProfileScreen
		},
	},
	{
		initialRouteName: "TrainerNotifications",
		//defaultNavigationOptions: {
			//headerStyle: {
				//backgroundColor: "#f4511e",
			//},
			//headerTintColor: "#ccc",
			//headerTitleStyle: {
				//fontWeight: "bold",
			//},
		//},

	}
)


const TrainerStackNavigator = createStackNavigator(
	{
		TrainerNavigator: TrainerNavigator,
	},
	{
		defaultNavigationOptions: ({ navigation, screenProps }) => {
			return {
				...getActiveChildNavigationOptions(navigation, screenProps),
				headerLeft: (
					<Ionicons name="md-menu" size={30}
						style={{paddingLeft: 10}}
						onPress={() => navigation.openDrawer()}
					/>
				),

				headerRight: (
					<Ionicons name="md-happy" size={30}
						style={{paddingRight: 10}}
						onPress={() => navigation.navigate("My Trainer Profile")}
					/>
				),

			}

		}

	}
)

export default TrainerStackNavigator
