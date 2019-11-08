import React, { Component } from 'react'
import { Platform } from 'react-native'
import { WebView } from 'react-native-webview'
import { PropTypes } from 'prop-types'
import { withNavigationFocus } from "react-navigation"

import { conf } from "../conf.js"


class StripeCheckout extends Component {
	constructor(props) {
		super(props)
		this.webView = React.createRef()
	}

	componentDidUpdate(prevProps) {
		if (prevProps.isFocused !== this.props.isFocused) {
			if (this.props.isFocused) {
					this.webView.reload()
			}
		}
	}

  render() {
    return (
      <WebView
        javaScriptEnabled={true}
				scalePagesToFit={false}
				useWebKit={false}
        scrollEnabled={false}
        bounces={false}
				source={{ uri: conf.kapi + "/patron/addCreditCardScreen" }}
				ref={ (comp) => {this.webView = comp} }
      />
    )
  }
}


export default withNavigationFocus(StripeCheckout)
