import React from "react"
import { Text, View } from "react-native"
import { Ionicons } from '@expo/vector-icons';
import { createStackNavigator } from "react-navigation-stack"
import { createBottomTabNavigator } from "react-navigation-tabs"

import AddCcWebView from "./AddCcWebView.js"


export const defNavOpts = (navigation) => {
	return {
		headerLeft: (
			<Ionicons name="md-menu" size={30}
				style={{ paddingLeft: 10 }}
				onPress={() => navigation.openDrawer()}
			/>
		),

		headerRight: (
			<Ionicons name="md-happy" size={30}
				style={{ paddingRight: 10 }}
				onPress={() => navigation.navigate("MyProfile")}
			/>
		),
	}
}


class PaymentScreen extends React.Component {
	onPaymentSuccess = (token) => {
		// send token to backend
	}
	
	onClose = () => {
		// maybe nav to other screen?
	}
	
	render() {
		return (
				<AddCcWebView style={{ flex: 1 }}
				publicKey="pk_test_8PfL5rQ2K1SaD9cSykWHhu17009ZmNVYj"
				amount={100000}
				imageUrl="https://pbs.twimg.com/profile_images/778378996580888577/MFKh-pNn_400x400.jpg"
				storeName="Stripe Checkout"
				description="Test"
				currency="USD"
				allowRememberMe={false}
				prepopulatedEmail="test@test.com"
				onClose={this.onClose}
				onPaymentSuccess={this.onPaymentSuccess}
			  />
		)
	}
}


const PaymentStack = createStackNavigator(
	{
		Payment: {
			screen: PaymentScreen,
			navigationOptions: {
				title: "Payment",
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
		Payment: {
			screen: PaymentStack,
			navigationOptions: {
				title: "Payment",
			}
		},
	},

	{
		initialRouteName: "Payment",
		navigationOptions: ({ navigation }) => {
			const {routeName} = navigation.state.routes[navigation.state.index]
			return {
				headerTitle: routeName
			}
		}
	}
)


export default PlayerNavigator
