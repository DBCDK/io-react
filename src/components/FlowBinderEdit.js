import React from "react";
import PropTypes from "prop-types";

import FlowBinder from "../model/FlowBinder";
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
	render() {
		const id = Number.parseInt(this.props.match.params.flowBinderId);
		let flowBinder = this.context.store.getState().flowBinders.find(
			f => f.id === id);
		if(flowBinder === undefined) {
			flowBinder = new FlowBinder();
			flowBinder.content = {};
		}
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
			<form>
				<div className="form-group">
					<label htmlFor="name:">name</label>
					<input type="text" name="name" defaultValue={flowBinder.content.name}/>
				</div>
				<div className="form-group">
					<label htmlFor="description:">description</label>
					<input type="text" name="description" defaultValue={flowBinder.content.description}/>
				</div>
				<div className="form-group">
					<label htmlFor="format:">format</label>
					<input type="text" name="format" defaultValue={flowBinder.content.format}/>
				</div>
				<div className="form-group">
					<label htmlFor="packaging:">packaging</label>
					<input type="text" name="packaging" defaultValue={flowBinder.content.packaging}/>
				</div>
				<div className="form-group">
					<label htmlFor="charset:">charset</label>
					<input type="text" name="charset" defaultValue={flowBinder.content.charset}/>
				</div>
				<div className="form-group">
					<label htmlFor="destination:">destination</label>
					<input type="text" name="destination" defaultValue={flowBinder.content.destination}/>
				</div>
				<div className="form-group">
					<label htmlFor="priority:">priority</label>
					<select name="priority">
						<option value="1">low</option>
						<option value="2">mid</option>
						<option value="3">high</option>
					</select>
				</div>
				<RecordSplitterSelect recordSplitter={flowBinder.content.recordSplitter}/>
				<SubmittersView withLabel={true} flowBinderId={flowBinder.id}/>
				<FlowSelect allFlows={flows} flow={flowBinder.content.flow}/>
				<SinkSelect allSinks={sinks} sink={flowBinder.content.sink}/>
				<input type="submit" value="save"/>
			</form>
		)
	}
}

FlowBinderEdit.contextTypes = {
	store: PropTypes.object.isRequired
};

export default FlowBinderEdit;
