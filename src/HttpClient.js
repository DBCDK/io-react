import request from "superagent";

import Path from "./utils";

// https://visionmedia.github.io/superagent/

class HttpClient {
    constructor() {
        this.data = null;
        this.headers = {};
        this.query = {};
        this.method = "GET";
    }
    add_headers(headers) {
        this.headers = this._add_headers(headers, this.headers);
        return this;
    }
    with_data(data) {
        this.data = data;
        return this;
    }
    with_method(method) {
        this.method = method;
        return this;
    }
    withQuery(query) {
        this.query = query;
        return this;
    }
    get(request_url, pathParams, queryObject) {
        this.method = "GET";
        return this.url_open(request_url, pathParams, queryObject);
    }
    post(request_url, pathParams, queryObject) {
        this.method = "POST";
        return this.url_open(request_url, pathParams, queryObject);
    }
    delete(requestUrl, pathParams, queryObject) {
        this.method = "DELETE";
        return this.url_open(requestUrl, pathParams, queryObject);
    }
    url_open(request_url, pathParams, queryObject) {
        let options = {
            url: request_url,
            method: this.method,
            headers: this.headers
        };
        const path = new Path(request_url);
        if(pathParams !== null && pathParams !== undefined) {
            pathParams.forEach((value, key) => path.bind(key, value));
        }
        options.url = path.path;
        if(queryObject !== null && queryObject !== undefined) {
            this.withQuery(queryObject);
        }
        return this._make_request(options);
    }
    _add_headers(src_headers, dest_headers) {
        const headers = Object.assign({}, dest_headers);
        for(let key in src_headers) {
            if(src_headers.hasOwnProperty(key)) {
                headers[key] = src_headers[key];
            }
        }
        return headers;
    }
    _make_request(options) {
        return new Promise((resolves, rejects) => {
            const req = request(this.method, options.url)
                .query(this.query)
                .set(this.headers);
            if(this.method === "POST" && this.data !== null) {
                req.send(this.data);
            }
            req.end((err, res) => {
                if(err === null) {
                    resolves(res.text);
                } else {
                    rejects(err);
                }
            });
        })
    }
}

export default HttpClient;
