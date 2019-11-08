import { StyleSheet } from "react-native"
import Constants from 'expo-constants'

import { WIDTH, HEIGHT } from "../conf.js"


const Blanket = StyleSheet.create({
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
})

export default Blanket
