import {
    collection,
    doc,
    getDoc,
    getDocs,
    query,
    setDoc
} from 'firebase/firestore'
import { firebaseManager } from './firebase.services'

class CampaniaService {
    async get(id: string) {
        const docRef = doc(firebaseManager.getDB(), 'campanias', id)
        const docSnap = await getDoc(docRef)
        return docSnap.data() as any
    }

    async save(campania: any) {
        console.log(campania)
        await setDoc(
            doc(firebaseManager.getDB(), 'campanias', campania.id),
            campania
        )

        return campania
    }

    async getAll() {
        const q = query(collection(firebaseManager.getDB(), 'campanias'))
        return (await getDocs(q)).docs.map(d => d.data() as any)
    }
}

export const campaniaService = new CampaniaService()
