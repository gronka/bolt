import React from "react"
import { 
	FlatList,
	Modal,
	StyleSheet,
	Text, 
	TextInput, 
	TouchableOpacity,
	View, 
} from "react-native"

import MapView, { Marker } from "react-native-maps"
import { EventMapData } from "../../stores/MapData.js"
import Storage from "../../stores/Storage.js"
import Blanket from "../../styles/blanket.js"
import { 
	AddressDataObj,
	PlacesAutocompleteOneshotter,
} from "../../lib/RequestHandlers.js"
import { 
	AddressValue,
	LatValue,
	LngValue,
} from "../../lib/DataValues.js"


export default class AddressWithMapInput extends React.Component {
	constructor(props) {
		super(props)
		this.address = new AddressValue("")
		// TODO: load default values, perhaps from owned venue spaces
		this.markerLat = new LatValue(Storage.loc.getLat())
		this.markerLng = new LngValue(Storage.loc.getLng())

		this.state = {
			loading: false,
			failed: false,
			updates: 0,
			addressLookup: false,
			markerLat: this.markerLat.value,
			markerLng: this.markerLng.value,
		}
	}

	incrementUpdates = () => { this.setState({ updates: this.state.updates + 1 }) }

	onRegionChangeComplete = () => {
		// TODO: this
	}

	getMapCenter = () => {
		return {
			latitude: this.state.markerLat,
			longitude: this.state.markerLng,
		}
	}

	enableAddressLookup = ()  => { this.setState({ addressLookup: true }) }
	addressCancel = () => { this.setState({ addressLookup: false }) }

	addressSave = (p) => {
		this.address.setAndValidate(p)
		this.incrementUpdates()
		this.setState({ addressLookup: false })
	}

	render() {
		const center = this.getMapCenter()
		return(
			<View>
				<Text style={Blanket.textInputLabel}>Address:</Text>
				<TouchableOpacity onPress={this.enableAddressLookup}>
					<Text style={Blanket.textInput}>nav to lookup</Text>
				</TouchableOpacity>

				<AddressLookupModal 
					visible={this.state.addressLookup}
					onCancel={this.addressCancel}
					onSave={this.addressSave}
					/>

				{this.address.showWarning() && 
					<Text style={Blanket.warning}>{this.address.validator.description}</Text>
				}

				<MapView
					style={{ height: 200 }}
					provider="google"
					zoomEnabled={false}
					scrollEnabled={false}
					pitchEnabled={false}
					rotateEnabled={false}
					onRegionChangeComplete={this.onRegionChangeComplete}
					initialRegion={{
						latitude: this.markerLat.value,
						longitude: this.markerLng.value,
						latitudeDelta: EventMapData.defaultLatDelta/2,
						longitudeDelta: EventMapData.defaultLngDelta,
					}}
				>
					<Marker coordinate={center} />
				</MapView>

			</View>
		)
	}
}


class AddressLookupModal extends React.Component {
	constructor(props) {
		super(props)
		this.oneshotter = PlacesAutocompleteOneshotter
		this.addressDataObj = new AddressDataObj()

		this.state = {
			loading: false,
			failed: false,
			updates: 0,
			results: [],
		}
	}

	incrementUpdates = () => { this.setState({ updates: this.state.updates + 1 }) }

	cancel = () => {
		this.props.onCancel()
	}

	save = () => {
		this.props.onSave(this.addressDataObj)
	}

	updateAddress = (p) => {
		this.addressDataObj.setAddress(p)
		this.incrementUpdates()

		if (this.addressDataObj.getAddress().length > 2) {
			this.apiCall()
		}
	}

	apiCall = async (p) => {
		const uuid = this.addressDataObj.getUuid()
		const data = this.addressDataObj.asPlacesAutocompleteJson()
		try {
			const request = await this.oneshotter.request(uuid, data)
			console.log("======RESPONSE======")
			console.log(JSON.stringify(request.response))
			this.setState({ results: request.response.data.b.predictions })
		} catch(err) {
			console.log("======ERROR======")
			console.log(err)
		}
	}

	//apiCall = (p) => {
		//const uuid = this.addressDataObj.getUuid()
		//const data = this.addressDataObj.asPlacesAutocompleteJson()
		//this.oneshotter.request(uuid, data)
			//.then( (response) => {
				//console.log("======RESPONSE======")
				////console.log(response)
				//console.log(response.data.b)
				//this.setState({ results: response.data.b.predictions })
			//})
			//.catch( (err) => {
				//console.log(err)
			//})
	//}

	render() {
		return(
			<View>
				{this.props.visible &&
					<Modal>
						<View style={{ flex: 1 }}>

							<View style={{ flexDirection: "row"}}>
								<TouchableOpacity style={Blanket.buttonModal} 
									onPress={this.cancel}>
									<Text style={Blanket.buttonModalText}>Cancel</Text>
								</TouchableOpacity>

								<TouchableOpacity style={Blanket.buttonModal} 
									onPress={this.save}>
									<Text style={Blanket.buttonModalText}>Save</Text>
								</TouchableOpacity>
							</View>

							<Text style={Blanket.textInputLabel}>Address:</Text>
							<TextInput
								style={Blanket.textInputModal}
								placeholder="Address"
								onChangeText={ (p) => this.updateAddress(p) }
							/>

							<AddressFlatList
								addresses={this.state.results}
							/>

						</View>
					</Modal>
				}
			</View>
		)
	}
}


class AddressFlatList extends React.Component {
	constructor(props) {
		super(props)
	}

	_keyExtractor = (address, index) => address.place_id

	_renderItem = ({item}) => {
		const address = item
		return (
			<View>
				<Text>{address.description}</Text>
			</View>
		)
	}

	_listEmptyComponent = () => {
		return (<Text>Start typing to find places!</Text>)
	}

	render() {
		return (
			<View style={{flex: 1}}>
				<FlatList
					data={this.props.addresses}
					renderItem={this._renderItem}
					keyExtractor={this._keyExtractor}
					ListEmptyComponent={this._listEmptyComponent}
				/>
			</View>
		)
	}
}
