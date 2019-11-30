import React from "react"
import { 
	FlatList,
	Text, 
	TextInput, 
	TouchableOpacity,
	View, 
} from "react-native"
import { createStackNavigator } from "react-navigation-stack"

import Storage from "../../stores/Storage.js"
import Blanket from "../../styles/blanket.js"
import PlacesAutocompleteInput from "./PlacesAutocompleteInput.js"
import SetVenueLocationScreen from "./SetVenueLocationScreen.js"

import { NewVenueObj } from "../../lib/Globals.js"


class SelectVenueScreen extends React.Component {
	constructor(props) {
		super(props)
	}

	render() {
		return(
			<View style={{ flex: 1 }}>
				<View style={{ flexDirection: "row", flex: 1, justifyContent: "space-between", maxHeight: 66 }}>

					<Text style={Blanket.textInputLabel}>Your venues:</Text>

					<TouchableOpacity onPress={ () => this.props.navigation.navigate("AddVenue") }>
						<Text style={{ ...Blanket.textInputLabel, color: "green" }}>+ Add a venue</Text>
					</TouchableOpacity>
				</View>

				<Text>Venue 1</Text>
				<Text>Venue 2</Text>
				<Text>Venue 3</Text>
				<Text>Venue 4</Text>

			</View>
		)
	}
}


class AddVenueScreen extends React.Component {
	constructor(props) {
		super(props)

		// TODO: check that not accessing NewVenueObj directly does not lead to memory
		// leaks
		this.addressDataObj = NewVenueObj
		this.addressDataObj.reinitToUserLoc()

		this.state = {
			updates: 0,
		}
	}

	incrementUpdates = () => { this.setState({ updates: this.state.updates + 1 }) }

	updateVenue = (p) => { 
		this.addressDataObj.setVenue(p) 
		this.incrementUpdates()
	}

	render() {
		return( 
			<View>
				<Text style={Blanket.textInputLabel}>Venue name:</Text>
				<TextInput
					style={Blanket.textInput}
					placeholder="Venue name"
					onChangeText={ (p) => this.updateVenue(p) }
				/>
				{this.addressDataObj.venue.showWarning() && 
					<Text style={Blanket.warning}>{this.addressDataObj.venue.validator.description}</Text>
				}

				<PlacesAutocompleteInput />

			</View>
		)
	}
}


export default ManageVenuesStack = createStackNavigator(
	{
		SelectVenue: {
			screen: SelectVenueScreen,
			navigationOptions: { header: null },
		},

		AddVenue: {
			screen: AddVenueScreen,
			navigationOptions: { header: null },
		},

		SetVenueLocation: {
			screen: SetVenueLocationScreen,
			navigationOptions: { header: null },
		},

		//EditVenue: {
			//screen: EditVenueScreen,
			//navigationOptions: { header: null },
		//},
	}
)
