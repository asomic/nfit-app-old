export class Auth {
    /** public variables to be accessed from the outside */
    constructor(
        public _email: string,
        public _token: string,
        public _refreshToken: string,
        public _tokenExpirationDate: string,
        public _domain: string,
        public _header: any
    ) {}


    get token() {
        if ( !this._tokenExpirationDate) {
            return null;
        }
        return this._token;
    }

    get refreshToken() {
        if ( !this._refreshToken) {
            return null;
        }
        return this._refreshToken;
    }

    get domain() {
        if ( !this._domain ) {
            return null;
        }
        return this._domain;
    }

    get header() {
        if ( !this._header ) {
            return null;
        }
        return this._header;
    }

    get email() {
        if ( !this.email ) {
            return null;
        }
        return this.email;
    }
}
