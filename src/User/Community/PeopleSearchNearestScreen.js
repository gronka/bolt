import React from "react"
import { 
	Button,
	Image, 
	FlatList,
	ScrollView,
	StyleSheet,
	Text, 
	TouchableOpacity, 
	View, 
} from "react-native"
import { Ionicons } from '@expo/vector-icons';

import { cleanResults } from "../../lib/helpers.js"
import { post } from "../../lib/network.js"
import PersonResult from "../../components/PersonResult.js"
import PeopleFlatList from "../../components/PeopleFlatList.js"
import Storage from "../../stores/Storage.js"


export default class PeopleSearchNearestScreen extends React.Component {
	constructor(props) {
		super(props)
		this.endpoint = "/users/search.nearest"
		this.initialRadius = 10
		this.state = {
			updates: 0,
			results: [],
			radius: this.initialRadius,
		}
	}

	componentDidMount() {
		this.search(this.initialRadius)
	}

	search = async (radius) => {
		// TODO: sanitize?
		this.clear()
		this.setState({
			radius: radius,
		})

		data = {
			lat: Storage.loc.getLat(),
			lng: Storage.loc.getLng(),
			radius: radius,
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
		return
	}

	clear = () => {
		this.setState({
			updates: this.state.updates + 1,
			results: [],
		})
	}

	printState = () => {
		alert(JSON.stringify(this.state))
	}

	onFlatListRefresh = () => {
		this.search()
	}

	render() {
		return (
			<View style={{flex: 1}}>
				<View style={styles.buttonRow}>

					<SetRadiusButton
						radius={10}
						currentRadius={this.state.radius}
						setRadiusCallback={this.search}
					/>

					<SetRadiusButton
						radius={40}
						currentRadius={this.state.radius}
						setRadiusCallback={this.search}
					/>

					<SetRadiusButton
						radius={200}
						currentRadius={this.state.radius}
						setRadiusCallback={this.search}
					/>

				</View>

				{!Storage.loc.enabled &&
				<Text>Location services must be enabled. TODO: add link to enable</Text>
				}

				<PeopleFlatList
					results={this.state.results}
					onRefresh={this.onFlatListRefresh}
					navigation={this.props.navigation}
				/>

			</View>
		)
	}
}


class SetRadiusButton extends React.Component {
	setRadius = () => {
		this.props.setRadiusCallback(this.props.radius)
	}

	render() {
		const text = this.props.radius + " mi"
		const active = ((this.props.currentRadius == this.props.radius) ? true : false)
		return (
			<View>
				{active ? 
					<View style={styles.activeButton}>
						<Text style={styles.buttonText}>{this.props.radius} mi</Text>
					</View>
				 : 
					<TouchableOpacity style={styles.inactiveButton}
						onPress={this.setRadius}>
						<Text style={styles.buttonText}>{this.props.radius} mi</Text>
					</TouchableOpacity>
				}
			</View>
		)
	}
}


const styles = StyleSheet.create({
	buttonRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginLeft: 20,
		marginRight: 20,
	},

	activeButton: {
		margin: 8,
		padding: 8,
		height: 40,
		backgroundColor: "#A0522D",
	},

	inactiveButton: {
		margin: 8,
		padding: 8,
		height: 40,
		backgroundColor: "#429633",
	},

	buttonText: {
		fontSize: 18,
		color: "white",
	},
})
