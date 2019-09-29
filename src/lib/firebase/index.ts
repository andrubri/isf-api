import { IServerConfigurations} from '../../configurations';
import * as firebase from "firebase-admin";

export default class FirebaseAdmin {
    private static ctrFirebase = null;
    constructor(configs: IServerConfigurations){
        console.log("--------- Existe");
        FirebaseAdmin.set(firebase.initializeApp({
            credential: firebase.credential.cert(configs.firebase),
            databaseURL: "https://databaseName.firebaseio.com"
        }));
    }

    static get(){
        return this.ctrFirebase;
    }

    private static set(firebaseInit: any){
        this.ctrFirebase = firebaseInit;
    }

}
