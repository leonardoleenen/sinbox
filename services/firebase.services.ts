import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import {
    getStorage,
    ref,
    uploadBytes,
    deleteObject,
    getMetadata,
    getDownloadURL
} from 'firebase/storage'
import '@firebase/firestore'
import _ from 'lodash'

class FirebaseManager {
    public firebaseApp: any
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
        const listRef = ref(this.storage, `${fileName}`)
        return getMetadata(listRef)
    }
    async getFileUrl(fullPath: string) {
        return getDownloadURL(ref(this.storage, fullPath))
    }
    async getFilesByProvider(provider: any) {
        const arrayFiles = []
        for (const i in provider) {
            if (_.has(provider[i], 'constancia')) {
                const constancia = provider[i].constancia
                if (constancia !== '') {
                    const { size, contentType, name, fullPath } =
                        await this.getFile(constancia)
                    arrayFiles.push({
                        type: i.toString(),
                        name: name,
                        size,
                        extension: contentType?.split('/')[1],
                        fullPath
                    })
                }
            }
            if (_.has(provider[i].cuit, 'constancia')) {
                const constancia = provider[i].cuit.constancia
                if (constancia !== '') {
                    const { size, contentType, name, fullPath } =
                        await this.getFile(constancia)
                    arrayFiles.push({
                        type: `${i.toString()}.cuit`,
                        name: name,
                        size,
                        extension: contentType?.split('/')[1],
                        fullPath
                    })
                }
            }
        }
        return arrayFiles
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
