import {expect} from "chai";

import AddiRecord from "../../src/model/AddiRecord";

describe("AddiRecord object", () => {
	it("constructor", () => {
		const data = "9\nspongebob\n7\npatrick\n";
		const addiRecord = new AddiRecord(data, "utf8", "utf8");
		expect(addiRecord.metadata).to.equal("spongebob")
		expect(addiRecord.data).to.equal("patrick");
	});

	it("data without final newline", () => {
		const data = "9\nchristian\n9\nanastasia";
		const addiRecord = new AddiRecord(data, "utf8", "utf8");
		expect(addiRecord.metadata).to.equal("christian");
		expect(addiRecord.data).to.equal("anastasia");
	});

	it("base64 data", () => {
		const data = "OQpzcG9uZ2Vib2IKNwpwYXRyaWNrCg==";
		const addiRecord = new AddiRecord(data, "utf8", "base64");
		expect(addiRecord.metadata).to.equal("spongebob");
		expect(addiRecord.data).to.equal("patrick");
	});

	it("json to string", () => {
		const data = "24\n{\"name\": \"eugene krabs\"}\n0";
		const addiRecord = new AddiRecord(data, "utf8", "utf8");
		const jsonString = addiRecord.prettify(addiRecord.metadata);
		const expectedOutput = "{\n  \"name\": \"eugene krabs\"\n}";
		expect(jsonString).to.equal(expectedOutput);
	});

	it("xml to string", () => {
		const data = "95\n<friends><friend><name>spongebob</name></friend>" +
			"<friend><name>patrick</name></friend></friends>\n0";
		const addiRecord = new AddiRecord(data, "utf8", "utf8");
		const xmlString = addiRecord.prettify(addiRecord.metadata);
		const expectedOutput = "<friends>\n<friend>\n<name>spongebob</name>\n" +
			"</friend>\n<friend>\n<name>patrick</name>\n</friend>\n</friends>";
		expect(xmlString).to.equal(expectedOutput);
	});
});
