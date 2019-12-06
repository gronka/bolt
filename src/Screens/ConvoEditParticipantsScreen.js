import React from "react"
import { 
	Button, 
	FlatList,
	Image, 
	ScrollView,
	StyleSheet,
	Text, 
	TextInput,
	TouchableOpacity,
	View, 
} from "react-native"
import SafeAreaView from "react-native-safe-area-view"
import { Ionicons } from "@expo/vector-icons"

import Blanket from "../styles/blanket.js"
import PeopleSearchNameScreen from "../User/Community/PeopleSearchNameScreen.js"


export default class ConvoEditParticipantsScreen extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			showSearchResults: false,
		}
	}
	
	initiateSearch() {

	}

	render() {
		return (
			<SafeAreaView style={{flex: 1}} forceInset={{top: "always", horizontal: "always"}}>
				<TextInput
					style={styles.basicFormTextInput}
					placeholder="Add someone you follow"
				/>

				{this.state.showSearchResults ? (
					<PeopleSearchNameScreen 
					/>
							) : (<View></View>)
				}

				<TouchableOpacity style={styles.backButton} 
					onPress={() => {this.props.navigation.navigate("ConvoEditParticipantsScreen")}}>
					<Ionicons name="md-arrow-round-back" size={60} style={styles.backIcon}></Ionicons>
				</TouchableOpacity>

			</SafeAreaView>
		)
	}
}


const styles = StyleSheet.create({
	fillScreen: {
		flex: 1,
	},

	basicFormButton: {
		marginTop: 20,
		padding: 10,
		height: 50, 
    width: 100,
    alignItems:'center',
    justifyContent:'center',
		borderRadius: 8,
		borderWidth: 0.5,
		borderColor: "#3CF",
		backgroundColor: "#646464",
	},

	backButton: {
		position: "absolute",
		bottom: 15,
		right: 15,
	},

	backIcon: {
		color: "green",
	}
})
