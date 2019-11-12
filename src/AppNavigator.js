import * as React from "react"
import { 
	Image, 
	ScrollView,
	StyleSheet ,
	Text, 
	View, 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from "react-navigation"
import {
  createDrawerNavigator,
  DrawerNavigatorItems,
} from 'react-navigation-drawer';

import Blanket from "./styles/blanket.js"
import { HEIGHT, WIDTH } from "./conf.js"
import UserNavigator from "./User/Navigator.js"
import ManageNavigator from "./Manage/Navigator.js"
import TrainerNavigator from "./Trainer/Navigator.js"
import PaymentNavigator from "./Payment/Navigator.js"
import Storage from "./stores/Storage.js"

import Hidden from "./components/Hidden.js"
import ConvoEditParticipantsScreen from "./Screens/ConvoEditParticipantsScreen.js"


class CustomDrawer extends React.Component {
	// TODO: research what forceInset settings should be activated
	render() {
		return (
			<ScrollView>
				<SafeAreaView forceInset={{top: "always", horizontal: "always"}}>
					<View style={styles.topLinks}>

						<View style={styles.profile}>
							<View style={styles.profileImageView}>
								<Image style={styles.profileImage}
									source={require("../assets/blankProfile.png")} />
							</View>

							<View style={styles.profileText}>
								<Text style={styles.name}>Not Logged In</Text>

							</View>
							
						</View>

					</View>

					<DrawerNavigatorItems {...this.props} />

					<View style={styles.footer}>
						<View style={styles.description}>
							<Text>Flick</Text>

						</View>

						<View style={styles.version}>
							<Text>1.0</Text>

						</View>
						
					</View>
				</SafeAreaView>
			</ScrollView>

		)
	}
}


class SignOutScreen extends React.Component {
	static navigationOptions: {
		title: "Signing out... ",
	}

	componentDidMount() {
		this._signOutAsync()
	}

	_signOutAsync = async () => {
		await Storage.signOut()
		this.props.navigation.navigate("Auth")
	}

	render() {
		return (
			<View>
				<Text>Signing out...</Text>
			</View>
		)
	}
}


const AppNavigator = createDrawerNavigator(
	{
		"User Dashboard": {
			screen: UserNavigator,
			navigationOptions: {
				// TODO: set notifications on the drawer icons
				drawerIcon: <Ionicons name="md-person" size={24}/>
			},
		},

		"Manage Settings": {
			screen: ManageNavigator,
			navigationOptions: {
				// TODO: set notifications on the drawer icons
				drawerLabel: "          Manage Settings",
				drawerIcon: <Ionicons style={{marginLeft: "auto"}} name="md-settings" size={24}/>
			},
		},

		"Trainer Dashboard": {
			screen: TrainerNavigator,
			navigationOptions: {
				// TODO: set notifications on the drawer icons
				drawerIcon: <Ionicons name="md-basketball" size={24}/>
			},
		},

		"Trainer Settings": {
			screen: UserNavigator,
			navigationOptions: {
				// TODO: set notifications on the drawer icons
				drawerLabel: "          Trainer Settings",
				drawerIcon: <Ionicons name="md-settings" size={24}/>
			},
		},

		"Payment Test": {
			screen: PaymentNavigator,
			navigationOptions: {
				// TODO: set notifications on the drawer icons
				drawerLabel: "Payment Test",
				drawerIcon: <Ionicons name="md-settings" size={24}/>
			},
		},

		"Sign Out": {
			screen: SignOutScreen,
		},
		
		"ConvoEditParticipantsScreen": {
			screen: ConvoEditParticipantsScreen,
			navigationOptions: {
				drawerLabel: <Hidden />,
			},
		},
	},
	{
		drawerWidth: WIDTH*0.7,
		contentComponent: CustomDrawer,
	},
)


const styles = StyleSheet.create({
	drawer: {
		paddingTop: 30,
	},

	topLinks: {
		height: 160,
		backgroundColor: "black",

	},

	profile: {
		flex: 1,
		flexDirection: "row",
		alignItems: "center",
		paddingTop: 25,
		borderBottomWidth: 1,
		borderBottomColor: "#777777",
	},

	profileText: {
		flex: 2,
		flexDirection: "column",
	  justifyContent: "center",
	},

	name: {
		fontSize: 20,
		paddingBottom: 5,
		color: "white",
		textAlign: "left",
	},

	profileImageView: {
		flex: 1,
		flexDirection: "column",
		justifyContent: "center",
	},

	profileImage: {
		height: 70,
		width: 70,
		borderRadius: 50,
	},

	footer: {
		height: 50,
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: "white",
		borderTopWidth: 1,
		borderTopColor: "gray",
	},

	version: {
		flex: 1,
		textAlign: "right",
		marginRight: 20,
		color: "gray",
	},

	description: {
		flex: 1,
		textAlign: "right",
		marginLeft: 20,
		color: "gray",
		fontSize: 16,
	},

})


export default AppNavigator
