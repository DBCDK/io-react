import React from "react";
import {Link} from "react-router-dom";

import Constants from "../Constants";
import FlowBinder from "../model/FlowBinder";
import HttpClient from "../HttpClient";

const getFlowBinders = function(jsonStr) {
	const json = JSON.parse(jsonStr);
	const flowBinders = [];
	for(let i = 0; i < json.length; i++) {
		const flowBinder = FlowBinder.fromJson(json[i]);
		flowBinders.push(flowBinder);
	}
	return flowBinders;
}

class FlowBinderElement extends React.Component {
	showSubmitter() {
		// temporarily just show the first submitter
		return this.props.flowBinder.content.submitterIds[0];
	}
	lookupFlow() {
		// should look up flow asynchronously
		return this.props.flowBinder.content.flowId;
	}
	lookupSink() {
		// should look up sink asynchronously
		return this.props.flowBinder.content.sinkId;
	}
	getQueueProvider(sinkId) {
		return "queue provider";
	}
	render() {
		const editPath = `/flowbinders/${this.props.flowBinder.id}/edit`;
		return (
			<tr>
				<td>{this.props.flowBinder.content.name}</td>
				<td>{this.props.flowBinder.content.description}</td>
				<td>{this.props.flowBinder.content.packaging}</td>
				<td>{this.props.flowBinder.content.format}</td>
				<td>{this.props.flowBinder.content.charset}</td>
				<td>{this.props.flowBinder.content.destination}</td>
				<td>{this.props.flowBinder.content.recordSplitter}</td>
				<td>{this.showSubmitter()}</td>
				<td>{this.lookupFlow()}</td>
				<td>{this.lookupSink()}</td>
				<td>{this.getQueueProvider(this.props.flowBinder.sinkId)}</td>
				<td><Link to={editPath}>edit</Link></td>
			</tr>
		)
	}
}

class FlowBindersList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			flowBinders: []
		};
	}
	componentWillMount() {
		new HttpClient().with_callback(json => {
			this.setState({flowBinders: getFlowBinders(json)})
			})
			.get(Constants.flowBindersEndpoint);
	}
	render() {
		return (
			<div>
				<table className="table">
					<thead>
						<tr>
							<th>name</th>
							<th>description</th>
							<th>format</th>
							<th>content format</th>
							<th>charset</th>
							<th>destination</th>
							<th>record splitter</th>
							<th>submitters</th>
							<th>flow</th>
							<th>sink</th>
							<th>queue provider</th>
							<th/>
						</tr>
					</thead>
					<tbody>
					{
						this.state.flowBinders.map((flowBinder, i) => <FlowBinderElement key={i} flowBinder={flowBinder}/>)
					}
					</tbody>
				</table>
			</div>
		)
	}
}

export default FlowBindersList;
