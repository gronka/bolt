import React from "react"
import { 
	Button, 
	Image, 
	KeyboardAvoidingView,
	ScrollView,
	StyleSheet,
	Text, 
	TextInput, 
	TouchableOpacity,
	View, 
} from "react-native"
import { Ionicons } from '@expo/vector-icons';

import { conf } from "../conf.js"
import { get, post } from "../lib/network.js"
import Ax from "../stores/Ax.js"
import FlashMsgs from "../stores/FlashMsgs.js"
import ProfileCache from "../stores/ProfileCache.js"
import { Profile } from "../stores/ProfileCache.js"
import Storage from "../stores/Storage.js"
import Blanket from "../styles/blanket.js"


class EditProfileScreen extends React.Component {
	constructor(props) {
		super(props)
		this.profile = new Profile()
		this.endpoint = "/user/field.update"

		this.state = {
			updates: 0,
		}

	}

	componentWillMount() {
		this.loadProfile()
	}

	loadProfile = async () => {
		this.profile = await ProfileCache.getItem(Storage.userUuid)
		this.setState({
			updates: this.state.updates + 1,
			fullname: this.profile.fullname,
			about: this.profile.about,
			hometown: this.profile.hometown,
			//profilePicUrl: profile.profil,
			//nickname: profile.fullname,
			//followingUuids: profile.fullname,
		})
	}

	determineFocus = () => {
		// TODO: keyboard onFocus
		// TODO: we can pass button presses from children up to here, then pass a
		// focused boolean back to the children
	}

	render() {
		// TODO: set properties of profilecache such that we pass itemUuid and
		// uuidName instead of naming it userUuid. Perhaps put these values in the
		// Cache initialization??
		return (
			<KeyboardAvoidingView
					style={{flex: 1}}
				>
				<EditableField
					style={{flex: 1}}
					updates={this.state.updates}
					itemUuid={Storage.userUuid}
					cache={ProfileCache}
					endpoint={ProfileCache.updateFieldUrl}
					uuidName={ProfileCache.uuidName}
					name="fullname"
					value={this.state.fullname}
					placeholder="My name"
				/>

				<EditableField
					style={{flex: 1}}
					updates={this.state.updates}
					itemUuid={Storage.userUuid}
					cache={ProfileCache}
					endpoint={this.endpoint}
					uuidName={ProfileCache.uuidName}
					name="hometown"
					value={this.state.hometown}
					placeholder="My hometown"
				/>

				<EditableField
					style={{flex: 1}}
					updates={this.state.updates}
					itemUuid={Storage.userUuid}
					cache={ProfileCache}
					endpoint={this.endpoint}
					uuidName={ProfileCache.uuidName}
					name="about"
					value={this.state.about}
					placeholder="About me"
					multiline={true}
				/>

			</KeyboardAvoidingView>
		)
	}
}


// EditableField works by tracking the number of updates made by the parent
// component. In this way, EditableField can act independently, but new
// information from the parent can be passed down seamlessly
// TODO: allow EditableField to force the parent to update?
class EditableField extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			updates: 0,
			value: this.props.value,
			savedValue: this.props.value,
			saving: false,
			editMode: false,
		}
		if (this.props.multiline) {
			this.multiline = true
		} else {
			this.multiline = false
		}
	}

	static getDerivedStateFromProps(newProps, state) {
		if (newProps.updates > state.updates) {
			return({
				updates: newProps.updates,
				value: newProps.value,
				savedValue: newProps.value,
			})
		}

		return null
	}

	saveChanges = (value) => {
		const data = {
			//[this.props.uuidName]: this.props.itemUuid,
			itemUuid: this.props.itemUuid,
			field: this.props.name,
			value: this.state.value,
		}

		Ax.ax.post(this.props.endpoint, data)
		.then((resp) =>{
			if (resp.data.i === conf["ACCEPTED"]) {
				this.setState({
					editMode: false,
					savedValue: this.state.value,
				})
				// Force an update by deleting the item
				this.props.cache.flagForUpdate(this.props.itemUuid)
			} else {
				this.updateFailed()
			}
		})
		.catch((err) => {
			console.log(err)
			this.updateFailed()
		})
	}

	updateFailed = () => {
		FlashMsgs.addFlash("Update failed", "error")
		this.setState({
			editMode: false,
			value: this.state.savedValue,
		})
	}

	cancelChanges = () => {
		this.setState({
			editMode: false,
			value: this.state.savedValue,
		})
	}

	enableEditMode = () => {
		this.setState({editMode: true})
	}

	handleChange = (value) => {
		this.setState({value: value})
	}

	render() {
		return (
			<View style={{ flexDirection: "row", justifyContent: "space-between"}}>
				<TextInput 
					style={{flex: 1, flexGrow: 2, margin: 10}}
					placeholder={this.props.placeholder}
					value={this.state.value}
					editable={this.state.editMode}
					onChangeText={this.handleChange}
					multiline={this.multiline}
				/>

			<View
				style={{flex: 1, flexDirection: "row", marginRight: 10}}
			>

				{this.state.editMode ? (
				<TouchableOpacity
					style={styles.button}
					onPress={this.saveChanges}
				>
					<Ionicons name="md-checkmark-circle-outline" size={24} />
				</TouchableOpacity>

				) : (
				<TouchableOpacity
					style={styles.button}
					onPress={this.enableEditMode}
				>
					<Ionicons name="md-create" size={24} />
				</TouchableOpacity>
				)}
				
				{this.state.editMode &&
				<TouchableOpacity
					style={styles.button}
					disabled={!this.state.editMode}
					onPress={this.cancelChanges}
				>
					<Ionicons name="md-close" size={24} />
				</TouchableOpacity>
				}

				</View>

			</View>
		)
	}
}


const styles = StyleSheet.create({
	button: {
		margin: 10,
		padding: 10,
		height: 40, 
    width: 40,
    alignItems:'center',
    justifyContent:'center',
		//borderRadius: 8,
		//borderWidth: 0.5,
		//borderColor: "#3CF",
		//backgroundColor: "#646464",
	},

})


export default EditProfileScreen
