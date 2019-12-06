import React from "react"
import { 
	Image, 
	FlatList,
	ScrollView,
	StyleSheet,
	Text, 
	TextInput, 
	TouchableOpacity, 
	View, 
} from "react-native"
import { Ionicons } from '@expo/vector-icons';

import { cleanResults } from "../../lib/helpers.js"
import { post } from "../../lib/network.js"
import PersonResult from "../../components/PersonResult.js"
import PeopleFlatList from "../../components/PeopleFlatList.js"
import Blanket from "../../styles/blanket.js"


export default class PeopleSearchNameScreen extends React.Component {
	// TODO: Remember last search?
	constructor(props) {
		super(props)
		this.endpoint = "/users/search.name"
		this.state = {
			updates: 0,
			results: [],
			refreshing: false,
			searchName: "",
		}
	}

	search = async () => {
		// TODO: sanitize?

		data = {
			name: this.state.searchName,
		}

		onResponse =  (resp) => {
			let results = []
			if (resp.data.b.results != null) {
				results = cleanResults(resp.data.b.results, "userUuid")
			} else {
				results = []
			}
			this.setState({
				updates: this.state.updates + 1,
				results: results,
			})
		}

		post(this, this.endpoint, data, onResponse)
		// TODO: sort results by multiple matched results
		// TODO: sort results by nearest
		// TODO: highlight matching results that match search text
		return
	}

	clear = () => {
		this.setState({
			updates: this.state.updates + 1,
			results: [],
			searchName: "",
		})
	}

	printState = () => {
		alert(JSON.stringify(this.state))
	}

	onFlatListRefresh = () => {
		this.search()
	}

	render() {
		const renderClear = ((this.state.searchName != "") ? true : false)

		return (
			<View style={{flex: 1}}>
				<View style={styles.searchLine}>
					<TextInput
						style={styles.searchTextInput}
						placeholder="Search by name"
						value={this.state.searchName}
						onChangeText={ (searchName) => this.setState({searchName}) }
					/>

					{renderClear &&
						<TouchableOpacity onPress={this.clear}>
							<Ionicons name="md-close-circle-outline" size={40} style={styles.searchButton} />
						</TouchableOpacity>
					}

					<TouchableOpacity onPress={this.search}>
						<Ionicons name="md-search" size={40} style={styles.searchButton} />
					</TouchableOpacity>

				</View>

				<PeopleFlatList
					results={this.state.results}
					onRefresh={this.onFlatListRefresh}
					navigation={this.props.navigation}
				/>

			</View>
		)
	}
}


const styles = StyleSheet.create({
	searchLine: {
		flexDirection: "row",
		justifyContent: "flex-end",
		margin: 10,
	},

	searchTextInput: {
		flex: 1,
		height: 40,
		fontSize: 18,
	},

	searchButton: {
		color: "green",
		marginRight: 16,
	},
})
