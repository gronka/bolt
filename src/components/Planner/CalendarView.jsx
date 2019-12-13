import React from "react"
import {
	ScrollView,
	TouchableOpacity,
} from "react-native"
import { Ionicons } from "@expo/vector-icons"

import { Ctx } from "../../Globals.js"
import Agenda from "./Agenda.jsx"
import Calendar	 from "./Calendar.jsx"


export default class CalendarView extends React.Component {
	constructor(props) {
		super(props)

		defaultDate = new Date()
		day = defaultDate.getDate()
		month = defaultDate.getMonth()
		year = defaultDate.getFullYear()
		
		this.state = {
			day: day,
			month: month,
			year: year,
		}
	}

	render() {
		return (
			<ScrollView>
				<Calendar 
					userUuid={Ctx.Storage.userUuid}
					day={this.state.day}
					month={this.state.month}
					year={this.state.year}
				/>
				<Agenda 
					userUuid={this.props.userUuid}
					day={this.state.day}
					month={this.state.month}
					year={this.state.year}
				/>
			</ScrollView>
		)
	}
}
