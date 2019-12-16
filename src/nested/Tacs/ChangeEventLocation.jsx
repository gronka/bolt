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
	CrumbNav,
	EventMapData, 
	NewEventObj,
} from "../../Globals.js"


class ChangeEventLocation extends React.Component {
	constructor(props) {
		super(props)

		this.event = this.props.event

		// TODO: update this logic
		this.props.tacSelected = false

		this.state = {
			failed: false,
			updates: 0,
			tacSelected: this.props.tacSelected,

			title: "",
			eventLat: this.event.getLat(),
			eventLng: this.event.getLng(),
		}
	}

	incrementUpdates = () => { this.setState({ updates: this.state.updates + 1 }) }

	componentDidUpdate(prevProps) {
    if (!this.state.tacSelected && this.props.isFocused) {
			if (this.event.getTacName()) {
				this.setState({ 
					tacSelected: true,
				})
			}
    }

		const stateLat = this.state.eventLat.toFixed(8)
		const tacLat = this.event.getLat().toFixed(8)
		if (stateLat !== tacLat) {
			this.setState({ 
				eventLat: this.event.getLat(),
				eventLng: this.event.getLng(),
			})
		}
  }

	navigateToAddTac = () => {
		this.setState({ tacSelected: false })
		console.log("nav to")
		console.log(this.event.state)
		if (this.event.state === "create") {
			CrumbNav.to(this.props.navigation, "TacsStackForCreateEvent", {event: this.event})
		} else if (this.event.state === "edit") {
			CrumbNav.to(this.props.navigation, "TacsStackForEditEvent", {event: this.event})
		}
	}

	render() {
		return(
			<View>
				<View style={{ paddingHorizontal: 10 }}>
					<View style={{ flexDirection: "row", flex: 1, justifyContent: "space-between", maxHeight: 66 }}>
						<Text style={Blanket.textInputLabel}>Location:</Text>

						<TouchableOpacity onPress={ this.navigateToAddTac }>
							<Text style={{ ...Blanket.textInputLabel, color: "aqua" }}>Change Location</Text>
						</TouchableOpacity>
					</View>

					<Text style={Blanket.textInput}>{this.event.getTacName()}</Text>
					<Text style={Blanket.textInput}>{this.event.getAddress()}</Text>
				</View>

				<MapView
					style={{ flex: 1, minHeight: 300, marginTop: 10 }}
					provider="google"
					zoomEnabled={false}
					scrollEnabled={false}
					pitchEnabled={false}
					rotateEnabled={false}
					region={{
						latitude: this.event.getLat(),
						longitude: this.event.getLng(),
						//latitude: this.state.eventLat,
						//longitude: this.state.eventLng,
						latitudeDelta: EventMapData.defaultLatDelta/2,
						longitudeDelta: EventMapData.defaultLngDelta,
					}}
				>
					<Marker coordinate={ {latitude: this.event.getLat(), longitude: this.event.getLng()} } 
					/>
				</MapView>

			</View>
		)
	}
}


export default withNavigation(withNavigationFocus(ChangeEventLocation))
