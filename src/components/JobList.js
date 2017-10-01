import React from "react";
import {Link} from "react-router-dom";

import BaseList from "../model/BaseList";
import Constants from "../Constants";
import DateTime from "../util/DateTime";
import Job from "../model/Job";
import Pager from "./Pager";

const mapJobStatusToIcon = function(status) {
	switch(status) {
	case Job.Status.DONE_WITHOUT_ERRORS:
		return "💙";
	case Job.Status.DONE_WITH_ERRORS:
		return "🔥";
	case Job.Status.NOT_DONE:
		return "🍆";
	case Job.Status.PREVIEW:
		return "🐵";
	default:
		throw new TypeError(`unknown status: ${status}`);
	}
}

class JobElement extends React.Component {
	render() {
		const path = `/jobinfo/${this.props.job.jobId}`;
		const dateStr = DateTime.strDateFromMillis(this.props.job.timeOfCreation);
		const status = mapJobStatusToIcon(this.props.job.status());
		return (
			<tr className="job-element">
				<td>{this.props.job.jobId}</td>
				<td>{dateStr}</td>
				<td>{this.props.job.numberOfItems}</td>
				<td>{this.props.job.state.failedItems()}</td>
				<td>{this.props.job.state.ignoredItems()}</td>
				<td>
					<Link to={path}>info</Link>
				</td>
				<td className="status-icon">{status}</td>
			</tr>
		)
	}
}

class JobList extends React.Component {
	constructor(props) {
		super(props);
		this.state = BaseList.getBaseListStateObject();
	}
	componentWillMount() {
		BaseList.getSingleItem(Constants.jobsCountEndpoint, null).then(json =>
			this.setState({count: parseInt(json)})
		);
		this.updateJobList();
	}
	updateJobList() {
		const query = {limit: this.state.limit, offset: this.state.offset};
		BaseList.getItems(Constants.jobsListEndpoint, null, query).then(json =>
			this.setState({items: BaseList.mapItemsFromJson(Job, json)})
		);
	}
	onBackClicked() {
		if(this.state.offset >= this.state.limit) {
			this.state.offset -= this.state.limit;
			this.setState({offset: this.state.offset});
			this.updateJobList();
		}
	}
	onForwardClicked() {
		if((this.state.offset + this.state.limit) < this.state.count) {
			this.state.offset += this.state.limit;
			this.setState({offset: this.state.offset});
			this.updateJobList();
		}
	}
	onBeginningClicked() {
		this.state.offset = 0;
		this.setState({offset: this.state.offset});
		this.updateJobList();
	}
	onEndClicked() {
		if((this.state.offset + this.state.limit) < this.state.count) {
			this.state.offset = this.state.count - this.state.limit;
			this.setState({offset: this.state.offset});
			this.updateJobList();
		}
	}
	render() {
		return (
			<div>
				<h1>jobs</h1>
				<Pager pos={this.state.offset} interval={this.state.limit} total={this.state.count} onBackClicked={this.onBackClicked.bind(this)} onForwardClicked={this.onForwardClicked.bind(this)} onBeginningClicked={this.onBeginningClicked.bind(this)} onEndClicked={this.onEndClicked.bind(this)}/>
				{/* class="table" is defined by bootstrap css*/}
				<table className="table job-list">
					<thead>
						<tr>
							<th>id</th>
							<th>created</th>
							<th>items</th>
							<th>failed</th>
							<th>ignored</th>
							<th/>
							<th>status</th>
						</tr>
					</thead>
					<tbody>
					{
						this.state.items.map((job, i) => <JobElement key={i} job={job} />)
					}
					</tbody>
				</table>
			</div>
		);
	}
}

export default JobList;
