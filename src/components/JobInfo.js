import React from "react";

import Constants from "../Constants";
import HttpClient from "../HttpClient";
import Item from "../model/Item";
import ItemInfo from "./ItemInfo";
import Listener from "../Listener";
import Pager from "./Pager";
import Path from "../utils";

const getItems = function(itemListJson) {
	const js = JSON.parse(itemListJson);
	const items = [];
	for(let i = 0; i < js.length; i++) {
		const item = Item.fromJson(js[i]);
		items.push(item);
	}
	return items;
}

class CurrentItemListener extends Listener {
	onCurrentItemChanged(item) {
		for(let i = 0; i < this.listeners.length; i++) {
			this.listeners[i].onCurrentItemChanged(item);
		}
	}
}

class ItemElement extends React.Component {
	constructor(props) {
		super(props);
	}
	onClick({target}) {
		this.props.currentItemListener.onCurrentItemChanged(this.props.item);
	}
	render() {
		const id = (this.props.item.recordInfo !== null ?
			this.props.item.recordInfo.id : "");
		return (
			<tr onClick={this.onClick.bind(this)}>
				<td>{this.props.item.itemNumber}</td>
				<td>{id}</td>
				<td>{this.props.item.state.status()}</td>
			</tr>
		)
	}
}

class JobInfo extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			items: [],
			itemCount: 0,
			limit: 50,
			offset: 0,
			currentItemListener: new CurrentItemListener()
		};
	}
	componentWillMount() {
		const path = new Path(Constants.itemsCountEndpoint);
		path.bind("jobId", this.props.match.params.jobId);
		new HttpClient().with_callback(json =>
			this.setState({itemCount: parseInt(json)}))
			.get(path.path);
		this.updateItemList();
	}
	updateItemList() {
		const path = new Path(Constants.itemsListEndpoint);
		path.bind("jobId", this.props.match.params.jobId);
		new HttpClient().with_callback(
			json => {
				this.setState({items: getItems(json)});
				if(this.state.items.length > 0) {
					this.state.currentItemListener.onCurrentItemChanged(this.state.items[0]);
				}
			})
		.withQuery({limit: this.state.limit, offset: this.state.offset})
		.get(path.path);
	}
	// TODO: duplicate code in JobList.js
	onBackClicked() {
		if(this.state.offset >= this.state.limit) {
			this.state.offset -= this.state.limit;
			this.setState({offset: this.state.offset});
			this.updateItemList();
		}
	}
	onForwardClicked() {
		if((this.state.offset + this.state.limit) < this.state.itemCount) {
			this.state.offset += this.state.limit;
			this.setState({offset: this.state.offset});
			this.updateItemList();
		}
	}
	onBeginningClicked() {
		this.state.offset = 0;
		this.setState({offset: this.state.offset});
		this.updateItemList();
	}
	onEndClicked() {
		if((this.state.offset + this.state.limit) < this.state.itemCount) {
			this.state.offset = this.state.itemCount - this.state.limit;
			this.setState({offset: this.state.offset});
			this.updateItemList();
		}
	}
	render() {
		return (
			<div>
				{/*match contains path params*/}
				<h1>job: {this.props.match.params.jobId}</h1>
				<Pager pos={this.state.offset} interval={this.state.limit} total={this.state.itemCount} onBackClicked={this.onBackClicked.bind(this)} onForwardClicked={this.onForwardClicked.bind(this)} onBeginningClicked={this.onBeginningClicked.bind(this)} onEndClicked={this.onEndClicked.bind(this)}/>
				<div id="items-list">
					<table className="table">
						<thead>
							<tr>
								<th>number</th>
								<th>id</th>
								<th>status</th>
							</tr>
						</thead>
						<tbody>
						{
							this.state.items.map((item, i) => <ItemElement key={i} currentItemListener={this.state.currentItemListener} item={item} />)
						}
						</tbody>
					</table>
				</div>
				<div id="item-info">
					<ItemInfo currentItemListener={this.state.currentItemListener}/>
				</div>
			</div>
		);
	}
}

export default JobInfo;
