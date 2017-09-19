import React from "react";
import {Route, Switch} from "react-router-dom";

import JobInfo from "./JobInfo";
import JobList from "./JobList";
import NotFound from "./NotFound";

const Main = () => (
	<div id="main">
		<Switch>
			<Route exact path="/" component={JobList}/>
			<Route exact path="/jobinfo/:jobId" component={JobInfo}/>
			<Route path="*" component={NotFound}/>
		</Switch>
	</div>
)

export default Main;
