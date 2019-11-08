import React, { Component } from 'react'
import { Platform } from 'react-native'
import { WebView } from 'react-native-webview'
import { PropTypes } from 'prop-types'

import { DangerZone } from "expo"
const { Stripe } = DangerZone

export default class PaymentsApiScreen extends Component {
  render() {
    const {
      publicKey,
      amount,
      allowRememberMe,
      currency,
      description,
      imageUrl,
      storeName,
      prepopulatedEmail,
      style,
      onPaymentSuccess,
      onClose
    } = this.props;

    const jsCode = `(function() {
                    var originalPostMessage = window.postMessage;

                    var patchedPostMessage = function(message, targetOrigin, transfer) {
                      originalPostMessage(message, targetOrigin, transfer);
                    };

                    patchedPostMessage.toString = function() {
                      return String(Object.hasOwnProperty).replace('hasOwnProperty', 'postMessage');
                    };

                    window.postMessage = patchedPostMessage;
                  })();`;
    return (
      <WebView
        javaScriptEnabled={true}
        scrollEnabled={false}
        bounces={false}
        injectedJavaScript={jsCode}
        onMessage={event => event.nativeEvent.data === 'WINDOW_CLOSED' ? onClose() : onPaymentSuccess(event.nativeEvent.data)}
				originWhitelist={['*']}
				source={{ html: `<script src="https://checkout.stripe.com/checkout.js"></script>
						<script>
						var handler = StripeCheckout.configure({
							key: 'pk_test_8PfL5rQ2K1SaD9cSykWHhu17009ZmNVYj7',
							image: '${imageUrl}',
							locale: 'auto',
							token: function(token) {
								window.postMessage(token.id, token.id);
							},
						});

						window.onload = function() {
							handler.open({
								image: '${imageUrl}',
								name: '${storeName}',
								description: '${description}',
								amount: ${amount},
								currency: '${currency}',
								allowRememberMe: ${allowRememberMe},
								email: '${prepopulatedEmail}',
								closed: function() {
									window.postMessage("WINDOW_CLOSED", "*");
								}
							});
						};
						window.resizeTo(600,800)
					</script>`, baseUrl: ''}}
      />
    );
  }
}
				//source={{ html: '<p>Hello buddy!</p>'}}

StripeCheckout.propTypes = {
  publicKey: PropTypes.string.isRequired,
  amount: PropTypes.number.isRequired,
  imageUrl: PropTypes.string.isRequired,
  storeName: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  allowRememberMe: PropTypes.bool.isRequired,
  onPaymentSuccess: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  currency: PropTypes.string,
  prepopulatedEmail: PropTypes.string,
  style: PropTypes.object
};

StripeCheckout.defaultProps = {
  prepopulatedEmail: '',
  currency: 'USD',
};

