import React from "react"
import { 
	FlatList,
	Text, 
	TouchableOpacity,
	View, 
} from "react-native"
import { createStackNavigator } from "react-navigation-stack"
import { withNavigation, withNavigationFocus } from "react-navigation"

import MapsacAutocompleteInput from "./MapsacAutocompleteInput.jsx"
import SetTacLocationScreen from "./SetTacLocationScreen.jsx"

import { 
	Blanket,
	Ctx,
	GetTacsController,
	NewEventObj,
	NewTacObj, 
} from "../../../Globals.js"


class SelectTacScreen extends React.Component {
	constructor(props) {
		super(props)
		this.endpoint = "tac/get.byUserUuid"

		this.state = {
			updates: 0,
			results: [],
			refreshing: false,
		}
	}
	incrementUpdates = () => { this.setState({ updates: this.state.updates + 1 }) }

	componentDidMount() {
		this.getTacs()
	}  

	componentDidUpdate(prevProps) {
    if (this.props.isFocused && prevProps.isFocused !== this.props.isFocused) {
			this.getTacs()
    }
  }

	selectTac(tac) {
		NewEventObj.setFromTac(tac)
		this.props.navigation.navigate("CreateEventScreen")
	}


	getTacs = async () => {
		data  = {
			requesteeUuid: Ctx.Storage.userUuid,
		}

		onResponse = (resp) => {
			this.incrementUpdates()
			this.setState({
				results: resp.data.b.results,
			})
		}

		Ctx.Ax.blindPost(this.endpoint, data, onResponse)
		return

	}

	/*
	 * FlatList functions
	 */
	_keyExtractor = (tac, index) => tac.tacUuid

	_renderItem = ({item}) => {
		const tac = item
		selectRow = () => { this.selectTac(tac) }

		return (
			<View style={ Blanket.flatRow }>
				<TouchableOpacity style={{ flex: 1 }} onPress={ selectRow }>
					<Text style={{ fontSize: 16 }}>{tac.name}</Text>
					<Text style={{ fontSize: 16 }}>{tac.address}</Text>
				</TouchableOpacity>
			</View>
		)
	}

	_listEmptyComponent = () => {
		return (
			<View style={ Blanket.flatRow }>
				<Text style={{ fontSize: 16 }}>Nothing here - add a tac!</Text>
			</View>
		)
	}

	_onRefresh() {
		this.setState({
			refreshing: true,
		})

		this.getTacs()

		this.setState({
			refreshing: false,
		})
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
					onRefresh={() => this._onRefresh}
					refreshing={this.state.refreshing}
				/>

			</View>
		)
	}
}


export default withNavigation(withNavigationFocus(SelectTacScreen))
