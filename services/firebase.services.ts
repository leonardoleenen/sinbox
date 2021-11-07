import { initializeApp } from 'firebase/app'
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite'
import '@firebase/firestore'

class FirebaseManager {
    /* private firebaseConfig = JSON.parse(
        Buffer.from(process.env.FIREBASE_CONFIG as string, 'base64').toString()
    ) */

    private firebaseApp: any

    constructor() {
        /* if (!firebase.apps.length) {
            this.firebaseApp = firebase.initializeApp(this.firebaseConfig)
        } else {
            this.firebaseApp = firebase.app() // if already initialized, use that one
        } */

        if (process.env.FIREBASE_CONFIG) {
            this.firebaseApp = initializeApp(
                JSON.parse(
                    Buffer.from(
                        process.env.FIREBASE_CONFIG as string,
                        'base64'
                    ).toString()
                )
            )
        } else {
            console.log('vacio')
        }
    }

    getDB() {
        return getFirestore(this.firebaseApp)
    }

    getFirebaseApp() {
        return this.firebaseApp
    }
}

export const firebaseManager = new FirebaseManager()
