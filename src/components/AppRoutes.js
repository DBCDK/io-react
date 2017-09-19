import React from "react";
import {BrowserRouter, Route, Switch} from "react-router-dom";

import App from "./App";

class AppRoutes extends React.Component {
	render() {
		return (
			<BrowserRouter>
				<App/>
			</BrowserRouter>
		);
	}
}

export default AppRoutes;
