import * as React from "react"
import { Button, Text, View, Image, StyleSheet } from "react-native"
import { Ionicons } from '@expo/vector-icons';

import Blanket from "../../styles/blanket.js"


export default class PeopleScreen extends React.Component {
	render() {
		return (
			<View style={ styles.container }>
				<Text>Search by zip (near me)</Text>
				<Text>Search by name</Text>
				<PersonResult />
				<PersonResult />
				<PersonResult />
			</View>
		)
	}
}


class PersonResult extends React.Component {
	render() {
		return (
			<View style={ styles.personResult }>
				<View style={styles.profileImageView}>
					<Image style={styles.profileImage}
						source={require("../../../assets/blankProfile.png")} />
				</View>

				<Text>Username</Text>
				<Text>Badges</Text>
				<Text>Message</Text>

			</View>
		)
	}
}


const styles = StyleSheet.create({
	container: {
		flex: 1,
	},

	personResult: {
		flex: 1,
		flexDirection: "row",
		paddingTop: 10,
		paddingLeft: 10,
		paddingBottom: 10,
		maxHeight: 60,
		borderBottomWidth: 1,
		borderBottomColor: "gray",
	},

	name: {
		height: 40,
	},

	profileImageView: {
		width: 40,
	},

	profileImage: {
		height: 40,
		width: 40,
		borderRadius: 50,
	},
})
