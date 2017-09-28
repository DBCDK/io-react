import React from "react";
import {Route, Switch} from "react-router-dom";

import FlowsList from "./FlowsList";
import FlowBinderEdit from "./FlowBinderEdit";
import FlowBindersList from "./FlowBindersList";
import JobInfo from "./JobInfo";
import JobList from "./JobList";
import NotFound from "./NotFound";

const Main = () => (
	<div id="main">
		<Switch>
			<Route exact path="/" component={JobList}/>
			<Route exact path="/jobinfo/:jobId" component={JobInfo}/>
			<Route exact path="/flowbinders" component={FlowBindersList}/>
			<Route exact path="/flowbinders/:flowBinderId/edit" component={FlowBinderEdit}/>
			<Route exact path="/flows" component={FlowsList}/>
			<Route path="*" component={NotFound}/>
		</Switch>
	</div>
)

export default Main;
