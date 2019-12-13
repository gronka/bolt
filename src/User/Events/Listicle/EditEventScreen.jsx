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
	EditEventController,
	EditEventObj,
	EventMapData, 
} from "../../../Globals.js"
import LoadingModal from "../../../components/LoadingModal.jsx"


class EditEventScreen extends React.Component {
	constructor(props) {
		super(props)

		// Note: to avoid data duplication, we simply increment state.updates in
		// order to refresh the view
		this.editEvent = EditEventObj

		this.state = {
			loading: false,
			failed: false,
			updates: 0,

			title: "",
			eventLat: 0,
			eventLng: 0,
		}
	}

	incrementUpdates = () => { this.setState({ updates: this.state.updates + 1 }) }

	render() {
		return(
			<ScrollView>
				<LoadingModal visible={this.state.loading} />
				<Text style={Blanket.textInputLabel}>Event name:</Text>

			</ScrollView>
		)
	}
}

				//<MapView
					//style={{ flex: 1, minHeight: 300, marginTop: 10 }}
					//provider="google"
					//zoomEnabled={false}
					//scrollEnabled={false}
					//pitchEnabled={false}
					//rotateEnabled={false}
					//region={{
						//latitude: this.state.eventLat,
						//longitude: this.state.eventLng,
						//latitudeDelta: EventMapData.defaultLatDelta/2,
						//longitudeDelta: EventMapData.defaultLngDelta,
					//}}
				//>
					//<Marker coordinate={ {latitude: this.state.eventLat, longitude: this.state.eventLng} } 
					///>
				//</MapView>

export default withNavigation(withNavigationFocus(EditEventScreen))
