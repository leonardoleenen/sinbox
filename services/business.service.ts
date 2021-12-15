import {
    getDocs,
    collection,
    query,
    doc,
    getDoc,
    setDoc,
    where
} from 'firebase/firestore'
import { firebaseManager } from './firebase.services'

class BusinessService {
    async saveCompany(data: Company, user: User) {
        await setDoc(doc(firebaseManager.getDB(), 'users', user.id), user)
        await setDoc(doc(firebaseManager.getDB(), 'provider', data.cuit), data)
        return
    }

    async getCompany(id: string) {
        const docRef = doc(firebaseManager.getDB(), 'provider', id)
        const docSnap = await getDoc(docRef)
        return docSnap.data() as Company
    }

    async getCompanyControlled(userId: string) {
        const docRef = doc(firebaseManager.getDB(), 'users', userId)
        const docSnap = await getDoc(docRef)
        const user = docSnap.data() as User
        const company = await this.getCompany(
            user.controllerCompanyCuit as string
        )
        return company
    }

    async getProviderPendingToApprove() {
        const q = query(
            collection(firebaseManager.getDB(), 'provider'),
            where('status', '==', 'PENDING')
        )
        return getDocs(q)
    }
}

export const businessService = new BusinessService()
