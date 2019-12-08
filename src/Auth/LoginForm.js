import React from 'react';
import { 
	KeyboardAvoidingView,
	Button,
	View, 
	StyleSheet,
	Text, 
	TextInput, 
	TouchableOpacity,
} from "react-native"
import PhoneInput from "react-native-phone-input"
import { decode as atob } from "base-64"
import { withNavigation } from "react-navigation"

import { Ctx } from "../Globals.js"
import LoadingModal from "../components/LoadingModal.js"


class LoginForm extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			loading: false,
			failed: false,
			phoneOrEmail: "",
			password: "",
			callingCode: "1",
		}

		this.countryBox = React.createRef()
	}

	componentDidMount() {
		Ctx.Storage.signOut()
	}

	changePhoneNumber = v => {
		this.setState({
			callingCode: v,
		})
	}

	selectCountry = v => {
		this.setState({
			callingCode: this.countryBox.getCountryCode(),
		})
	}

	submit = e => {
		let endpoint = this.props.apiEndpoint

		// TODO: check fields for errors
		let data = {
			phoneOrEmail: this.state.phoneOrEmail,
			password: this.state.password,
			callingCode: this.state.callingCode,
			phoneCountryIso: this.countryBox.getISOCode(),
		}

		onResponse = (resp) => {
			console.log(JSON.stringify(resp.data))
			if (resp.data.i === Ctx.Static["INFO_ACCEPTED"]) {
				var jwt = resp.data.b.jwt
				var claims = JSON.parse(atob(jwt.split('.')[1]))

				Ctx.Storage.signIn(claims.userUuid, jwt)
				Ctx.Ax.remakeAxios(jwt)
			}

			Ctx.Ax.processCommand(this.props.navigation)
		}

		Ctx.Ax.submitWithLoading(this, endpoint, data, onResponse)
	}

	render() {
		return (
			<KeyboardAvoidingView 
				behavior="padding" 
				style={{flex: 1}}
			>

				<View
					style={{flex: 1, 
					flexDirection: "column",
					justifyContent: "center", 
					alignItems: "center",
					}}
				>

					<View style={{flexDirection: "row", height: 50}}>
						<PhoneInput
							style={{width: 80}}
							initialCountry="us"
							onChangePhoneNumber={this.changeCallingCode}
							onSelectCountry={this.selectCountry}
							ref={(ref) => {this.countryBox = ref}}
						/>

						<TextInput 
							style={styles.textInput}
							placeholder="Phone Number or Email"
							onChangeText={ (phoneOrEmail) => this.setState({phoneOrEmail}) }
						/>
					</View>

					<TextInput 
						style={styles.textInput}
						password={true}
						secureTextEntry={true}
						placeholder="Password"
						autoCompleteType="password"
						onChangeText={ (password) => this.setState({password}) }
					/>

					<TouchableOpacity
						style={Blanket.basicFormButton}
						onPress={this.submit}
					>
						<Text>{this.props.title}</Text>
					</TouchableOpacity>

					<LoadingModal visible={this.state.loading} />

					{this.state.failed &&
						<Text>Failed to sign in.</Text>
					}

				</View>
			</KeyboardAvoidingView>
		)
	}
}


const styles = StyleSheet.create({
	textInput: {
		height: 40,
		paddingLeft: 6,
	}
})


export default withNavigation(LoginForm)
