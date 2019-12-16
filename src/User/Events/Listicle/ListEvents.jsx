import React from "react"
import { 
	FlatList,
	Text, 
	TouchableOpacity,
	View, 
} from "react-native"
import { withNavigation, withNavigationFocus } from "react-navigation"

import { 
	AttendingEventList,
	Blanket, 
	CrumbNav,
	Ctx, 
} from "../../../Globals.js"


class ListEvents extends React.Component {
	constructor(props) {
		super(props)
		this.ofUser = this.props.userUuid
		this.endpoint = "event/get.userAdminsEvents"

		this.state = {
			updates: 0,
			refreshing: false,
		}
	}
	incrementUpdates = () => { this.setState({ updates: this.state.updates + 1 }) }

	componentDidUpdate(prevProps) {
    if (this.props.isFocused) {
			if (AttendingEventList.shouldUpdate()) {
				this.getEvents()
			}
    }
	}

	getEvents = async () => {
		data  = {
			// TODO: other data types
			ofUser: this.ofUser,
		}

		onSuccess = (resp) => {
			AttendingEventList.setList(resp.data.b.list)
			this.incrementUpdates()
		}

		Ctx.Ax.blindPost(this.endpoint, data, onSuccess)

	}

	selectEvent(event) {
		CrumbNav.to(this.props.navigation, "ViewEventScreen", {eventUuid: event.eventUuid})
	}

	/*
	 * FlatList functions
	 */
	_keyExtractor = (event, index) => event.eventUuid

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

	_onRefresh = () => {
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
					data={AttendingEventList.getList()}
					renderItem={this._renderItem}
					keyExtractor={this._keyExtractor}
					ListEmptyComponent={this._listEmptyComponent}
					onRefresh={this._onRefresh}
					refreshing={this.state.refreshing}
				/>

			</View>
		)
	}
}


export default withNavigation(withNavigationFocus(ListEvents))
