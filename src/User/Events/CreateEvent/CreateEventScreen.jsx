import React from "react"
import { 
	Text, 
	TextInput, 
	TouchableOpacity,
	View, 
	ScrollView,
} from "react-native"
import MapView, { Marker } from "react-native-maps"
import { withNavigation, withNavigationFocus } from "react-navigation"

import { 
	Blanket, 
	CreateEventController,
	EventMapData, 
	NewEventObj,
} from "../../../Globals.js"
import DateRangeInput from "./DateRangeInput.jsx"
import LoadingModal from "../../../components/LoadingModal.jsx"


class CreateEventScreen extends React.Component {
	constructor(props) {
		super(props)

		// Note: to avoid data duplication, we simply increment state.updates in
		// order to refresh the view
		this.newEvent = NewEventObj

		this.state = {
			loading: false,
			failed: false,
			updates: 0,
			tacSelected: false,

			title: "",
			eventLat: 0,
			eventLng: 0,
		}
	}

	incrementUpdates = () => { this.setState({ updates: this.state.updates + 1 }) }

	componentDidUpdate(prevProps) {
    if (!this.state.tacSelected && this.props.isFocused) {
			if (this.newEvent.getTacName()) {
				this.setState({ 
					tacSelected: true,
				})
			}
    }

		const stateLat = this.state.eventLat.toFixed(8)
		const tacLat = this.newEvent.getLat().toFixed(8)
			if (stateLat !== tacLat) {
				this.setState({ 
					eventLat: this.newEvent.getLat(),
					eventLng: this.newEvent.getLng(),
				})
			}
  }

	updateTitle = (p) => {
		this.newEvent.setTitle(p)
		this.incrementUpdates()
	}

	updateQuickInfo = (p) => {
		this.newEvent.setQuickInfo(p)
		this.incrementUpdates()
	}

	updateName = (p) => {
		this.setTacName(p)
		this.incrementUpdates()
	}

	navigateToAddTac = () => {
		this.setState({ tacSelected: false })
		this.props.navigation.navigate("ManageTacsStack") 
	}

	createEvent = async () => {
		if (this.newEvent.isValidForCreate()) {
			const uuid = this.newEvent.getUuid()
			const data = this.newEvent.asCreateEventJson()

			try {
				await CreateEventController.requestWithLoading(uuid, data, this)
				this.props.navigation.navigate("EditEvent")
			} catch(err) {
				// don't navigate/do anything
			}
		}
	}

	render() {
		return(
			<ScrollView>
				<LoadingModal visible={this.state.loading} />
				<Text style={Blanket.textInputLabel}>Event name:</Text>
				<TextInput
					style={Blanket.textInput}
					placeholder="Event name"
					onChangeText={ (p) => this.updateTitle(p) }
				/>
				{this.newEvent.title.showWarning() && 
					<Text style={Blanket.warning}>{this.newEvent.title.validator.description}</Text>
				}

				<Text style={Blanket.textInputLabel}>Quick info:</Text>
				<TextInput
					style={Blanket.textInput}
					multiline={true}
					placeholder="Short description of your event for the map view. 140 character limit!"
					onChangeText={ (p) => this.updateQuickInfo(p) }
				/>
				{this.newEvent.quickInfo.showWarning() && 
					<Text style={Blanket.warning}>{this.newEvent.quickInfo.validator.description}</Text>
				}

				<DateRangeInput 
					event={this.newEvent}
				/>

				{!this.state.tacSelected ? (
					<View>
						<View style={{ flexDirection: "row", flex: 1, justifyContent: "space-between", maxHeight: 66 }}>
							<Text style={Blanket.textInputLabel}>Location:</Text>
						</View>

						<TouchableOpacity onPress={ this.navigateToAddTac }>
							<Text style={Blanket.textInputPlaceholder}>Set location</Text>
						</TouchableOpacity>
					</View>

				) : (
					<View>
						<View style={{ flexDirection: "row", flex: 1, justifyContent: "space-between", maxHeight: 66 }}>
							<Text style={Blanket.textInputLabel}>Location:</Text>

							<TouchableOpacity onPress={ this.navigateToAddTac }>
								<Text style={{ ...Blanket.textInputLabel, color: "aqua" }}>Change Location</Text>
							</TouchableOpacity>
						</View>

						<Text style={Blanket.textInput}>{this.newEvent.getTacName()}</Text>
						<Text style={Blanket.textInput}>{this.newEvent.getAddress()}</Text>

						<MapView
							style={{ flex: 1, minHeight: 300, marginTop: 10 }}
							provider="google"
							zoomEnabled={false}
							scrollEnabled={false}
							pitchEnabled={false}
							rotateEnabled={false}
							region={{
								latitude: this.state.eventLat,
								longitude: this.state.eventLng,
								latitudeDelta: EventMapData.defaultLatDelta/2,
								longitudeDelta: EventMapData.defaultLngDelta,
							}}
						>
							<Marker coordinate={ {latitude: this.state.eventLat, longitude: this.state.eventLng} } 
							/>
						</MapView>

						<View style={{ flexDirection: "row" }}>

							<TouchableOpacity style={Blanket.buttonModal} 
								onPress={this.createEvent}>
								<Text style={Blanket.buttonModalText}>Create Event</Text>
							</TouchableOpacity>
						</View>

					</View>
				)}

			</ScrollView>
		)
	}
}


export default withNavigation(withNavigationFocus(CreateEventScreen))
