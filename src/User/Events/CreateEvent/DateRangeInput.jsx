import React from "react"
import { 
	Text, 
	TouchableOpacity,
	View, 
	ScrollView,
} from "react-native"
import DateTimePicker from "react-native-modal-datetime-picker"

import { Blanket } from "../../../Globals.js"


class DateRangeInput extends React.Component {
	constructor(props) {
		super(props)

		var startDate = new Date()
		var endDate = new Date()

		startDate.setMinutes(0)
		endDate.setMinutes(0)
		const startHour = startDate.getHours()
		if (startHour == 23) {
			startDate.setDate(startDate.getDate() + 1)
			endDate.setDate(endDate.getDate() + 1)
		} else if (startHour == 22 || startHour == 21) {
			endDate.setDate(endDate.getDate() + 1)
		}
		startDate.setHours(startHour + 1)
		endDate.setHours(startHour + 3)

		this.props.event.setStartTime(startDate)
		this.props.event.setEndTime(endDate)

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
		this.props.event.setStartTime(date)
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
		this.props.event.setEndTime(date)
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
					date={this.state.endDate}
					isVisible={this.state.endDatePickerVisible}
					onConfirm={this.handleEndDatePicked}
					onCancel={this.hideEndDatePicker}
					/>
			</View>
		)
	}
}


export default DateRangeInput
