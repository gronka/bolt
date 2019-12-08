import React from "react"
import {
	FlatList,
	ScrollView,
	Text,
	TouchableOpacity,
	View,
} from "react-native"

import { AgendaCache } from "../../Globals.js"


export default class Agenda extends React.Component {
	constructor(props) {
		super(props)

		var agenda = []
		this.state = {
			agenda: agenda,
		}
	}

	getAgenda = async () => {
		var agenda = await AgendaCache.getAgenda(
			this.props.userUuid, 
			this.props.year, 
			this.props.month, 
			this.props.day
		)
		this.setState({
			agenda: agenda,
		})
		return
	}
	
	componentWillMount() {
		this.getAgenda()
	}

	_keyExtractor = (item, index) => { return index.toString() }

	_renderItem = ({item, index}) => {
		this.state.val = this.state.val + 1
		return(
			<AgendaRow 
				item={item}
			/>
		)
	}

	//print = () => {
				//<TouchableOpacity onPress={this.print}>
					//<Text>{this.state.updates}</Text>
				//</TouchableOpacity>
		//console.log(this.state)
		//this.setState({
			//updates: this.state.updates + 1,
		//})
	//}

	_listEmptyComponent = () => {
		return (<Text>Agenda failed to load.</Text>)
	}

	render() {
		return (
			<View>
				<FlatList
					data={this.state.agenda.items}
					ListEmptyComponent={this._listEmptyComponent}
					keyExtractor={this._keyExtractor}
					renderItem={this._renderItem}
				/>
			</View>
		)
	}
}


class AgendaRow extends React.Component {
	render() {
		console.log(this.props.item)

		return(
			<View style={{ flexDirection: "row" }}>

				<View style={{flexDirection: "column"}}>
					<Text style={{ 
						paddingHorizontal: 6, 
						paddingVertical: 2, 
						margin: 4,
						marginRight: 0,
						backgroundColor: "#999", 
						color: "#EEE",
						textAlign: "right",
						//flex: 1,
						//justifyContent: "flex-start"
					}}>
						{this.props.item.timeLabel}
					</Text>

				</View>

				<View style={{
					borderRadius: 6,
					borderWidth: 1,
					borderColor: "#FC0",
					marginBottom: 8,
					marginRight: 10,
					flex: 4,
				}}>

					<Text style={{ 
						padding: 6, 
					}}>
						{this.props.item.apptUuid}
					</Text>

				</View>

				
			</View>

		)
	}
}
