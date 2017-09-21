import request from "superagent";

// https://visionmedia.github.io/superagent/

class HttpClient {
    constructor() {
        this.callback = null;
        this.data = null;
        this.headers = {};
        this.query = {};
        this.method = "GET";
    }
    add_headers(headers) {
        this.headers = this._add_headers(headers, this.headers);
        return this;
    }
    with_callback(callback) {
        this.callback = callback;
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
        this.url_open(request_url);
    }
    post(request_url) {
        this.method = "POST";
        this.url_open(request_url);
    }
    url_open(request_url) {
        let options = {
            url: request_url,
            method: this.method,
            headers: this.headers
        };
        this._make_request(options);
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
        const req = request(this.method, options.url)
            .query(this.query)
            .set(this.headers);
        if(this.method === "POST" && this.data !== null) {
            req.send(this.data);
        }
        req.end((err, res) => {
            if(res !== undefined) {
                this.callback(res.text, err);
            } else {
                this.callback(null, err);
                console.error(err);
            }
        });
    }
}

export default HttpClient;
