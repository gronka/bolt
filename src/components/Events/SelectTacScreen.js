import React from "react"
import { 
	FlatList,
	Text, 
	TextInput, 
	TouchableOpacity,
	View, 
} from "react-native"
import { createStackNavigator } from "react-navigation-stack"
import { withNavigation, withNavigationFocus } from "react-navigation"

import Blanket from "../../styles/blanket.js"
import Storage from "../../stores/Storage.js"
import { post } from "../../helpers.js"
import MapsacAutocompleteInput from "./MapsacAutocompleteInput.js"
import SetTacLocationScreen from "./SetTacLocationScreen.js"

import { NewTacObj, GetTacsController } from "../../lib/Globals.js"


class SelectTacScreen extends React.Component {
	constructor(props) {
		super(props)
		this.endpoint = "tac/get.byUserUuid"

		this.state = {
			results: [],
			refreshing: false,
		}
	}
	incrementUpdates = () => { this.setState({ updates: this.state.updates + 1 }) }

	componentDidMount() {
		this.getTacs()
	}  

	componentDidUpdate(prevProps) {
    if (prevProps.isFocused !== this.props.isFocused) {
			this.getTacs()
    }
  }

	selectTac(tac) {
		// TODO: this
		this.props.navigation.navigate("CreateEventStack")
	}

	onRefresh() {
		this.setState({
			refreshing: true,
		})

		this.getTacs()

		this.setState({
			refreshing: false,
		})
	}

	getTacs = async () => {
		data  = {
			requesteeUuid: Storage.userUuid,
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

	/*
	 * FlatList functions
	 */
	_keyExtractor = (tac, index) => tac.tacUuid

	_renderItem = ({item}) => {
		const tac = item
		selectThisTac = () => { this.selectTac(tac) }

		return (
			<View style={ Blanket.flatRow }>
				<TouchableOpacity style={{ flex: 1 }} onPress={ selectThisTac }>
					<Text style={{ fontSize: 16 }}>{tac.name}</Text>
					<Text style={{ fontSize: 16 }}>{tac.address}</Text>
				</TouchableOpacity>
			</View>
		)
	}

	_listEmptyComponent = () => {
		return (
			<View style={ Blanket.flatRow }>
				<Text style={{ fontSize: 16 }}>Nothing here - try adding a tac!</Text>
			</View>
		)
	}

	render() {
		return(
			<View style={{ flex: 1 }}>
				<View style={{ flexDirection: "row", flex: 1, justifyContent: "space-between", maxHeight: 66 }}>

					<Text style={Blanket.textInputLabel}>Pick your tac:</Text>

					<TouchableOpacity onPress={ () => this.props.navigation.navigate("AddTac") }>
						<Text style={{ ...Blanket.textInputLabel, color: "green" }}>+ Add a tac</Text>
					</TouchableOpacity>
				</View>

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


export default withNavigation(withNavigationFocus(SelectTacScreen))
