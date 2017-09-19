class FlowStoreReference {
	static fromJson(json) {
		const reference = new this();
		reference.id = json.id;
		reference.version = json.version;
		reference.name = json.name;
		return reference;
	}
}

class FlowStoreReferences {
	static fromJson(json) {
		const references = new this();
		for(let i = 0; i < FlowStoreReferences.Elements.length; i++) {
			const element = FlowStoreReferences.Elements[i];
			if(json[element]) {
				references[element] = FlowStoreReference
					.fromJson(json[element]);
			}
		}
		return references;
	}
}

FlowStoreReferences.Elements = [
	"FLOW_BINDER",
	"FLOW",
	"SUBMITTER",
	"SINK"
];

export default FlowStoreReferences;
