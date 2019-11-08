import * as React from "react"
import { 
	Button, 
	FlatList,
	Image, 
	ScrollView,
	StyleSheet,
	Text, 
	TouchableOpacity,
	View, 
} from "react-native"
import { Ionicons } from "@expo/vector-icons"

import Blanket from "../../styles/blanket.js"
import { post } from "../../helpers.js"
import Storage from "../../stores/Storage.js"
import ConvoSummaryCache from "../../stores/ConvoSummaryCache.js"


export default class ConvosScreen extends React.Component {
	constructor(props) {
		super(props)
		this.endpoint = "/convo/get.recent"
		this.state = {
			updates: 0,
			results: [],
			refreshing: false,
		}
	}

	componentDidMount() {
		this.getRecentConvos()
	}

	getRecentConvos = async () => {
		data  = {
			apparentUuid: Storage.userUuid,
		}

		this.setState({
			refreshing: true,
		})

		onResponse = (resp) => {
			this.setState({
				updates: this.state.updates +1,
				results: resp.data.b.results,
			})
		}

		this.setState({
			refreshing: false,
		})

		post(this, this.endpoint, data, onResponse)
		return
	}

	_keyExtractor = (convo, index) => convo.convoUuid

	_renderItem = ({item}) => {
		const convo = item
		return (
			<ConvoResult
				userUuid={convo.userUuid}
				convoUuid={convo.convoUuid}
				key={convo.convoUuid}
				navigation={this.props.navigation}
			/>
		)
	}

	_listEmptyComponent = () => {
		return (<Text>No conversations</Text>)
	}

	createConvo

	render() {
		return (
			<View style={styles.recentConvosScreen}>
				<FlatList
					data={this.state.results}
					extraData={this.state}
					renderItem={this._renderItem}
					keyExtractor={this._keyExtractor}
					ListEmptyComponent={this._listEmptyComponent}
					onRefresh={this.getRecentConvos}
					refreshing={this.state.refreshing}
				/>

					<TouchableOpacity style={styles.newConvo} 
						onPress={() => {this.props.navigation.navigate("ConvoEditParticipantsScreen")}}>
					<Ionicons name="md-add-circle" size={60} style={styles.createIcon}></Ionicons>
				</TouchableOpacity>

			</View>
		)
	}
}


class ConvoResult extends React.Component {
	navToConvo = () => { this.props.navigation.navigate("ViewConvoScreen", {convoUuid: this.props.convoUuid})
	}

	render() {
		return (
			<View style={ styles.convoResult }>
				<TouchableOpacity onPress={this.navToConvo}>
					<Text>{this.props.convoUuid}</Text>
				</TouchableOpacity>
			</View>
		)
	}
}


const styles = StyleSheet.create({
	recentConvosScreen: {
		flex: 1,
	},

	createIcon: {
		color: "green",
	},

	convoResult: {
		flex: 1,
		flexDirection: "row",
		paddingTop: 10,
		paddingLeft: 10,
		paddingBottom: 10,
		maxHeight: 60,
		borderBottomWidth: 1,
		borderBottomColor: "gray",
	},

	newConvo: {
		position: "absolute",
		bottom: 20,
		right: 20,
	},

	name: {
		height: 40,
	},

	profileImageView: {
		width: 40,
	},

	profileImage: {
		height: 40,
		width: 40,
		borderRadius: 50,
	},
})
