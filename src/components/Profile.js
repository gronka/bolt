import React from "react"
import { 
	Image, 
	ScrollView,
	StyleSheet,
	Text, 
	View, 
} from "react-native"
import { Ionicons } from '@expo/vector-icons';

import { Blanket, Ctx, ProfileCache } from "../Globals.js"


class Profile extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			updates: 0,
			fullname: "Loading...",
			profilePicUrl: "",
			about: "",
			rating: 0,
			nickname: "",
			followingUuids: [],
			hometown: "",
		}
	}

	componentWillMount() {
		this.loadProfile(this.props.userUuid)
	}

	loadProfile = async () => {
		this.profile = await ProfileCache.getItem(this.props.userUuid)
		this.setState({
			updates: this.state.updates + 1,
			fullname: this.profile.fullname,
			about: this.profile.about,
			hometown: this.profile.hometown,
			profilePicUrl: this.profile.profilePicUrl,
			rating: this.profile.rating,
		})

		this.props.onLoad(this.profile.fullname)
	}

	render() {
		const myProfile = (this.props.userUuid == Ctx.Storage.userUuid) ? true : false

		return (
			<ScrollView>
				<View style={{ flex: 1, alignItems: "center", margin: 20 }}>
					{this.state.profilePicUrl ? (
						<Image 
							style={Blanket.profileImage}
							source={{uri: this.state.profilePicUrl}}
						/>

					) : (
						<Image 
							style={Blanket.profileImage}
							source={require("../../assets/blankProfile.png")}
						/>
					)
					}

					<Text style={{ fontSize: 20, margin: 10 }}>
						{this.state.fullname}
					</Text>

					<View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
						<Text style={{ fontSize: 20, margin: 10 }}>
							{this.state.rating}
						</Text>
						<Text style={{ fontSize: 12 }}>
							(read all reviews)
						</Text>
					</View>

					<Text style={{ fontSize: 16, margin: 10 }}>
						Links to trainer/videographer/store
					</Text>

					{!myProfile &&
						<Text style={{ fontSize: 16, margin: 10 }}>
							Follow, message links
						</Text>
					}

					<View style={{ flexDirection: "row" }}>
						<Text style={{ flex: 1, margin: 10, textAlign: "left" }}>
							{this.state.about} 
						</Text>
					</View>

					<Text style={{ margin: 10 }}>
						Recent activity list?
					</Text>

				</View>
			</ScrollView>
		)
	}
}


export default Profile
