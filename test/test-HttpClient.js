import nock from "nock";
import {expect} from "chai";

import HttpClient from "../src/HttpClient";

const TEST_URL = "http://dataio.dbc.dk";

describe("HttpClient object", () => {
	it("constructor", () => {
		const httpClient = new HttpClient()
			.add_headers({"Content-type": "application/json",
				"If-Match": "1"})
			.with_data({"name": "spongebob"})
			.with_method("DELETE")
			.withQuery({"hometown": "bikini+bottom"});
		expect(httpClient.headers).to.deep.equal(
			{"Content-type": "application/json", "If-Match": "1"
		});
		expect(httpClient.data).to.deep.equal({"name": "spongebob"});
		expect(httpClient.method).to.equal("DELETE");
		expect(httpClient.query).to.deep.equal({"hometown": "bikini+bottom"});
	});
});

describe("HttpClient requests", () => {
	it("successful get request", () => {
		nock(TEST_URL).get("/version/10").reply(200, "success");
		const params = new Map();
		params.set("version", 10);
		return new HttpClient().get(TEST_URL + "/version/:version", params)
				.then(res =>
			expect(res).to.equal("success")
		);
	});

	it("failing get request", () => {
		nock(TEST_URL).get("/").reply(500);
		return new HttpClient().get(TEST_URL).catch(res =>
			expect(res.status).to.equal(500)
		);
	});

	it("successful post request", () => {
		nock(TEST_URL).post("/").reply(200, "success");
		return new HttpClient().post(TEST_URL).then(res =>
			expect(res).to.equal("success")
		);
	});

	it("failing post request", () => {
		nock(TEST_URL).post("/").reply(500);
		return new HttpClient().post(TEST_URL).catch(res =>
			expect(res.status).to.equal(500)
		);
	});

	it("successful delete request", () => {
		nock(TEST_URL).delete("/").reply(200, "success");
		return new HttpClient().delete(TEST_URL).then(res =>
			expect(res).to.equal("success")
		);
	});

	it("failing delete request", () => {
		nock(TEST_URL).delete("/").reply(500);
		return new HttpClient().delete(TEST_URL).catch(res =>
			expect(res.status).to.equal(500)
		);
	});

	it("successful url_open", () => {
		nock(TEST_URL, {"User-Agent": "spongebrowser"}).post("/version/3")
			.query({"boss": "eugene+krabs"})
			.reply(200, "success");
		const params = new Map();
		params.set("version", 3);
		const httpClient = new HttpClient()
			.with_method("POST")
			.add_headers({"User-Agent": "spongebrowser"})
			.withQuery({"boss": "eugene+krabs"});
		return httpClient.url_open(TEST_URL + "/version/:version", params)
				.then(res =>
			expect(res).to.equal("success")
		);
	});
});
