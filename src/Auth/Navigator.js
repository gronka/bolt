import * as React from 'react';
import { 
	ActivityIndicator, 
	StatusBar,
	Button, 
	View, 
	Text, 
	TextInput, 
	StyleSheet,
} from "react-native"
import { withNavigationFocus } from "react-navigation"
import { createStackNavigator } from "react-navigation-stack"
import { decode as atob } from "base-64"

import { conf } from "../conf.js"
import { submitWithLoading } from "../helpers.js"
import EmailSignUpScreen from "./EmailSignUp.js"
import EmailSignInScreen from "./EmailSignIn.js"
import VerifyPhoneScreen from "./VerifyPhoneScreen.js"
import Ax from "../stores/Ax.js"
import Storage from "../stores/Storage.js"

import SchedulerScreen from "./SchedulerScreen.js"


class SelectAuthScreen extends React.Component {
	render() {
		return (
			<View style={ styles.welcome }>

				<Text>TODO: make sign up options fold out</Text>
				<Button 
					title="Email Sign Up" 
					onPress={() => this.props.navigation.navigate("EmailSignUp")}
				/>
				<Button 
					title="Google Sign Up" 
					onPress={() => this.props.navigation.navigate("GoogleSignUp")}
				/>

				<Text>TODO: make sign in options fold out</Text>
				<Button 
					title="Email Sign In" 
					onPress={() => this.props.navigation.navigate("EmailSignIn")}
				/>
				<Button 
					title="Google Sign In" 
					onPress={() => this.props.navigation.navigate("GoogleSignIn")}
				/>

				<Text>For dev only</Text>
				<Button 
					title="Sign in as 1" 
					onPress={() => this.props.navigation.navigate("FakeSignInAsOne")}
				/>

				<Button 
					title="Fake Sign In" 
					onPress={() => this.props.navigation.navigate("FakeSignIn")}
				/>

				<Button 
					title="Phone Verification" 
					onPress={() => this.props.navigation.navigate("PhoneVerification")}
				/>

				<Button 
					title="Scheduler" 
					onPress={() => this.props.navigation.navigate("Scheduler")}
				/>
			</View>
		)
	}
}


//
// SignUp
//
class GoogleSignUpScreen extends React.Component {
	render() {
		return (
			<View style={ styles.welcome }>
				<Text>Google sign up placeholder</Text>
			</View>
		)
	}
}


//
// SignIn
//
class GoogleSignInScreen extends React.Component {
	render() {
		return (
			<View style={ styles.welcome }>
				<Text>Google sign in placeholder</Text>
			</View>
		)
	}
}


class FakeSignInScreen extends React.Component {
	static navigationOptions: {
		title: "Faking sign in",
	}

	componentDidMount() {
		this._signInAsync()
	}

	_signInAsync = async () => {
		await Storage.signIn("fakeUserUuid", "fakeJwt")
		this.props.navigation.navigate("App")
	}

	render() {
		return (
			<View>
				<Text>Faking sign in</Text>
			</View>
		)
	}
}


class FakeSignInAsOneComp extends React.Component {
	static navigationOptions: {
		title: "Faking sign in",
	}

	componentDidMount() {
		this._signInAsync()
	}

	componentDidUpdate(prevProps) {
		if (prevProps.isFocused !== this.props.isFocused) {
			this._signInAsync()
		}
	}

	_signInAsync = async () => {
		let endpoint = "/user/signin"

		// TODO: check fields for errors
		let data = {
			phoneOrEmail: "1",
			password: "1",
			callingCode: "1",
			phoneCountryIso: "us",
		}

		onResponse = (resp) => {
			console.log(JSON.stringify(resp.data))
			if (resp.data.i === conf["INFO_ACCEPTED"]) {
				var jwt = resp.data.b.jwt
				var claims = JSON.parse(atob(jwt.split('.')[1]))

				Storage.signIn(claims.userUuid, jwt)
				Ax.remakeAxios(jwt)
			}

			Storage.processCommand(this.props.navigation)
		}

		submitWithLoading(this, endpoint, data, onResponse)
	}

	render() {
		return (
			<View>
				<Text>Faking sign in</Text>
			</View>
		)
	}
}
const FakeSignInAsOneScreen = withNavigationFocus(FakeSignInAsOneComp)


const AuthNavigator = createStackNavigator(
	{
		SelectAuth: {
			screen: SelectAuthScreen,
			navigationOptions: {
				title: "Select Auth",
			}
		},

		//
		// SignUp
		//
		EmailSignUp: {
			screen: EmailSignUpScreen,
			navigationOptions: {
				title: "Email Sign Up",
			}
		},

		GoogleSignUp: {
			screen: GoogleSignUpScreen,
			navigationOptions: {
				title: "Google Sign Up",
			}
		},

		//
		// SignIn
		//
		EmailSignIn: {
			screen: EmailSignInScreen,
			navigationOptions: {
				title: "Email Sign In",
			}
		},

		GoogleSignIn: {
			screen: GoogleSignInScreen,
			navigationOptions: {
				title: "Google Sign In",
			}
		},

		FakeSignIn: {
			screen: FakeSignInScreen,
		},

		FakeSignInAsOne: {
			screen: FakeSignInAsOneScreen,
		},

		VerifyPhone: {
			screen: VerifyPhoneScreen,
			navigationOptions: {
				title: "Phone Verification",
			}
		},

		Scheduler: {
			screen: SchedulerScreen,
		},
	},
	{
		initialRouteName: "SelectAuth",

	}
)


export default AuthNavigator


const styles = StyleSheet.create({
	welcome: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	}
})
