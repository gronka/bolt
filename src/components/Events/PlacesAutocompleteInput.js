import React from "react"
import { 
	FlatList,
	StyleSheet,
	Text, 
	TextInput, 
	TouchableOpacity,
	View, 
} from "react-native"
import { withNavigation } from "react-navigation"

import Storage from "../../stores/Storage.js"
import Blanket from "../../styles/blanket.js"
import { 
	PlacesAutocompleteOneshotter,
	PlacesLookupOneshotter,
} from "../../lib/RequestHandlers.js"
import { NewVenueObj } from "../../lib/Globals.js"


class PlacesAutocompleteInput extends React.Component {
	constructor(props) {
		super(props)
		this.oneshotter = PlacesAutocompleteOneshotter
		this.lookupOneshotter = PlacesLookupOneshotter
		this.addressDataObj = NewVenueObj

		this.state = {
			address: "",
			updates: 0,
			results: [],
		}
	}

	incrementUpdates = () => { this.setState({ updates: this.state.updates + 1 }) }

	updatePredictions = async (p) => {
		this.setState({ address: p })
		this.addressDataObj.setAddress(p)
		this.incrementUpdates()

		if (this.addressDataObj.getAddress().length > 2) {
			const uuid = this.addressDataObj.getUuid()
			const data = this.addressDataObj.asPlacesAutocompleteJson()
			try {
				const request = await this.oneshotter.request(uuid, data)
				this.setState({ results: request.response.data.b.predictions })
			} catch(err) {
				console.log("======ERROR======")
				console.log(err)
			}
		}
	}

	selectAddress = async (address) => {
		var placeData = {}
		try {
			const data = { placeId: address.place_id}
			console.log(data)
			const request = await this.lookupOneshotter.request(address.place_id, data)
			placeData = request.response.data.b.place
			this.addressDataObj.setFromPlaces(placeData)
			console.log(this.addressDataObj.getAddress())
			this.setState({ address: this.addressDataObj.getAddress() })

		} catch(err) {
			console.log("======ERROR======")
			console.log(err)
		}

		this.props.navigation.navigate("SetVenueLocation")
	}

	ignoreSuggestions = () => {
		const venue = this.addressDataObj.getVenue()
		this.addressDataObj.reinitToUserLoc()
		this.addressDataObj.setVenue(venue)
		this.addressDataObj.setAddress(this.state.address)
		this.props.navigation.navigate("SetVenueLocation")
	}

	/*
	 * FlatList functions
	 */
	_keyExtractor = (address, index) => address.place_id

	_renderItem = ({item}) => {
		const address = item
		selectThisAddress = () => { this.selectAddress(address) }

		// TODO: metric or standard units
		var renderDistanceText = ""
		if (address.distance_meters != null) {
			renderDistanceText = (address.distance_meters / 1000) + " km"
		}

		return (
			<View style={ styles.addressResult }>
				<TouchableOpacity style={{ flex: 1 }} onPress={ selectThisAddress }>
					<Text style={{ fontSize: 16 }}>{address.description} ></Text>
					<View style={{ flex: 1, flexDirection: "row", justifyContent: "flex-end"}}>
						<Text style={{ fontSize: 14 }}>{renderDistanceText}</Text>
					</View>
				</TouchableOpacity>
			</View>
		)
	}

	_listEmptyComponent = () => {
		return (
			<View style={ styles.addressResult }>
				<Text style={{ fontSize: 16 }}>Start typing for location suggestions</Text>
			</View>
		)
	}

	render() {
		return(
			<View>
					<Text style={Blanket.textInputLabel}>Address:</Text>
					<TextInput
						style={Blanket.textInput}
						value={ this.state.address }
						multiline={true}
						placeholder="Address"
						onChangeText={ (p) => this.updatePredictions(p) }
					/>

					<View style={{ flexDirection: "row", justifyContent: "space-between" }}>
						<Text style={Blanket.textInputLabel}>Suggestions:</Text>
						<TouchableOpacity onPress={ this.ignoreSuggestions }>
							<Text style={{...Blanket.textInputLabel, 
								color: "red", fontSize: 14 }}>Ignore Suggestions ></Text>
						</TouchableOpacity>
					</View>
					<FlatList
						data={this.state.results}
						renderItem={this._renderItem}
						keyExtractor={this._keyExtractor}
						ListEmptyComponent={this._listEmptyComponent}
					/>


			</View>
		)
	}
}


const styles = StyleSheet.create({
	addressResult: {
		marginHorizontal: 10,
		paddingVertical: 10,
		height: 60,
		borderTopWidth: 1,
		borderTopColor: "#DDD",
	},

	name: {
		height: 40,
	},
})


export default withNavigation(PlacesAutocompleteInput)
