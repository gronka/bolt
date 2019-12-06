import React from "react"
import { 
	FlatList,
	Text, 
	TouchableOpacity,
	View, 
} from "react-native"

import Blanket from "../../styles/blanket.js"
import { post } from "../../lib/network.js"


export default class ListEvents extends React.Component {
	constructor(props) {
		super(props)
		this.ofUser = this.props.userUuid
		this.endpoint = "event/get.byUserUuid"

		this.state = {
			updates: 0,
			results: [],
			refreshing: false,
		}
	}
	incrementUpdates = () => { this.setState({ updates: this.state.updates + 1 }) }

	componentWillMount() {
		this.getEvents()
	}

	getEvents = async () => {
		data  = {
			// TODO: other data types
			ofUser: this.ofUser,
		}

		onResponse = (resp) => {
			this.incrementUpdates()
			this.setState({
				results: resp.data.b.results,
			})
		}

		post(this, this.endpoint, data, onResponse)
		return

	}

	selectEvent(event) {
		this.props.navigation.navigate("ViewEventScreen", {event: event})
	}

	/*
	 * FlatList functions
	 */
	_keyExtractor = (tac, index) => tac.tacUuid

	_renderItem = ({item}) => {
		const event = item
		selectRow = () => { this.selectEvent(event) }

		return (
			<View style={ Blanket.flatRow }>
				<TouchableOpacity style={{ flex: 1 }} onPress={ selectRow }>
					<Text style={{ fontSize: 16 }}>{event.title}</Text>
					<Text style={{ fontSize: 16 }}>{event.tacName}</Text>
					<Text style={{ fontSize: 16 }}>{event.address}</Text>
					<Text style={{ fontSize: 16 }}>{event.startTime}</Text>
					<Text style={{ fontSize: 16 }}>{event.endTime}</Text>
				</TouchableOpacity>
			</View>
		)
	}

	_listEmptyComponent = () => {
		return (
			<View style={ Blanket.flatRow }>
				<Text style={{ fontSize: 16 }}>No upcoming events</Text>
			</View>
		)
	}

	_onRefresh() {
		this.setState({
			refreshing: true,
		})

		this.getEvents()

		this.setState({
			refreshing: false,
		})
	}

	render() {
		return(
			<View style={{ flex: 1 }}>
				<FlatList
					data={this.state.results}
					renderItem={this._renderItem}
					keyExtractor={this._keyExtractor}
					ListEmptyComponent={this._listEmptyComponent}
					onRefresh={() => this.onRefresh}
					refreshing={this.state.refreshing}
				/>

			</View>
		)
	}
}
