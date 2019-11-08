import * as React from 'react';

import LoginForm from "./LoginForm.js"


class EmailSignUpScreen extends React.Component {
	render() {
		return (
			<LoginForm
				apiEndpoint="/user/signup"
				title="Sign Up"
			/>
		)
	}
}


export default EmailSignUpScreen
