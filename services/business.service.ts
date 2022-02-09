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
import axios from 'axios'
class BusinessService {
    public API_URL: any = process.env.API_URL
    async saveCompany(data: Company, user: User, id?: string) {
        const res = await axios.post<ApiResponse>(
            `${this.API_URL}/api/store/${process.env.STORE}/business/company/save`,
            {
                data,
                user,
                id
            }
        )
        return res.data
    }

    async getCompanyByUser(id: string) {
        const {
            data: { data: response }
        } = await axios.get<ApiResponse>(
            `${this.API_URL}/api/store/${process.env.STORE}/business/company/user?=${id}`
        )
        return response
    }
    async getCompany(id: string) {
        const {
            data: { data: response }
        } = await axios.get<ApiResponse>(
            `${this.API_URL}/api/store/${process.env.STORE}/business/company/${id}`
        )
        return response
    }

    async getCompanyIdByCuit(cuit: string) {
        const {
            data: { data: response }
        } = await axios.get<ApiResponse>(
            `${this.API_URL}/api/store/${process.env.STORE}/business/company?cuit=${cuit}`
        )
        return response
    }

    async getProviderPendingToApprove() {
        const {
            data: { data: response }
        } = await axios.get<ApiResponse>(
            // eslint-disable-next-line prettier/prettier
            `${this.API_URL}/api/store/${process.env.STORE
            }/business/company?status=${'PENDING'}`
        )
        return response
    }

    async getLegalFormForInbox() {
        const q = query(collection(firebaseManager.getDB(), 'legalForm'))
        return getDocs(q)
    }

    async getLegalFormForOutBox() {
        const q = query(
            collection(firebaseManager.getDB(), 'legalForm'),
            where('status', '==', 'CLOSED')
        )
        return getDocs(q)
    }

    async getLegalForm(id: string) {
        const docRef = doc(firebaseManager.getDB(), 'legalForm', id)
        const docSnap = await getDoc(docRef)
        return docSnap.data() as LegalForm
    }

    async setLegalFormStatus(
        form: LegalForm,
        status: 'CHECKED' | 'APPROVED' | 'REJECTED' | 'NEW',
        signature: {
            signedBy: User
            signature: string
        }
    ) {
        await setDoc(doc(firebaseManager.getDB(), 'legalForm', form.id), {
            ...form,
            signature: {
                signedAt: new Date().getTime(),
                ...signature
            },
            status
        })
    }

    async aforar(form: LegalForm, aforo: number) {
        await setDoc(doc(firebaseManager.getDB(), 'legalForm', form.id), {
            ...form,
            aforo
        })
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
