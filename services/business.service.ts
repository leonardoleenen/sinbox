import { getDocs, collection, doc, getDoc, setDoc } from 'firebase/firestore'
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
}

export const businessService = new BusinessService()
