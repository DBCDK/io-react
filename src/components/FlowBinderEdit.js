import React from "react";

import RecordSplitterConstants from "../model/RecordSplitterConstants";
import SubmittersView from "./SubmittersView";

class BaseSelect extends React.Component {
	render() {
		return (
			<div className="form-group">
				<label htmlFor={this.props.name}>{this.props.value}</label>
				<select name={this.props.name}>
					{this.props.children}
				</select>
			</div>
		)
	}
}

class FlowSelect extends React.Component {
	render() {
		return (
			<BaseSelect name="flow" value="flow"/>
		)
	}
}

class SinkSelect extends React.Component {
	render() {
		return (
			<BaseSelect name="sink" value="sink"/>
		)
	}
}

class RecordSplitterSelect extends React.Component {
	render() {
		return (
			<BaseSelect name="record-splitter" value="record splitter">
			{
				Object.keys(RecordSplitterConstants).map((key, i) => <option key={i} value={RecordSplitterConstants[key]}>{RecordSplitterConstants[key]}</option>)
			}
			</BaseSelect>
		)
	}
}

class FlowBinderEdit extends React.Component {
	render() {
		return (
			<form>
				<div className="form-group">
					<label htmlFor="name:">name</label>
					<input type="text" name="name"/>
				</div>
				<div className="form-group">
					<label htmlFor="description:">description</label>
					<input type="text" name="description"/>
				</div>
				<div className="form-group">
					<label htmlFor="format:">format</label>
					<input type="text" name="format"/>
				</div>
				<div className="form-group">
					<label htmlFor="packaging:">packaging</label>
					<input type="text" name="packaging"/>
				</div>
				<div className="form-group">
					<label htmlFor="charset:">charset</label>
					<input type="text" name="charset"/>
				</div>
				<div className="form-group">
					<label htmlFor="destination:">destination</label>
					<input type="text" name="destination"/>
				</div>
				<div className="form-group">
					<label htmlFor="priority:">priority</label>
					<select name="priority">
						<option value="1">low</option>
						<option value="2">mid</option>
						<option value="3">high</option>
					</select>
				</div>
				<RecordSplitterSelect/>
				<SubmittersView/>
				<FlowSelect/>
				<SinkSelect/>
				<input type="submit" value="save"/>
			</form>
		)
	}
}

export default FlowBinderEdit;
