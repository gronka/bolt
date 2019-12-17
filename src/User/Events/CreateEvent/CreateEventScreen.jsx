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
	CrumbNav,
	EventMapData, 
	NewEventObj,
} from "../../../Globals.js"
import DateRangeInput from "./DateRangeInput.jsx"
import LoadingModal from "../../../components/LoadingModal.jsx"
import ChangeEventLocation from "../../../nested/Tacs/ChangeEventLocation.jsx"


class CreateEventScreen extends React.Component {
	constructor(props) {
		super(props)

		// Note: to avoid data duplication, we simply increment state.updates in
		// order to refresh the view
		this.newEvent = NewEventObj
		this.newEvent.state = "create"

		this.scrollRef = React.createRef()
		this.titleRef = React.createRef()
		this.quickInfoRef = React.createRef()

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

	resetForm = () => {
		console.log("resetting form")
		this.newEvent.reinit()
		this.scrollRef.scrollTo({x: 0, y: 0, animated: true})
		this.titleRef.setNativeProps({ text: "" })
		this.quickInfoRef.setNativeProps({ text: "" })
		this.setState({ tacSelected: false })
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

	navigateToSelectTac = () => {
		this.setState({ tacSelected: false })
		//this.props.navigation.navigate("CreateEventTacsStack") 
		CrumbNav.to(this.props.navigation, "TacsStackForCreateEvent", {event: this.newEvent})
	}

	createEvent = async () => {
		if (this.newEvent.isValidForCreate()) {
			const uuid = this.newEvent.getReqUuid()
			const data = this.newEvent.asCreateEventJson()

			try {
				const req = await CreateEventController.requestWithLoading(uuid, data, this)
				const eventUuid = req.response.data.b.event.eventUuid
				this.resetForm()
				CrumbNav.to(this.props.navigation, "EditEventScreen", {eventUuid: eventUuid})
			} catch(err) {
				// don't navigate/do anything
			}
		}
	}

	render() {
		return(
			<ScrollView
					ref={ (ref) => this.scrollRef = ref }
			>
				<View style={{ paddingHorizontal: 10 }}>
					<LoadingModal visible={this.state.loading} />
					<Text style={Blanket.textInputLabel}>Event name:</Text>
					<TextInput
						style={Blanket.textInput}
						placeholder="Event name"
						onChangeText={ (p) => this.updateTitle(p) }
						ref={ (ref) => this.titleRef = ref }
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
						ref={ (ref) => this.quickInfoRef = ref }
					/>
					{this.newEvent.quickInfo.showWarning() && 
						<Text style={Blanket.warning}>{this.newEvent.quickInfo.validator.description}</Text>
					}

					<DateRangeInput 
						event={this.newEvent}
					/>

				</View>

				{!this.state.tacSelected ? (
					<View style={{ paddingHorizontal: 10 }}>
						<View style={{ flexDirection: "row", flex: 1, justifyContent: "space-between", maxHeight: 66 }}>
							<Text style={Blanket.textInputLabel}>Location:</Text>
						</View>

						<TouchableOpacity onPress={ this.navigateToSelectTac }>
							<Text style={Blanket.textInputPlaceholder}>Set location</Text>
						</TouchableOpacity>
					</View>

				) : (
					<View>
						<ChangeEventLocation 
							event={this.newEvent}
							updates={this.state.updates}
						/>

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
