import React from "react";
import {Link} from "react-router-dom";
import PropTypes from "prop-types";

import BaseList from "../model/BaseList";
import Constants from "../Constants";
import Flow from "../model/Flow";
import FlowBinder from "../model/FlowBinder";
import Sink from "../model/Sink";
import SubmittersHandler from "../model/SubmittersHandler";
import SubmittersView from "./SubmittersView";

import {
	addFlowBinders,
	addSubmitter,
	updateFlowbinder
} from "../reducers";

class FlowBinderElement extends React.Component {
	componentDidMount() {
		this.props.updateCallback(this.props.flowBinder);
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
				<td><SubmittersView submitterIds={this.props.flowBinder.content.submitterIds}/></td>
				<td>{this.props.flowBinder.content.flow.content.name}</td>
				<td>{this.props.flowBinder.content.sink.content.name}</td>
				<td>{this.getQueueProvider(this.props.flowBinder.sinkId)}</td>
				<td><Link to={editPath}><button>edit</button></Link></td>
			</tr>
		)
	}
}

FlowBinderElement.propTypes = {
	submittersHandler: PropTypes.instanceOf(SubmittersHandler)
};

FlowBinderElement.defaultProps = {
	submittersHandler: new SubmittersHandler()
};

class FlowBindersList extends React.Component {
	constructor(props, context) {
		super(props, context);
		this.state = {
			submittersHandler: new SubmittersHandler()
		};
	}
	componentWillMount() {
		this.unsubscribe = this.context.store.subscribe(
			this.forceUpdate.bind(this));
		BaseList.getItems(Constants.flowBindersEndpoint, null, {}).then(json =>
			this.context.store.dispatch(addFlowBinders(BaseList.mapItemsFromJson(
				FlowBinder, json)))
		);
		this.fetchSubmitters();
	}
	fetchSubmitters() {
		this.state.submittersHandler.getSubmitters().then(submitters =>
			submitters.forEach(submitter =>
				this.context.store.dispatch(addSubmitter(submitter)))
		).catch(console.error.bind(console));
	}
	componentWillUnmount() {
		this.unsubscribe();
	}
	updateCallback(flowBinder) {
		this.updateSink(flowBinder).then(this.updateFlow(flowBinder));
	}
	updateFlow(flowBinder) {
		return new Promise((resolve, reject) => {
			const params = new Map();
			params.set("flowId", flowBinder.content.flowId);
			BaseList.getSingleItem(Constants.singleFlowEndpoint, params).then(
				jsonStr => {
					const json = JSON.parse(jsonStr);
					flowBinder.content.flow = Flow.fromJson(json);
					this.context.store.dispatch(updateFlowbinder(flowBinder));
					resolve();
			});
		});
	}
	updateSink(flowBinder) {
		return new Promise((resolve, reject) => {
			const params = new Map();
			params.set("sinkId", flowBinder.content.sinkId);
			BaseList.getSingleItem(Constants.sinksEndpoint, params).then(jsonStr => {
				const json = JSON.parse(jsonStr);
				flowBinder.content.sink = Sink.fromJson(json);
				this.context.store.dispatch(updateFlowbinder(flowBinder));
				resolve();
			});
		});
	}
	render() {
		const {flowBinders} = this.context.store.getState();
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
						flowBinders.map((flowBinder, i) => <FlowBinderElement key={i} flowBinder={flowBinder} updateCallback={this.updateCallback.bind(this)}/>)
					}
					</tbody>
				</table>
			</div>
		)
	}
}

FlowBindersList.contextTypes = {
	store: PropTypes.object.isRequired
};

export default FlowBindersList;
