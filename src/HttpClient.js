import request from "superagent";

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
    get(request_url) {
        this.method = "GET";
        return this.url_open(request_url);
    }
    post(request_url) {
        this.method = "POST";
        return this.url_open(request_url);
    }
    url_open(request_url) {
        let options = {
            url: request_url,
            method: this.method,
            headers: this.headers
        };
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
