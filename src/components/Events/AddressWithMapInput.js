import React from "react"
import { 
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
	
	updateAddress = (p) => {
		this.address.setAndValidate(p)
		this.incrementUpdates()
	}

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

	addressSave = () => {
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
		this.address = new AddressValue("")

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
		this.props.onSave()
	}

	updateAddress = () => {
		this.address.setAndValidate(p)
		this.incrementUpdates()

		if (this.address.value.length > 2) {
			// TODO: api request
		}
	}

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

	_keyExtractor = (user, index) => user.userUuid

	_renderItem = ({item}) => {
		const user = item
		return (
			<PersonResult 
				userUuid={user.userUuid}
				key={user.userUuid}
				navigation={this.props.navigation}
			/>
		)
	}

	_listEmptyComponent = () => {
		return (<Text>No search results</Text>)
	}

	render() {
		return (
			<View style={{flex: 1}}>
			<FlatList
				data={this.props.results}
				renderItem={this._renderItem}
				keyExtractor={this._keyExtractor}
				ListEmptyComponent={this._listEmptyComponent}
				onRefresh={this.onRefresh}
				refreshing={this.state.refreshing}
			/>
					</View>
		)
	}
}
