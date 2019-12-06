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

import Blanket from "../../styles/blanket.js"
import { EventMapData } from "../../stores/MapData.js"
import { ViewEventObj } from "../../stores/Globals.js"
import LoadingModal from "../LoadingModal.js"
import { CreateEventController } from "../../stores/Globals.js"


class ViewEventScreen extends React.Component {
	constructor(props) {
		super(props)

		this.event = this.props.navigate.getParam("event")
		this.showEdit = event.canUserOrganize()

		this.state = {
			loading: false,
			updates: 0,
		}
	}

	incrementUpdates = () => { this.setState({ updates: this.state.updates + 1 }) }

	navToEditEvent = () => {
		this.props.navigation.navigate("EditEventScreen", {event: this.event})
	}

	render() {
		// TODO: number attending
		return(
			<ScrollView>
				<LoadingModal visible={this.state.loading} />
				<Text style={Blanket.textInputLabel}>Event name:</Text>
				<Text style={Blanket.textForLabel}>{this.event.getTitle()}</Text>

				{this.showEdit &&
					<TouchableOpacity onPress={ this.navToEditEvent() }>
						<Text style={{ ...Blanket.textInputLabel, color: "aqua" }}>Edit</Text>
					</TouchableOpacity>
				}

				<Text style={Blanket.textInputLabel}>Tac name:</Text>
				<Text style={Blanket.textForLabel}>{this.event.getTacName()}</Text>

				<Text style={Blanket.textInputLabel}>Tac address:</Text>
				<Text style={Blanket.textForLabel}>{this.event.getAddress()}</Text>

				<Text style={Blanket.textInputLabel}>Quick info:</Text>
				<Text style={Blanket.textForLabel}>{this.event.getGuickInfo()}</Text>

				<Text style={Blanket.textInputLabel}>Start time:</Text>
				<Text style={Blanket.textForLabel}>{this.event.startTime.asUtc()}</Text>

				<Text style={Blanket.textInputLabel}>End tiem:</Text>
				<Text style={Blanket.textForLabel}>{this.event.endTime.asUtc()}</Text>

				<Text style={Blanket.textInputLabel}>Location:</Text>
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
						latitudeDelta: EventMapData.defaultLatDelta/2,
						longitudeDelta: EventMapData.defaultLngDelta,
					}}
				>
					<Marker coordinate={ {latitude: this.event.getLat(), longitude: this.event.getLng()} } 
					/>
				</MapView>

			</ScrollView>
		)
	}
}


export default withNavigation(withNavigationFocus(ViewEventScreen))
