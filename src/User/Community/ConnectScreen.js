import React from "react"
import { 
	Image, 
	FlatList,
	ScrollView,
	Text, 
	TextInput, 
	TouchableOpacity, 
	View, 
} from "react-native"
import { Ionicons } from '@expo/vector-icons';

import { Ctx } from "../../Globals.js"


export default class ConnectScreen extends React.Component {
	constructor(props) {
		super(props)
		this.endpoint = "/shoutbox/messages.get"
		this.state = {
			updates: 0,
			results: [],
			refreshing: false,
			radius: 10,
		}
	}

	componentDidMount() {
		this.getMessages()
	}

	getMessages = async () => {
		data = {
			lat: Ctx.Storage.loc.getLat(),
			lng: Ctx.Storage.loc.getLng(),
			radius: this.state.radius,
		}

		this.setState({
			refreshing: true,
		})

		onResponse = (resp) => {
			this.setState({
				updates: this.state.updates + 1,
				results: resp.data.b.results,
			})
		}

		this.setState({
			refreshing: false,
		})

		Ctx.Ax.blindPost(this.endpoint, data, onResponse)
		return
	}

	_keyExtractor = (msg, index) => msg.uuid

	_listEmptyComponent = () => {
		return (<Text>No local messages yet!</Text>)
	}

	_renderItem = ({item}) => {
		const message = item
		return (
			<ShoutboxMessage
				text="a message"
				key={message.uuid}
			/>
		)
	}

	render() {
		return (
			<View>
				<Text>TODO?: rename lessons to People, move search screens there,
				then add a Local Games tab here</Text>
				<Text>Message 1</Text>
				<Text>Message 2</Text>

				<FlatList
					data={this.state.results}
					extraData={this.state}
					renderItem={this._renderItem}
					keyExtractor={this._keyExtractor}
					ListEmptyComponent={this._listEmptyComponent}
					onRefresh={this.getMessages}
					refreshing={this.state.refreshing}
				/>

			</View>
		)
	}
}

class ShoutboxMessage extends React.Component {

	render() {
		return (
			<View>
				<Text>Got a message</Text>

			</View>
		)
	}
	
}
