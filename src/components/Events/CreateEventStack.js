import React from "react"
import { 
	StyleSheet,
	Text, 
	TextInput, 
	TouchableOpacity,
	View, 
	ScrollView,
} from "react-native"
import DateTimePicker from "react-native-modal-datetime-picker"
import { Ionicons } from '@expo/vector-icons'
import { createStackNavigator } from "react-navigation-stack"

import ManageVenuesStack from "./ManageVenuesStack.js"

import Storage from "../../stores/Storage.js"

import Blanket from "../../styles/blanket.js"
import { 
	AddressValue,
	TitleValue,
	VenueValue,
	LatValue,
	LngValue,
} from "../../lib/DataValues.js"


class CreateEventScreen extends React.Component {
	constructor(props) {
		super(props)

		// Note: to avoid data duplication, we simply increment state.updates in
		// order to refresh the view
		this.title = new TitleValue("")
		this.venue = new VenueValue("")
		this.address = new AddressValue("")

		this.state = {
			loading: false,
			failed: false,
			updates: 0,
		}
	}

	incrementUpdates = () => { this.setState({ updates: this.state.updates + 1 }) }

	updateTitle = (p) => {
		this.title.setAndValidate(p)
		this.incrementUpdates()
	}

	updateVenue = (p) => {
		this.venue.setAndValidate(p)
		this.incrementUpdates()
	}

	render() {
		return(
			<ScrollView>
				<Text style={Blanket.textInputLabel}>Title:</Text>
				<TextInput
					style={Blanket.textInput}
					placeholder="Title"
					onChangeText={ (p) => this.updateTitle(p) }
				/>
				{this.title.showWarning() && 
					<Text style={Blanket.warning}>{this.title.validator.description}</Text>
				}

				<DateRangeInput />

				<Text style={Blanket.textInputLabel}>Venue:</Text>

				<TouchableOpacity onPress={ () => this.props.navigation.navigate("ManageVenuesStack") }>
					<Text style={Blanket.textInputPlaceholder}>Venue</Text>
				</TouchableOpacity>

				<Text>replace this with something that simply shows map and address</Text>
				<Text>change style after venue selected</Text>
				<Text>set timezone of event to timezone of venue</Text>

			</ScrollView>
		)
	}
}



class DateRangeInput extends React.Component {
	constructor(props) {
		super(props)

		var startDate = new Date()
		var endDate = new Date()
		startDate.setMinutes(0)
		endDate.setMinutes(0)
		startDate.setHours(startDate.getHours() + 1)
		endDate.setHours(endDate.getHours() + 3)

		// tzOffset references the tzOffset at the event location
		//this.tzOffsetMm = props.tzOffset

		this.state = {
			startDate: startDate,
			endDate: endDate,
			startDatePickerVisible: false,
			endDatePickerVisible: false,
		}
	}

	showStartDatePicker = () => {
		this.setState({ startDatePickerVisible: true })
	}
	hideStartDatePicker = () => {
		this.setState({ startDatePickerVisible: false })
	}
	handleStartDatePicked = date => {
		this.setState({ startDate: date})
		this.hideStartDatePicker()
	}

	showEndDatePicker = () => {
		this.setState({ endDatePickerVisible: true })
	}
	hideEndDatePicker = () => {
		this.setState({ endDatePickerVisible: false })
	}
	handleEndDatePicked = date => {
		this.setState({ endDate: date})
		this.hideEndDatePicker()
	}

	render() {
		return(
			<View>
				<Text style={Blanket.textInputLabel}>Starts:</Text>
				<TouchableOpacity onPress={this.showStartDatePicker}>
					<Text style={Blanket.datePickerText}>{this.state.startDate.toDateString()} at {this.state.startDate.toTimeString()}</Text>
				</TouchableOpacity>

				<Text style={Blanket.textInputLabel}>Ends:</Text>
				<TouchableOpacity onPress={this.showEndDatePicker}>
					<Text style={Blanket.datePickerText}>{this.state.endDate.toDateString()} at {this.state.endDate.toTimeString()}</Text>
				</TouchableOpacity>

				<DateTimePicker 
					mode={"datetime"}
					date={this.state.startDate}
					isVisible={this.state.startDatePickerVisible}
					onConfirm={this.handleStartDatePicked}
					onCancel={this.hideStartDatePicker}
					/>

				<DateTimePicker 
					mode={"datetime"}
					isVisible={this.state.endDatePickerVisible}
					onConfirm={this.handleEndDatePicked}
					onCancel={this.hideEndDatePicker}
					/>
			</View>
		)
	}
}


const CreateEventStack = createStackNavigator(
	{
		CreateEventScreen: {
			screen: CreateEventScreen,
			navigationOptions: { header: null },
		},
		ManageVenuesStack: {
			screen: ManageVenuesStack,
			navigationOptions: { header: null },
		},
	}
)


export default CreateEventStack
