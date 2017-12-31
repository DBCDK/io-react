import React from "react";
import PropTypes from "prop-types";
import {createStore} from "redux";

import Main from "./Main";
import Sidebar from "./Sidebar";
import {initialState, submitters} from "../reducers";

class App extends React.Component {
	getChildContext() {
		return {
			store: this.props.store
		}
	}
	render() {
		return (
			<div>
				<Sidebar/>
				<Main/>
			</div>
		);
	}
}

App.propTypes = {
	store: PropTypes.object
};

App.defaultProps = {
	store: createStore(submitters, initialState)
};

App.childContextTypes = {
	store: PropTypes.object.isRequired
};

export default App;
