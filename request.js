'use strict'

class RequestData {
    constructor( dataBody ) {
        this.headers = dataBody.headers;
        this.method = dataBody.method
        this.url = dataBody.url;
        this.cookies = dataBody.cookies;
        this.body = dataBody.body;
        this.query = dataBody.query;
        this.data = false;
        this.getDataReq();
    }

    /**
     *  Create data by req method
     */
    getDataReq() {
        if ( this.method === 'GET' ) {
            const indexStr = this.url.indexOf( 'test=?' );

            if ( indexStr !== -1 ) {
                this.data = {
                    test: this.url.slice( indexStr + 6 ).replace( /[^a-zа-яё]/gi, '' ),
                    diff: this.url.slice( -1 ),
                };
            }
        } else if ( this.method === 'POST' ) {
            this.data = this.body; // TODO need creating parse method body
        }
    }
}

module.exports = RequestData