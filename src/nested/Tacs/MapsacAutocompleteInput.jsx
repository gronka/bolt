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

import { 
	Blanket,
	CrumbNav,
	MapsacAutocompleteOneshotter,
	MapsacLookupOneshotter,
	NewTacObj,
} from "../../Globals.js"
import LoadingModal from "../../components/LoadingModal.jsx"


class MapsacAutocompleteInput extends React.Component {
	constructor(props) {
		super(props)
		this.event = CrumbNav.getParam("event")  // only for Nav
		this.oneshotter = MapsacAutocompleteOneshotter
		this.lookupOneshotter = MapsacLookupOneshotter
		this.addressObj = NewTacObj

		this.state = {
			loading: false,
			address: "",
			updates: 0,
			results: [],
		}
	}

	incrementUpdates = () => { this.setState({ updates: this.state.updates + 1 }) }

	updatePredictions = async (p) => {
		this.setState({ address: p })
		this.addressObj.setAddress(p)
		this.incrementUpdates()

		if (this.addressObj.getAddress().length > 2) {
			const uuid = this.addressObj.getReqUuid()
			const data = this.addressObj.asMapsacAutocompleteJson()
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
			const request = await this.lookupOneshotter.requestWithLoading(address.place_id, data, this)
			placeData = request.response.data.b.place
			this.addressObj.setFromMapsac(placeData)
			this.setState({ address: this.addressObj.getAddress() })

		} catch(err) {
			console.log("======ERROR======")
			console.log(err)
		}

		this.checkAndProceedToSetLocation()
	}

	ignoreSuggestions = () => {
		const name = this.addressObj.getName()
		// need to clear google data
		this.addressObj.reinitToUserLoc()
		this.addressObj.setName(name)
		this.addressObj.setAddress(this.state.address)
		this.checkAndProceedToSetLocation()
	}

	checkAndProceedToSetLocation = () => {
		if (this.addressObj.isValidForSetLocation()) {
			if (this.event.state === "create") {
				CrumbNav.to(this.props.navigation, "CeSetTacLocation", {event: this.event})
			} else if (this.event.state === "edit") {
				CrumbNav.to(this.props.navigation, "EeSetTacLocation", {event: this.event})
			}
		} else {
			// do nothing
		}
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
			<View style={ Blanket.addressResult }>
				<TouchableOpacity style={{ flex: 1 }} onPress={ selectThisAddress }>
					<Text style={{ fontSize: 16 }}>{address.description}</Text>
					<View style={{ flex: 1, flexDirection: "row", justifyContent: "flex-end"}}>
						<Text style={{ fontSize: 14 }}>{renderDistanceText}</Text>
					</View>
				</TouchableOpacity>
			</View>
		)
	}

	_listEmptyComponent = () => {
		return (
			<View style={ Blanket.addressResult }>
				<Text style={{ fontSize: 16 }}>Start typing for location suggestions</Text>
			</View>
		)
	}

	render() {
		return(
			<View>
				<LoadingModal visible={this.state.loading} />

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


export default withNavigation(MapsacAutocompleteInput)
