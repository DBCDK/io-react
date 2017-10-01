import React from "react";

import HttpClient from "../HttpClient";
import Path from "../utils";

class BaseList {
	static getBaseListStateObject() {
		return {
			items: [],
			count: 0,
			limit: 50,
			offset: 0
		};
	}
	static getSingleItem(endpoint, pathParams) {
		const path = new Path(endpoint);
		if(pathParams !== null) {
			pathParams.forEach((value, key) => path.bind(key, value));
		}
		return new HttpClient().get(path.path);
	}
	static getItems(endpoint, pathParams, queryObject) {
		const path = new Path(endpoint);
		if(pathParams !== null) {
			pathParams.forEach((value, key) => path.bind(key, value));
		}
		return new HttpClient().withQuery(queryObject)
			.get(path.path);
	}
	static mapItemsFromJson(type, itemListJson) {
		const js = JSON.parse(itemListJson);
		return js.map(item => type.fromJson(item));
	}
}

export default BaseList;
