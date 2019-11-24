import React from "react"
import {
	FlatList,
	ScrollView,
	Text,
	TouchableOpacity,
	View,
} from "react-native"
import { Ionicons } from "@expo/vector-icons"

import CalendarCache from "../../stores/CalendarCache.js"


// TODO: timezone dropdown
export default class Calendar extends React.Component {
	constructor(props) {
		super(props)

		this.monthNames = [
			"January", 
			"February",
			"March",
			"April",
			"May",
			"June",
			"July",
			"August",
			"September",
			"October",
			"November",
			"December",
			]
	}

	// TODO: change month and year here

	render() {
		return (
			<View>
				<View style={{ flexDirection: "row", justifyContent: "space-between" }}>
					<TouchableOpacity style={{ paddingTop: 10, paddingRight: 10, paddingBottom: 10, paddingLeft: 20 }}>
						<Ionicons name="md-arrow-dropleft" size={24} />
					</TouchableOpacity>

					<TouchableOpacity style={{ paddingTop: 10, paddingRight: 10, paddingBottom: 10, paddingLeft: 20 }}>
						<Text style={{ fontSize: 18 }}>
							{this.monthNames[this.props.month]} {this.props.year}
						</Text>
					</TouchableOpacity>

					<TouchableOpacity style={{ paddingTop: 10, paddingRight: 20, paddingBottom: 10, paddingLeft: 10 }}>
						<Ionicons name="md-arrow-dropright" size={24} />
					</TouchableOpacity>
				</View>

				<DayGrid date={new Date()}
					day={this.props.day}
					month={this.props.month}
					year={this.props.year}
				/>
			</View>
		)
	}
}


class DayGrid extends React.Component {
	constructor(props) {
		super(props)

		var date = new Date(this.props.year, this.props.month, this.props.day)
		this.month = date.getMonth()
		this.year = date.getYear()
		this.day = date.getDate()

		this.prevMonthLastDayDate = new Date(date.setDate(-1))
		this.prevMonth = this.prevMonthLastDayDate.getMonth()
		this.prevYear = this.prevMonthLastDayDate.getYear()
		this.nextMonthEarlyDayDate = new Date(date.setDate(32))
		this.nextMonth = this.nextMonthEarlyDayDate.getMonth()
		this.nextYear = this.nextMonthEarlyDayDate.getYear()

		this.lastDayThisMonthDate = new Date(this.nextMonthEarlyDayDate.setDate(-1))
		this.daysThisMonth = this.lastDayThisMonthDate.getDate()

	}

	_keyExtractor = (item, index) => { return index.toString() }

	_renderItem = ({item, index}) => {
		if (item.type === "title") {
			return (
				<Text style={{ fontSize: 14, textAlign: "center", flex: 1, color: "#555" }}>{item.value}</Text>
			)
		} else {
			return (
				<DayItem date={item} />
			)
		}
	}

	dmySets = () => {
		const dayAbbrevs = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
		var sets = []
		for (i = 0; i < dayAbbrevs.length; i++) {
			sets.push({type: "title", value: dayAbbrevs[i]})
		}

		var days = this.prevMonthLastDayDate.getDate()
		const offset = this.prevMonthLastDayDate.getDay() + 1
		if (offset !== 7) {
			for (var i = days - offset; i <= days; i++) {
				sets.push({type: "date", year: this.prevYear, month: this.prevMonth, day: i, color: "#AAA"})
			}
		}

		for (var i = 1; i <= this.daysThisMonth; i++) {
			sets.push({type: "date", year: this.year, month: this.month, day: i, color: "#000"})
		}

		const daysLeft = 35 - sets.length
		for (var i = 1; i <= daysLeft; i++) {
			sets.push({type: "date", year: this.nextYear, month: this.nextMonth, day: i, id: (sets.length + 1), color: "#AAA"})
		}

		return sets
	}

	render() {
		const sets = this.dmySets()
		return (
			<View style={{ paddingLeft: 4, paddingRight: 4 }}>
				<FlatList
					data={sets}
					keyExtractor={this._keyExtractor}
					renderItem={this._renderItem}
					numColumns={7}
					columnWrapperStyle={{ justifyContent: "space-around", paddingBottom: 12}}
				/>
			</View>
		)
	}
}


class DayItem extends React.Component {
	render() {
		return(
			<Text style={{ 
				fontSize: 16, 
				textAlign: "center", 
				flex: 1, 
				paddingBottom: 10, 
				color: this.props.date.color,
				}}>{this.props.date.day}</Text>
		)
	}
}
