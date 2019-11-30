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
				visible={this.props.visible}
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


export default LoadingModal
