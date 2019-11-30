import React from "react"
import {
	Image,
	StyleSheet,
	Text,
	TouchableOpacity, 
	View,
} from "react-native"

import ProfileCache from "../stores/ProfileCache.js"


export default class PersonResult extends React.Component {
	constructor(props) {
		super(props)
		this._isMounted = false

		this.state = {
			updates: 0,
			userUuid: "",
			fullname: "Loading...",
			profilePicUrl: "",
			about: "",
			rating: 0,
			nickname: "",
			followingUuids: [],
			hometown: "",
		}
	}

	navToProfile = () => {
		const userUuid = this.state.userUuid
		this.props.navigation.navigate("CommunityViewProfile", {userUuid: userUuid})
	}

	componentDidMount() {
		this._isMounted = true
		this.loadProfile(this.props.userUuid)
	}

	componentWillUnmount() {
		this._isMounted = false
	}

	loadProfile = async () => {
		this.profile = await ProfileCache.getItem(this.props.userUuid)
		if (this._isMounted) {
			this.setState({
				updates: this.state.updates + 1,
				userUuid: this.profile.userUuid,
				fullname: this.profile.fullname,
				profilePicUrl: this.profile.profilePicUrl,
				rating: this.profile.rating,
				isTrainer: this.profile.isTrainer,
			})
		}
	}

	shouldComponentUpdate(nextProps, nextState) {
		if (nextState.updates > this.state.updates) {
			return true
		}
		return false
	}

	render() {
		return (
			<View style={ styles.personResult }>
				<View style={styles.profileImageView}>
					{this.state.profilePicUrl ? (
						<Image 
							style={styles.profileImage}
							source={{uri: this.state.profilePicUrl}}
						/>

					) : (
						<Image 
							style={styles.profileImage}
							source={require("../../assets/blankProfile.png")}
						/>
					)
					}
				</View>

				<TouchableOpacity onPress={this.navToProfile}>
					<Text style={{ fontSize: 16 }}>{this.state.fullname}</Text>
				</TouchableOpacity>

				<Text>{this.state.isTrainer}</Text>
			</View>
		)
	}
}


const styles = StyleSheet.create({
	personResult: {
		flex: 1,
		flexDirection: "row",
		paddingTop: 10,
		paddingLeft: 10,
		paddingBottom: 10,
		maxHeight: 60,
		borderBottomWidth: 1,
		borderBottomColor: "gray",
	},

	profileImageView: {
		width: 40,
		marginRight: 8,
	},

	profileImage: {
		height: 40,
		width: 40,
		borderRadius: 50,
	},
})
