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

import { cleanResults, post } from "../helpers.js"
import PersonResult from "./PersonResult.js"


export default class PeopleFlatList extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			refreshing: false,
		}
	}

	_keyExtractor = (user, index) => user.userUuid

	_renderItem = ({item}) => {
		const user = item
		return (
			<PersonResult 
				userUuid={user.userUuid}
				key={user.userUuid}
				navigation={this.props.navigation}
			/>
		)
	}

	_listEmptyComponent = () => {
		return (<Text>No search results</Text>)
	}

	onRefresh = () => {
		this.setState({
			refreshing: true,
		})

		this.props.onRefresh()

		this.setState({
			refreshing: false,
		})
	}

	render() {
		return (
			<View style={{flex: 1}}>
			<FlatList
				data={this.props.results}
				renderItem={this._renderItem}
				keyExtractor={this._keyExtractor}
				ListEmptyComponent={this._listEmptyComponent}
				onRefresh={this.onRefresh}
				refreshing={this.state.refreshing}
			/>
					</View>
		)
	}
}
