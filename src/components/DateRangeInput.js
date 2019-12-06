import React from "react"
import { 
	Text, 
	TouchableOpacity,
	View, 
	ScrollView,
} from "react-native"
import DateTimePicker from "react-native-modal-datetime-picker"

import Blanket from "../styles/blanket.js"


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


export default DateRangeInput
