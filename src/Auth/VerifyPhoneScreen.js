import React from "react"
import {
	KeyboardAvoidingView,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native"
import Constants from "expo-constants"

import { conf } from "../conf.js"
import { submitWithLoading } from "../lib/network.js"
import LoadingModal from "../components/LoadingModal.js"
import Ax from "../stores/Ax.js"
import FlashMsgs from "../stores/FlashMsgs.js"
import Storage from "../stores/Storage.js"
import Blanket from "../styles/blanket.js"


class VerifyPhoneScreen extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			code: "",
			loading: false,
		}
	}

	componentDidMount() {
		this.createCode()
	}

	createOrRegenCode = (action) => {
		let endpoint = "/verify/phone." + action

		// TODO: check fields for errors
		let data = {
			installationId: Constants.installationId,
		}

		onResponse = (resp) => {
			console.log(JSON.stringify(resp.data))
			if (resp.data.i === conf["ACCEPTED"]) {
				FlashMsgs.addFlash("We sent you a new phone verification code", "info")
			} 
		}

		submitWithLoading(this, endpoint, data, onResponse)
	}

	regenCode = () => {
		this.createOrRegenCode("regenCode")
	}

	createCode = () => {
		this.createOrRegenCode("createCode")
	}

	codeUpdate = (v) => {
		if (v.length < 5) {
			this.setState({code: v})
		}
	}

	submit = e => {
		let endpoint = "/verify/phone.checkCode"

		// TODO: check fields for errors
		let data = {
			guess: this.state.code,
			installationId: Constants.installationId,
		}

		onResponse = (resp) => {
			if (resp.data.i === conf["ACCEPTED"]) {
				Storage.processCommand(this.props.navigation)

			} else {
				this.setState({
					failed: true,
				})
			}
		}

		submitWithLoading(this, endpoint, data, onResponse)
	}

	render() {
		return (
			<KeyboardAvoidingView style={styles.container}>
				<Text>Let's verify your number:</Text>
					<TextInput style={styles.code}
						placeholder="0000"
						value={this.state.code}
						keyboardType="number-pad"
						onChangeText={this.codeUpdate}
					/>

				<View style={{flexDirection: "row"}}>
					<TouchableOpacity
						style={Blanket.basicFormButton}
						onPress={this.regenCode}
					>
						<Text>Send New Code</Text>
					</TouchableOpacity>

					<TouchableOpacity
						style={Blanket.basicFormButton}
						onPress={this.submit}
					>
						<Text>Submit</Text>
					</TouchableOpacity>

					<LoadingModal visible={this.state.loading} />

				</View>
			</KeyboardAvoidingView>
		)
	}
}


const styles = StyleSheet.create({
	container: {
		alignItems: "center",
		justifyContent: "center",
	},

	code: {
		backgroundColor: "gray",
		fontSize: 60,
		letterSpacing: 10,
		width: 240,
		textAlign: "center",
	},
})


export default VerifyPhoneScreen
