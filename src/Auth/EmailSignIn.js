import React from 'react';

import LoginForm from "./LoginForm.js"


class EmailSignInScreen extends React.Component {
	render() {
		return (
			<LoginForm
				apiEndpoint="/user/signin"
				title="Sign In"
			/>
		)
	}
}


export default EmailSignInScreen
