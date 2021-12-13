import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import {
    getStorage,
    ref,
    uploadBytes,
    deleteObject,
    list
} from 'firebase/storage'
import '@firebase/firestore'

class FirebaseManager {
    private firebaseApp: any
    private storage: any
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
            this.storage = getStorage()
        }
    }
    uploadFile(file: any): Promise<any> {
        const storageRef = ref(this.storage, `files/${file.name}`)
        return uploadBytes(storageRef, file)
    }
    deleteFile(fileName: any): Promise<any> {
        const storageRef = ref(this.storage, `files/${fileName}`)
        return deleteObject(storageRef)
    }
    getFile(fileName: any) {
        const listRef = ref(this.storage, `files/${fileName}`)
        return listRef.fullPath
    }
    // updateFile(file) { }
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
