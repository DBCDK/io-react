import React from "react";
import {Link} from "react-router-dom";

import BaseList from "../model/BaseList";
import Constants from "../Constants";
import Flow from "../model/Flow";
import FlowBinder from "../model/FlowBinder";
import Sink from "../model/Sink";

class FlowBinderElement extends React.Component {
	componentDidMount() {
		this.props.updateCallback(this.props.flowBinder);
	}
	showSubmitter() {
		// temporarily just show the first submitter
		return this.props.flowBinder.content.submitterIds[0];
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
				<td>{this.props.flowBinder.content.flow.content.name}</td>
				<td>{this.props.flowBinder.content.sink.content.name}</td>
				<td>{this.getQueueProvider(this.props.flowBinder.sinkId)}</td>
				<td><Link to={editPath}>edit</Link></td>
			</tr>
		)
	}
}

class FlowBindersList extends React.Component {
	constructor(props) {
		super(props);
		this.state = BaseList.getBaseListStateObject();
	}
	componentWillMount() {
		BaseList.getItems(Constants.flowBindersEndpoint, null, {}, json =>
			this.setState({items: BaseList.mapItemsFromJson(FlowBinder, json)})
		);
	}
	updateCallback(flowBinder) {
		this.updateSink(flowBinder).then(this.updateFlow(flowBinder));
	}
	updateFlow(flowBinder) {
		return new Promise((resolve, reject) => {
			const params = new Map();
			params.set("flowId", flowBinder.content.flowId);
			BaseList.getSingleItem(Constants.singleFlowEndpoint, params, jsonStr => {
				const json = JSON.parse(jsonStr);
				flowBinder.content.flow = Flow.fromJson(json);
				this.setState({items: this.state.items});
				resolve();
			});
		});
	}
	updateSink(flowBinder, callback) {
		return new Promise((resolve, reject) => {
			const params = new Map();
			params.set("sinkId", flowBinder.content.sinkId);
			BaseList.getSingleItem(Constants.sinksEndpoint, params, jsonStr => {
				const json = JSON.parse(jsonStr);
				flowBinder.content.sink = Sink.fromJson(json);
				this.setState({items: this.state.items});
				resolve();
			});
		});
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
						this.state.items.map((flowBinder, i) => <FlowBinderElement key={i} flowBinder={flowBinder} updateCallback={this.updateCallback.bind(this)}/>)
					}
					</tbody>
				</table>
			</div>
		)
	}
}

export default FlowBindersList;
