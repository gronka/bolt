import React from "react"
import { 
	Image,
	Text, 
	TextInput, 
	TouchableOpacity,
	View, 
	ScrollView,
} from "react-native"
import { Ionicons } from '@expo/vector-icons';
import MapView, { Marker } from "react-native-maps"
import { withNavigation, withNavigationFocus } from "react-navigation"

import { 
	Blanket, 
	CrumbNav,
	EventMapData,
	EventCache,
	ViewEventObj,
} from "../../../Globals.js"
import LoadingModal from "../../../components/LoadingModal.jsx"


class ViewEventScreen extends React.Component {
	constructor(props) {
		super(props)

		this.eventUuid = CrumbNav.getParam("eventUuid")
		this.event = EventCache.getEmptyItem()
		this.loadEvent()

		this.state = {
			loading: false,
			showEdit: false,
			updates: 0,
		}
	}
	incrementUpdates = () => { this.setState({ updates: this.state.updates + 1 }) }

	loadEvent = async () => {
		this.event = await EventCache.getItem(this.eventUuid)
		showEdit = this.event.canUserOrganize()
		this.setState({ showEdit: this.event.canUserEdit() })
		this.incrementUpdates()
	}

	navToEditEvent = () => {
		console.log("navigating")
		CrumbNav.to(this.props.navigation, "EditEventScreen", {eventUuid: this.event.eventUuid})
		//this.props.navigation.navigate("EditEventScreen", {event: this.event})
	}

	render() {
		const showYouAreAdmin = this.event.canUserAdmin()
		const showYouAreOrganizer = this.event.canUserOrganize()
		// TODO: number attending
		return(
			<ScrollView>
				<View style={{ flex: 1, alignItems: "center", margin: 20 }}>
					{showYouAreAdmin &&
						<Text style={{ fontSize: 14 }}> You are an event admin. </Text>
					}
					{showYouAreOrganizer &&
						<Text style={{ fontSize: 14 }}> You are an event organizer. </Text>
					}

					{this.state.showEdit &&
						<View>
							<TouchableOpacity style={{ flexDirection: "row", margin: 8 }}
								onPress={this.navToEditEvent}>
									<Ionicons name="md-create" size={16}
									/>
								<Text style={{ fontSize: 16, paddingLeft: 4 }}> Edit this event </Text>
							</TouchableOpacity>

							<TouchableOpacity style={{ flexDirection: "row", margin: 8 }}
								onPress={this.navToEditEvent}>
									<Ionicons name="md-ice-cream" size={14}
									/>
								<Text style={{ fontSize: 14, paddingLeft: 4 }}> Generate Invitation key </Text>
							</TouchableOpacity>
						</View>
					}
					
					{this.event.picUrl ? (
						<Image 
							style={Blanket.profileImage}
							source={{uri: this.event.picUrl}}
						/>

					) : (
						<Image 
							style={Blanket.profileImage}
							source={require("../../../../assets/blankProfile.png")}
						/>
					)
					}

					<Text style={{ fontSize: 22, margin: 10 }}>
						{this.event.getTitle()}
					</Text>
					<Text style={{ fontSize: 14, margin: 2 }}>Going counter</Text>



				</View>

				<View style={{ marginHorizontal: 10 }}>

					<View style={{ flexDirection: "row" }}>
						<Text style={{ fontSize: 14, margin: 2 }}>Public/Secret</Text>
						<Text style={{ fontSize: 14, margin: 2 }}>Hosted by ...</Text>
					</View>

					<Text style={{ fontSize: 14, margin: 2 }}>Date</Text>

					<View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
						<Text style={{ fontSize: 18, margin: 10 }}>Going</Text>
						<Text style={{ fontSize: 18, margin: 10 }}>Interested</Text>
						<Text style={{ fontSize: 18, margin: 10 }}>Share</Text>
						<Text style={{ fontSize: 18, margin: 10 }}>More</Text>
					</View>

					<Text style={{ textAlign: "left" }}> test </Text>
					<Text style={{ textAlign: "left" }}> {this.event.getQuickInfo()} </Text>
					<Text style={{ textAlign: "left" }}> {this.event.getLongInfo()} </Text>

				</View>

				<MapView
					style={{ flex: 1, minHeight: 300, marginTop: 10, width: "90%" }}
					provider="google"
					zoomEnabled={true}
					scrollEnabled={true}
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
			</ScrollView>
		)
	}
}


export default withNavigation(withNavigationFocus(ViewEventScreen))
