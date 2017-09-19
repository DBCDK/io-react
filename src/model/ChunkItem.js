class ChunkItem {
	static fromJson(json) {
		const chunkItem = new this();
		chunkItem.id = json.id;
		chunkItem.data = json.data;
		chunkItem.status = json.status;
		chunkItem.type = json.type;
		chunkItem.encoding = json.encoding;
		chunkItem.trackingId = json.trackingId;
		return chunkItem;
	}
}

export default ChunkItem;
