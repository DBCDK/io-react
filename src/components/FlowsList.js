import React from "react";
import {Link} from "react-router-dom";

import BaseList from "../model/BaseList";
import Constants from "../Constants";
import Flow from "../model/Flow";

class FlowElement extends React.Component {
	showFlowComponentInfo() {
		return "flowcomponent";
	}
	render() {
		const editPath = `/flows/${this.props.flow.id}/edit`;
		return (
			<tr>
				<td>{this.props.flow.content.name}</td>
				<td>{this.props.flow.content.description}</td>
				<td>{this.showFlowComponentInfo()}</td>
				<td>{this.props.flow.content.timeOfFlowComponentUpdate}</td>
				<td/>
				<td><Link to={editPath}>edit</Link></td>
			</tr>
		)
	}
}

class FlowsList extends React.Component {
	constructor(props) {
		super(props);
		this.state = BaseList.getBaseListStateObject();
	}
	componentWillMount() {
		BaseList.getItems(Constants.flowsEndpoint, null, {}).then(json =>
			this.setState({items: BaseList.mapItemsFromJson(Flow, json)})
		);
	}
	render() {
		return (
			<div>
				<table className="table">
					<thead>
						<tr>
							<th>name</th>
							<th>description</th>
							<th>components</th>
							<th>latest update</th>
							<th/>
							<th/>
						</tr>
					</thead>
					<tbody>
					{
						this.state.items.map((flow, i) => <FlowElement key={i} flow={flow}/>)
					}
					</tbody>
				</table>
			</div>
		)
	}
}

export default FlowsList;
