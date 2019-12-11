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

import { Ctx } from "../../../Globals.js"
import LoadingModal from "../../../components/LoadingModal.js"
import ListEvents from "./ListEvents.jsx"


class ListAttendingScreen extends React.Component {
	render() {
		return (
			<ListEvents
				userUuid={Ctx.Storage.userUuid}
			/>
		)
	}
}


export default withNavigation(withNavigationFocus(ListAttendingScreen))
