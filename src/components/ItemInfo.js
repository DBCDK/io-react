import React from "react";

import AddiRecord from "../model/AddiRecord";
import ChunkItem from "../model/ChunkItem";
import Constants from "../Constants";
import HttpClient from "../HttpClient";
import Listener from "../Listener";
import Path from "../utils";
import State from "../model/State";

const addiRecordFromChunkItem = function(chunkItemJson, encoding) {
	const json = JSON.parse(chunkItemJson);
	const chunkItem = ChunkItem.fromJson(json);
	return new AddiRecord(chunkItem.data, chunkItem.encoding, encoding);
}

class ItemContentListener extends Listener {
	onItemContentChanged(type, content) {
		for(let i = 0; i < this.listeners.length; i++) {
			this.listeners[i].onItemContentChanged(type, content);
		}
	}
}

class TabChangeListener extends Listener {
	onTabChanged(type) {
		for(let i = 0; i < this.listeners.length; i++) {
			this.listeners[i].onTabChanged(type);
		}
	}
}

class ItemTabContent extends React.Component {
	constructor(props) {
		super(props);
		props.contentListener.addListener(this);
		props.tabChangeListener.addListener(this);

		/*
		* because javascript converts keys set in an object contructor
		* ({}) as strings, you cannot use variables as keys directly,
		* only after the object has been instantiated.
		*/
		const content = {};
		content[ItemInfo.TYPES.JAVASCRIPT_LOG] = "";
		content[ItemInfo.TYPES.INPUT_RECORD] = "";
		content[ItemInfo.TYPES.OUTPUT_RECORD] = "";
		content[ItemInfo.TYPES.SINK_RESULT] = "";
		// TODO: next + diagnostics + fatal

		this.state = {
			currentTab: ItemInfo.TYPES.JAVASCRIPT_LOG,
			content: content
		};
	}
	onItemContentChanged(type, content) {
		this.state.content[type] = content;
		this.setState({content: this.state.content});
	}
	onTabChanged(type) {
		this.setState({currentTab: type})
	}
	render() {
		return (
			<div>
				<p>{this.state.content[this.state.currentTab]}</p>
			</div>
		)
	}
}

class ItemInfoEntry extends React.Component {
	constructor(props) {
		super(props);
		this.state = {type: this.props.type};
	}
	onClick() {
		this.props.onClick(this);
	}
	render() {
		return (
			<li onClick={this.onClick.bind(this)}><button>{this.props.name}</button></li>
		)
	}
}

class ItemInfo extends React.Component {
	constructor(props) {
		super(props);
		this.props.currentItemListener.addListener(this);
		this.state = {
			itemContentChangeListener: new ItemContentListener(),
			tabChangeListener: new TabChangeListener()
		}
	}
	getJavascriptLog(item, callback) {
		const path = new Path(Constants.itemJavascriptLogEndpoint);
		path.bind("jobId", item.jobId);
		path.bind("chunkId", item.chunkId);
		path.bind("itemId", item.id);
		new HttpClient().with_callback(callback)
			.get(path.path);
	}
	getChunkItem(item, phase, callback) {
		const path = new Path(Constants.chunkItemEndpoint);
		path.bind("jobId", item.jobId);
		path.bind("chunkId", item.chunkId);
		path.bind("itemId", item.id);
		path.bind("phase", phase);
		new HttpClient().with_callback(callback)
			.get(path.path);
	}
	onCurrentItemChanged(item) {
		this.getJavascriptLog(item, log => {
			this.state.itemContentChangeListener.onItemContentChanged(
				ItemInfo.TYPES.JAVASCRIPT_LOG, log);
		});
		this.getChunkItem(item, State.LIFECYCLE.PARTITIONING, json => {
			const addiRecord = addiRecordFromChunkItem(json, "base64");
			this.state.itemContentChangeListener.onItemContentChanged(
				ItemInfo.TYPES.INPUT_RECORD, addiRecord.toString("utf8"));
		});
		this.getChunkItem(item, State.LIFECYCLE.PROCESSING, json => {
			const addiRecord = addiRecordFromChunkItem(json, "base64");
			this.state.itemContentChangeListener.onItemContentChanged(
			ItemInfo.TYPES.OUTPUT_RECORD, addiRecord.toString("utf8"));
		});
		this.getChunkItem(item, State.LIFECYCLE.DELIVERING, json => {
			const addiRecord = addiRecordFromChunkItem(json, "base64");
			this.state.itemContentChangeListener.onItemContentChanged(
			ItemInfo.TYPES.SINK_RESULT, addiRecord.toString("utf8"));
		});
	}
	onContentChange(target) {
		this.state.tabChangeListener.onTabChanged(target.state.type);
	}
	render() {
		return (
			<div>
				<ul className="nav nav-tabs">
					<ItemInfoEntry onClick={this.onContentChange.bind(this)} name="javascript log" type={ItemInfo.TYPES.JAVASCRIPT_LOG}/>
					<ItemInfoEntry onClick={this.onContentChange.bind(this)} name="input record" type={ItemInfo.TYPES.INPUT_RECORD}/>
					<ItemInfoEntry onClick={this.onContentChange.bind(this)} name="output record" type={ItemInfo.TYPES.OUTPUT_RECORD}/>
					<ItemInfoEntry onClick={this.onContentChange.bind(this)} name="sink result" type={ItemInfo.TYPES.SINK_RESULT}/>
				</ul>
				<ItemTabContent contentListener={this.state.itemContentChangeListener} tabChangeListener={this.state.tabChangeListener}/>
			</div>
		)
	}
}

ItemInfo.TYPES = {
	JAVASCRIPT_LOG: "JAVASCRIPT_LOG",
	INPUT_RECORD: "INPUT_RECORD",
	OUTPUT_RECORD: "OUTPUT_RECORD",
	SINK_RESULT: "SINK_RESULT"
};

export default ItemInfo;
