import React from "react"
import { 
	KeyboardAvoidingView,
	Text, 
	TextInput, 
	TouchableOpacity,
	View, 
	ScrollView,
} from "react-native"
import { Ionicons } from '@expo/vector-icons';
import MapView, { Marker } from "react-native-maps"
// TODO: will there be glitches with navigating between edit event screens?

import { 
	Blanket, 
	Ctx,
	CrumbNav,
	EditEventObj,
	EventCache,
	EventMapData, 
} from "../../../Globals.js"
import LoadingModal from "../../../components/LoadingModal.jsx"
import ChangeEventLocation from "../../../nested/Tacs/ChangeEventLocation.jsx"


class EditEventScreen extends React.Component {
	constructor(props) {
		super(props)

		this.event = EditEventObj
		this.eventUuid = CrumbNav.getParam("eventUuid")
		this.event.state = "edit"

		this.state = {
			updates: 0,
		}
	}
	incrementUpdates = () => { this.setState({ updates: this.state.updates + 1 }) }

	componentWillMount() {
		this.loadEvent()
	}

	loadEvent = async () => {
		await EventCache.cloneFromCache(this.eventUuid, this.event)
		this.incrementUpdates()
		console.log(this.event.getLat())
		console.log(this.event.getLng())
	}

	render() {
		return(
			<ScrollView>
				<View style={{ marginHorizontal: 8 }}>
					<Text style={Blanket.textInputLabel}>Editing your event</Text>
				</View>
				<EditableField
					fieldTitle="Event Name:"
					placeholder="Event Name"
					target={this.event}
					field="title"
					defaultValue={this.event.getField("title")}
				/>

				<EditableField
					fieldTitle="Quick Info (map view popup):"
					placeholder="Short event description"
					target={this.event}
					field="quickInfo"
					defaultValue={this.event.getField("quickInfo")}
				/>

				<EditableField
					fieldTitle="Long Info:"
					placeholder="Full event description"
					target={this.event}
					field="longInfo"
					defaultValue={this.event.getField("longInfo")}
				/>

				<ChangeEventLocation 
					event={this.event}
					updates={this.state.updates}
				/>

			</ScrollView>
		)
	}
}


class EditableField extends React.Component {
	constructor(props) {
		super(props)

		this.target = this.props.target
		this.field = this.props.field
		this.savedValue = this.props.defaultValue
		this.inputRef = React.createRef()

		this.state = {
			updates: 0,
			value: this.props.value,
			saving: false,
			editMode: false,
			canSave: false,
		}
	}
	incrementUpdates = () => { this.setState({ updates: this.state.updates + 1 }) }

	componentDidUpdate(prevProps) {
		if (this.savedValue !== prevProps.defaultValue) {
			this.savedValue = this.props.defaultValue
		}
	}

	saveChanges = async () => {
		onSuccess = (resp) => {
			this.setState({
				editMode: false,
			})
			// TODO: could reply with what the field was set to in the API. This
			// helps ensure user UI is up to date with database
			this.savedValue = this.target.getField(this.field)
			Ctx.FlashMsgs.addFlash("Field updated", "success")
			console.log("field updated")
		}

		this.setState({ saving: true })
		await this.target.saveFieldToDb(this.field, onSuccess)
		// TODO: set flag to update this event in cache
		this.setState({ saving: false })
	}

	cancelChanges = () => {
		this.inputRef.setNativeProps({text: this.savedValue})
		this.target.setField(this.field, this.savedValue)
		this.setState({
			editMode: false,
		})
	}

	enableEditMode = () => {
		this.setState({editMode: true})
	}

	handleChange = (value) => {
		this.target.setField(this.field, value)

		if (value === this.savedValue) {
			this.setState({ canSave: false })
		} else {
			this.setState({ canSave: true })
		}
	}

	render() {
		return(
			<KeyboardAvoidingView
				style={{ marginHorizontal: 8 }}
			>
				<LoadingModal visible={this.state.saving} />
				<View style={{ flexDirection: "row", justifyContent: "space-between"}}>
					<Text style={{ ...Blanket.textInputLabel, paddingTop: 10 }}>
						{this.props.fieldTitle}
					</Text>

					{this.state.editMode ? (
						<View style={{ flexDirection: "row" }}>
							<TouchableOpacity
								style={{ ...Blanket.fieldEditButton, marginRight: 30 }}
								disabled={!this.state.canSave}
								onPress={this.saveChanges}
							>
								<Ionicons name="md-checkmark-circle-outline" size={30} />
							</TouchableOpacity>

							<TouchableOpacity
								style={Blanket.fieldEditButton}
								disabled={!this.state.editMode}
								onPress={this.cancelChanges}
							>
								<Ionicons name="md-close" size={30} />
							</TouchableOpacity>
						</View>

					) : (
						<TouchableOpacity
							style={Blanket.fieldEditButton}
							onPress={this.enableEditMode}
						>
							<Ionicons name="md-create" size={30} />
						</TouchableOpacity>
					)}

				</View>

				<TextInput 
					style={{ fontSize: 18, color: "#888", marginHorizontal: 8 }}
					placeholder={this.props.placeholder}
					defaultValue={this.props.defaultValue}
					editable={this.state.editMode}
					onChangeText={this.handleChange}
					multiline={true}
					ref={ (ref) => this.inputRef = ref }
				/>

			</KeyboardAvoidingView>
		)
	}
}


export default EditEventScreen
