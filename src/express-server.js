import Express from "express";
import {Server} from "http";
import path from "path";

import Constants from "./Constants";
import StoresConnector from "./StoresConnector";

// start with ./node_modules/.bin/babel-node --presets react,es2015 src/express-server.js

const app = new Express();
const server = new Server(app);
app.use(Express.static(path.join(__dirname, "static")));

// https://expressjs.com/en/4x/api.html

app.get(Constants.jobsListEndpoint, (req, res) => {
	const limit = req.query.limit !== undefined ? req.query.limit : 0;
	const offset = req.query.offset !== undefined ? req.query.offset : 0;
	StoresConnector.listJobs(limit, offset, json => {
		res.status(200).send(json);
	});
});

app.get(Constants.jobsCountEndpoint, (req, res) => {
	StoresConnector.countJobs(json => {
		res.status(200).send(json);
	});
});

app.get(Constants.itemsListEndpoint, (req, res) => {
	const limit = req.query.limit !== undefined ? req.query.limit : 0;
	const offset = req.query.offset !== undefined ? req.query.offset : 0;
	StoresConnector.listItems(req.params.jobId, limit, offset, json =>
		res.status(200).send(json));
});

app.get(Constants.itemsCountEndpoint, (req, res) => {
	StoresConnector.countItems(req.params.jobId, json => res.status(200).send(json));
});

app.get(Constants.itemJavascriptLogEndpoint, (req, res) => {
	StoresConnector.getJavascriptLog(req.params.jobId, req.params.chunkId,
		req.params.itemId, log => res.status(200).send(log));
});

app.get(Constants.chunkItemEndpoint, (req, res) => {
	StoresConnector.getChunkItem(req.params.jobId, req.params.chunkId,
		req.params.itemId, req.params.phase, chunkItem => res.status(200)
			.send(chunkItem));
});

app.get(Constants.flowBindersEndpoint, (req, res) => {
	StoresConnector.getFlowBinders(json => res.status(200).send(json));
});

app.get(Constants.flowsEndpoint, (req, res) => {
	StoresConnector.getFlow(req.params.flowId, json =>
		res.status(200).send(json)
	);
});

app.get(Constants.sinksEndpoint, (req, res) => {
	StoresConnector.getSink(req.params.sinkId, json =>
		res.status(200).send(json)
	);
});

// handle the rest of the routing in the client
app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname, "/static/index.html"));
});

const port = process.env.port || 3000;

server.listen(port, err => {
	if(err) {
		return console.error(err);
	}
	console.info(`server listening on port ${port}`);
});
