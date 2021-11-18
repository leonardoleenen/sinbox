import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import '@firebase/firestore'

class FirebaseManager {
    private firebaseApp: any

    constructor() {
        if (process.env.FIREBASE) {
            this.firebaseApp = initializeApp(
                JSON.parse(
                    Buffer.from(
                        process.env.FIREBASE as string,
                        'base64'
                    ).toString()
                )
            )

            console.log('inicializamos')
        } else {
            console.log('vacio')
        }
    }

    getDB() {
        return getFirestore()
    }

    getAuth() {
        return this.firebaseApp.getAuth()
    }

    getFirebaseApp() {
        return this.firebaseApp
    }
}

export const firebaseManager = new FirebaseManager()
