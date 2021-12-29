import {
    getDocs,
    collection,
    doc,
    getDoc,
    setDoc,
    query,
    where,
    Query
} from 'firebase/firestore'
import { firebaseManager } from './firebase.services'
import { nanoid } from 'nanoid'
class BusinessService {
    async saveCompany(data: Company, user: User, id?: string) {
        await setDoc(doc(firebaseManager.getDB(), 'users', user.id), user)
        if (id) {
            await setDoc(doc(firebaseManager.getDB(), 'provider', id), data)
        } else {
            const _id = nanoid(10)
            await setDoc(doc(firebaseManager.getDB(), 'provider', _id), data)
        }
        return
    }

    async getCompanyByUser(id: string) {
        const providersRef = collection(firebaseManager.getDB(), 'provider')
        const q: Query = query(
            providersRef,
            where('representante.id', '==', id)
        )
        const querySnapshot = await getDocs(q)
        let provider: unknown
        querySnapshot.forEach(doc => (provider = doc.data()))
        return provider as Company
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
        const company = await this.getCompanyByUser(user.id as string)
        return company
    }

    async getCompanyIdByCuit(cuit: string) {
        const q = query(
            collection(firebaseManager.getDB(), 'provider'),
            where('cuit.value', '==', cuit)
        )
        return (await (await getDocs(q)).docs.map(d => d.id)[0]) as string
    }

    async getProviderPendingToApprove() {
        const q = query(
            collection(firebaseManager.getDB(), 'provider'),
            where('status', '==', 'PENDING')
        )
        return getDocs(q)
    }

    async saveLegalForm(form: LegalForm) {
        const _id = nanoid(10)
        if (form.id) {
            await setDoc(
                doc(firebaseManager.getDB(), 'legalForm', form.id),
                form
            )
        } else {
            await setDoc(doc(firebaseManager.getDB(), 'legalForm', _id), {
                ...form,
                id: _id
            })
        }
    }
}

export const businessService = new BusinessService()
