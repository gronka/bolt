import React from 'react';
import {
  ActivityIndicator,
	Button,
  Modal,
  StyleSheet,
  View,
} from 'react-native';
import PropTypes from "prop-types"


/**
 * Modal that displays a spinning indicator
 *
 * @LoadingModal
 */
class LoadingModal extends React.Component {
	render() {
		return (
			<Modal 
				visible={true}
				transparent={true}
			>
				<View style={styles.modalBackground}>
					<View style={styles.activityIndicatorWrapper}>
						<ActivityIndicator animating={true} />
					</View>

				</View>
			</Modal>
		)
	}
}

/**
 * Button that will enable LoadingModal while processing a request
 *
 * @ButtonWithLoader
 */
class ButtonWithLoader extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			loading: false,
		}
	}

	buttonPress = (e) => {
		this.setState({
			loading: true
		})

		this.props.loadingFn()

		this.setState({
			loading: false
		})
	}

	render() {
		return (
			<View>
				<Button
					title="Sign Up"
					onPress={this.buttonPress}
				/>
				{this.state.loading &&
					<LoadingModal />
				}
			</View>


		)
	}
}


ButtonWithLoader.propTypes = {
	loadingFn: PropTypes.func.isRequired,
}


const styles = StyleSheet.create({
	modalBackground: {
		flex: 1,
		alignItems: "center",
		flexDirection: "column",
		justifyContent: "space-around",
		backgroundColor: "#00000040",
	},

	activityIndicatorWrapper: {
		backgroundColor: "#FFFFFF",
		height: 100,
		width: 100,
		borderRadius: 10,
		display: "flex",
		alignItems: "center",
		justifyContent: "space-around",
	},

})


export default ButtonWithLoader
