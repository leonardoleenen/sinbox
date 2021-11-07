import { initializeApp } from 'firebase/app'
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite'
import '@firebase/firestore'

class FirebaseManager {
    private firebaseApp: any

    constructor() {
        if (process.env.FIREBASE_CONFIG) {
            this.firebaseApp = initializeApp(
                JSON.parse(
                    Buffer.from(
                        process.env.FIREBASE as string,
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
