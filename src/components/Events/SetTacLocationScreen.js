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
import MapView, { Marker } from "react-native-maps"

import { 
	AddTacController,
	Blanket,
	Ctx,
	EventMapData,
	NewTacObj,
} from "../../Globals.js"
import { asLocation } from "../../lib/helpers.js"
import LoadingModal from "../LoadingModal.js"


class SetTacLocationScreen extends React.Component {
	constructor(props) {
		super(props)
		this.addressObj = NewTacObj

		// default case is that we are verifying location not manually setting it
		var manualLocation = false
		if (!this.addressObj.hasLocation) {
			manualLocation = true
			this.addressObj.setLat(Ctx.Storage.loc.getLat())
			this.addressObj.setLng(Ctx.Storage.loc.getLng())
		}

		this.initialLat = this.addressObj.getLat()
		this.initialLng = this.addressObj.getLng()
		this.cachedLat = this.initialLat
		this.cachedLng = this.initialLng
		var center = asLocation(this.initialLat, this.initialLng)
		this.map = React.createRef()

		this.state = {
			loading: false,
			updates: 0,
			markerLoc: center,
			manualLocation: manualLocation,
		}
	}

	incrementUpdates = () => { this.setState({ updates: this.state.updates + 1 }) }

	onRegionChange = (region) => {
		var loc = asLocation(region.latitude, region.longitude)
		this.setState({
			markerLoc: loc,
		})
	}

	enableManualLocation = ()  => { this.setState({ manualLocation: true }) }

	cancelManualLocation = () => { 
		var loc = asLocation(this.cachedLat, this.cachedLng)
		region = {
			...loc,
			latitudeDelta: EventMapData.defaultLatDelta/2,
			longitudeDelta: EventMapData.defaultLngDelta,
		}
		this.map.animateToRegion(region)
		
		this.setState({ 
			manualLocation: false,
			markerLoc: loc,
		}) 
	}

	saveManualLocation = (p) => {
		this.cachedLat = this.state.markerLoc.latitude
		this.cachedLng = this.state.markerLoc.longitude
		this.setState({ 
			manualLocation: false, 
		})
	}

	yes = async () => {
		this.addressObj.setLat(this.state.markerLoc.latitude)
		this.addressObj.setLng(this.state.markerLoc.longitude)

		// TODO: send create Tac request
		const uuid = this.addressObj.getUuid()
		const data = this.addressObj.asAddTacJson()
		try {
			await AddTacController.requestWithLoading(uuid, data, this)
			this.props.navigation.navigate("SelectTac")
		} catch(err) {
			// don't navigate/do anything
		}
	}

	render() {
		return(
			<View style={{ flex: 1 }}>
				<LoadingModal visible={this.state.loading} />
				{this.state.manualLocation ? (
					<View>
						<Text style={Blanket.textInputLabel}>Set Tac location:</Text>
						<View style={{ flexDirection: "row" }}>
							<TouchableOpacity style={Blanket.buttonModal} 
								onPress={this.cancelManualLocation}>
								<Text style={Blanket.buttonModalText}>Cancel</Text>
							</TouchableOpacity>

							<TouchableOpacity style={Blanket.buttonModal} 
								onPress={this.saveManualLocation}>
								<Text style={Blanket.buttonModalText}>Save</Text>
							</TouchableOpacity>
						</View>
					</View>

				) : (
					<View>
						<Text style={Blanket.textInputLabel}>Is this location correct?</Text>
						<View style={{ flexDirection: "row"}}>
							<TouchableOpacity style={Blanket.buttonModal} 
								onPress={() => this.props.navigation.navigate("AddTac")}>
								<Text style={Blanket.buttonModalText}>Go Back</Text>
							</TouchableOpacity>

							<TouchableOpacity style={Blanket.buttonModal} 
								onPress={this.enableManualLocation}>
								<Text style={Blanket.buttonModalText}>No</Text>
							</TouchableOpacity>

							<TouchableOpacity style={Blanket.buttonModal} 
								onPress={this.yes}>
								<Text style={Blanket.buttonModalText}>Yes</Text>
							</TouchableOpacity>
						</View>
					</View>
				)}

				<MapView
					style={{ flex: 1, minHeight: 300, marginTop: 10 }}
					ref={ ref => {this.map = ref} }
					provider="google"
					zoomEnabled={this.state.manualLocation}
					scrollEnabled={this.state.manualLocation}
					pitchEnabled={this.state.manualLocation}
					rotateEnabled={this.state.manualLocation}
					onRegionChange={ region => this.onRegionChange(region) }
					initialRegion={{
						latitude: this.initialLat,
						longitude: this.initialLng,
						latitudeDelta: EventMapData.defaultLatDelta/2,
						longitudeDelta: EventMapData.defaultLngDelta,
					}}
				>
					<Marker coordinate={this.state.markerLoc} 
					/>
				</MapView>

			</View>
		)
	}
}


export default withNavigation(SetTacLocationScreen)
