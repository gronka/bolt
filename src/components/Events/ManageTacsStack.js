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
import SetTacLocationScreen from "./SetTacLocationScreen.js"

import { NewTacObj } from "../../lib/Globals.js"


class SelectTacScreen extends React.Component {
	constructor(props) {
		super(props)
	}

	render() {
		return(
			<View style={{ flex: 1 }}>
				<View style={{ flexDirection: "row", flex: 1, justifyContent: "space-between", maxHeight: 66 }}>

					<Text style={Blanket.textInputLabel}>Pick your tac:</Text>

					<TouchableOpacity onPress={ () => this.props.navigation.navigate("AddTac") }>
						<Text style={{ ...Blanket.textInputLabel, color: "green" }}>+ Add a tac</Text>
					</TouchableOpacity>
				</View>

				<Text>Tac 1</Text>
				<Text>Tac 2</Text>
				<Text>Tac 3</Text>
				<Text>Tac 4</Text>

			</View>
		)
	}
}


class AddTacScreen extends React.Component {
	constructor(props) {
		super(props)

		// TODO: check that not accessing NewTacObj directly does not lead to memory
		// leaks
		this.addressDataObj = NewTacObj
		this.addressDataObj.reinit()
		this.addressDataObj.setLat(Storage.loc.getLat())
		this.addressDataObj.setLng(Storage.loc.getLng())

		this.state = {
			updates: 0,
		}
	}

	incrementUpdates = () => { this.setState({ updates: this.state.updates + 1 }) }

	updateName = (p) => { 
		this.addressDataObj.setName(p) 
		this.incrementUpdates()
	}

	render() {
		return( 
			<View>
				<Text style={Blanket.textInputLabel}>Name your tac:</Text>
				<TextInput
					style={Blanket.textInput}
					placeholder="Name your tac - or use the venue name :|"
					onChangeText={ (p) => this.updateName(p) }
				/>
				{this.addressDataObj.name.showWarning() && 
					<Text style={Blanket.warning}>{this.addressDataObj.name.validator.description}</Text>
				}

				<PlacesAutocompleteInput />

			</View>
		)
	}
}


export default ManageTacStack = createStackNavigator(
	{
		SelectTac: {
			screen: SelectTacScreen,
			navigationOptions: { header: null },
		},

		AddTac: {
			screen: AddTacScreen,
			navigationOptions: { header: null },
		},

		SetTacLocation: {
			screen: SetTacLocationScreen,
			navigationOptions: { header: null },
		},

		//EditTac: {
			//screen: EditTacScreen,
			//navigationOptions: { header: null },
		//},
	}
)
