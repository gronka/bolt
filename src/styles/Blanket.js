import { StyleSheet } from "react-native"
import Constants from 'expo-constants'


export const ColorStyle = {
	"BLUE": "#428AF8",
	"LIGHT_GRAY": "#D3D3D3",
	"green": "#429633",
	"brown": "#A0522D",
	"blue": "#3cf",
}


export const BlanketStyle = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },

  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  image: {
    flex: 1,
    height: 300,
  },

	basicForm: {
		flex: 1,
		justifyContent: "center",
		textAlign: "center",
	},

	basicFormText: {
		marginHorizontal: 10,
		marginVertical: 5,
		fontSize: 18,
	},

	basicFormTextInput: {
		height: 50,
		width: 200,
		marginHorizontal: 10,
		marginVertical: 5,
		paddingHorizontal: 10,
		fontSize: 18,
		backgroundColor: '#ecf0f1',
	},

	basicFormButton: {
		marginTop: 20,
		padding: 10,
		height: 50, 
    width: 100,
    alignItems:'center',
    justifyContent:'center',
		borderRadius: 8,
		borderWidth: 0.5,
		borderColor: "#3CF",
		backgroundColor: "#646464",
	},

	textInputLabel: {
		fontSize: 18,
		//color: "#666",
		color: "#000",
		//marginHorizontal: 8,
		//marginTop: 8,
	},

	textForLabel: {
		fontSize: 18,
		color: "black",
		marginHorizontal: 12,
	},

	textInputTextIcon: {
		fontSize: 18,
		marginHorizontal: 2,
		marginTop: 8,
	},

	textInput: {
		fontSize: 18,
		marginHorizontal: 12,
	},

	textInputPlaceholder: {
		fontSize: 18,
		marginHorizontal: 12,
		color: "#CCC",
	},

	textInputModal: {
		margin: 20,
		fontSize: 20,
	},

	buttonModal: {
		flex: 1,
		margin: 10,
		fontSize: 20,
		padding: 10,
		height: 50, 
    width: 100,
    alignItems:'center',
    justifyContent:'center',
		borderRadius: 8,
		borderWidth: 0.5,
		borderColor: ColorStyle["blue"],
		backgroundColor: ColorStyle["blue"],
	},

	addressResult: {
		marginHorizontal: 10,
		paddingVertical: 10,
		height: 60,
		borderTopWidth: 1,
		borderTopColor: "#DDD",
	},

	flatRow: {
		marginHorizontal: 10,
		paddingVertical: 10,
		minHeight: 60,
		borderTopWidth: 1,
		borderTopColor: "#DDD",
	},

	buttonModalText: {
		color: "white",
	},

	warning: {
		color: "#e60000",
		marginHorizontal: 12,
	},

	datePickerText: {
		padding: 12,
		fontSize: 16,
		//padding: 8,
		textAlign: "center",
	},

	profileImage: {
		height: 80,
		width: 80,
		margin: 10,
		borderRadius: 50,
	},

	fieldEditButton: {
		//height: 40, 
		//width: 40,
    alignItems:'center',
    justifyContent:'center',
		//borderRadius: 8,
		//borderWidth: 0.5,
		//borderColor: "#3CF",
		//backgroundColor: "#646464",
	},

})
