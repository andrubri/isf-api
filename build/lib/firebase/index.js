"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const firebase = require("firebase-admin");
class FirebaseAdmin {
    constructor(configs) {
        console.log("--------- Existe");
        FirebaseAdmin.set(firebase.initializeApp({
            credential: firebase.credential.cert(configs.firebase),
            databaseURL: "https://databaseName.firebaseio.com"
        }));
    }
    static get() {
        return this.ctrFirebase;
    }
    static set(firebaseInit) {
        this.ctrFirebase = firebaseInit;
    }
}
FirebaseAdmin.ctrFirebase = null;
exports.default = FirebaseAdmin;
//# sourceMappingURL=index.js.map