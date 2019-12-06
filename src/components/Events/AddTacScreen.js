import React from "react"
import { 
	Text, 
	TextInput, 
	TouchableOpacity,
	View, 
} from "react-native"

import Blanket from "../../styles/blanket.js"
import Storage from "../../stores/Storage.js"
import { post } from "../../lib/network.js"
import MapsacAutocompleteInput from "./MapsacAutocompleteInput.js"

import { NewTacObj, GetTacsController } from "../../stores/Globals.js"


class AddTacScreen extends React.Component {
	constructor(props) {
		super(props)

		// TODO: check that not accessing NewTacObj directly does not lead to memory
		// leaks
		this.addressObj = NewTacObj
		this.addressObj.reinitToUserLoc()

		this.state = {
			updates: 0,
		}
	}

	incrementUpdates = () => { this.setState({ updates: this.state.updates + 1 }) }

	updateName = (p) => { 
		this.addressObj.setName(p) 
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
				{this.addressObj.name.showWarning() && 
					<Text style={Blanket.warning}>{this.addressObj.name.validator.description}</Text>
				}

				<MapsacAutocompleteInput />

			</View>
		)
	}
}


export default AddTacScreen
