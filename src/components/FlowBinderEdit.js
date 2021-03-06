import React from "react";
import PropTypes from "prop-types";

import FlowBinder from "../model/FlowBinder";
import {FlowBinderContent} from "../model/FlowBinder";
import RecordSplitterConstants from "../model/RecordSplitterConstants";
import SubmittersView from "./SubmittersView";

class BaseSelect extends React.Component {
	render() {
		return (
			<div className="form-group">
				<label htmlFor={this.props.name}>{this.props.value}</label>
				<select name={this.props.name} defaultValue={this.props.selected}>
					{this.props.children}
				</select>
			</div>
		)
	}
}

class FlowSelect extends React.Component {
	render() {
		return (
			<BaseSelect name="flow" value="flow" selected={this.props.flow.id}>
			{
				this.props.allFlows.map((flow, i) => <option key={i} value={flow.id}>{flow.content.name}</option>)
			}
			</BaseSelect>
		)
	}
}

class SinkSelect extends React.Component {
	render() {
		return (
			<BaseSelect name="sink" value="sink" selected={this.props.sink.id}>
			{
				this.props.allSinks.map((sink, i) => <option key={i} value={sink.id}>{sink.content.name}</option>)
			}
			</BaseSelect>
		)
	}
}

class RecordSplitterSelect extends React.Component {
	render() {
		return (
			<BaseSelect name="record-splitter" value="record splitter" selected={this.props.recordSplitter}>
			{
				Object.keys(RecordSplitterConstants).map((key, i) => <option key={i} value={RecordSplitterConstants[key]}>{RecordSplitterConstants[key]}</option>)
			}
			</BaseSelect>
		)
	}
}

RecordSplitterSelect.propTypes = {
	recordSplitter: PropTypes.string
};

RecordSplitterSelect.defaultProps = {
	recordSplitter: ""
};

class FlowBinderEdit extends React.Component {
	constructor(props, context) {
		super(props, context);
		const id = Number.parseInt(this.props.match.params.flowBinderId);
		let flowBinder = this.context.store.getState().flowBinders.find(
			f => f.id === id);
		if(flowBinder === undefined) {
			flowBinder = new FlowBinder();
			flowBinder.content = {};
		}
		this.state = {flowBinder};
	}
	onSubmit(event) {
		event.preventDefault();
		const flowBinderContent = new FlowBinderContent();
		const form = event.target;
		for(let i = 0; i < form.length; i++) {
			if(form[i] === undefined) continue;
			switch(form[i].name) {
			case "name":
				flowBinderContent.name = form[i].value;
				break;
			case "description":
				flowBinderContent.description = form[i].value;
				break;
			case "format":
				flowBinderContent.format = form[i].value;
				break;
			case "packaging":
				flowBinderContent.packaging = form[i].value;
				break;
			case "charset":
				flowBinderContent.charset = form[i].value;
				break;
			case "destination":
				flowBinderContent.destination = form[i].value;
				break;
			case "priority":
				flowBinderContent.priority = form[i].value;
				break;
			case "record-splitter":
				flowBinderContent.recordSplitter = form[i].value;
				break;
			case "flow":
				flowBinderContent.flowId = form[i].value;
				break;
			case "sink":
				flowBinderContent.sinkId = form[i].value;
				break;
			case "submitters":
				flowBinderContent.submitterIds = [];
				for(let j = 0; j < form[i].length; j++) {
					flowBinderContent.submitterIds.push(form[i][j].value);
				}
				break;
			default:
				break;
			}
		}
		flowBinderContent.save();
	}
	onDelete() {
		this.state.flowBinder.delete();
	}
	render() {
		const flowHashMap = new Map();
		const flows = this.context.store.getState().flowBinders.map(f =>
			f.content.flow
		).filter(item => flowHashMap.has(item.id) ?
			false : (flowHashMap.set(item.id))
		);
		const sinkHashMap = new Map();
		const sinks = this.context.store.getState().flowBinders.map(f =>
			f.content.sink
		).filter(item => sinkHashMap.has(item.id) ?
			false : (sinkHashMap.set(item.id))
		);
		return (
			<form onSubmit={this.onSubmit.bind(this)}>
				<div className="form-group">
					<label htmlFor="name:">name</label>
					<input type="text" name="name" defaultValue={this.state.flowBinder.content.name}/>
				</div>
				<div className="form-group">
					<label htmlFor="description:">description</label>
					<input type="text" name="description" defaultValue={this.state.flowBinder.content.description}/>
				</div>
				<div className="form-group">
					<label htmlFor="format:">format</label>
					<input type="text" name="format" defaultValue={this.state.flowBinder.content.format}/>
				</div>
				<div className="form-group">
					<label htmlFor="packaging:">packaging</label>
					<input type="text" name="packaging" defaultValue={this.state.flowBinder.content.packaging}/>
				</div>
				<div className="form-group">
					<label htmlFor="charset:">charset</label>
					<input type="text" name="charset" defaultValue={this.state.flowBinder.content.charset}/>
				</div>
				<div className="form-group">
					<label htmlFor="destination:">destination</label>
					<input type="text" name="destination" defaultValue={this.state.flowBinder.content.destination}/>
				</div>
				<div className="form-group">
					<label htmlFor="priority:">priority</label>
					<select name="priority">
						<option value="1">low</option>
						<option value="2">mid</option>
						<option value="3">high</option>
					</select>
				</div>
				<RecordSplitterSelect recordSplitter={this.state.flowBinder.content.recordSplitter}/>
				<SubmittersView withLabel={true} submitterIds={this.state.flowBinder.content.submitterIds}/>
				<FlowSelect allFlows={flows} flow={this.state.flowBinder.content.flow}/>
				<SinkSelect allSinks={sinks} sink={this.state.flowBinder.content.sink}/>
				<div>
					<input type="submit" value="save"/>
					<input type="button" value="delete" onClick={this.onDelete.bind(this)}/>
				</div>
			</form>
		)
	}
}

FlowBinderEdit.contextTypes = {
	store: PropTypes.object.isRequired
};

export default FlowBinderEdit;
