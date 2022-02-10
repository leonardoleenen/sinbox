import { doc, setDoc } from 'firebase/firestore'
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
        const {
            data: { data: response }
        } = await axios.get<ApiResponse>(
            `${this.API_URL}/api/store/${process.env.STORE}/business/form`
        )
        return response
    }

    async getLegalFormForOutBox() {
        const {
            data: { data: response }
        } = await axios.get<ApiResponse>(
            // eslint-disable-next-line prettier/prettier
            `${this.API_URL}/api/store/${process.env.STORE
            }/business/form?status=${'CLOSED'}`
        )
        return response
    }

    async getLegalForm(id: string) {
        const {
            data: { data: response }
        } = await axios.get<ApiResponse>(
            `${this.API_URL}/api/store/${process.env.STORE}/business/form/${id}`
        )
        return response
    }

    async setLegalFormStatus(
        form: LegalForm,
        status: 'CHECKED' | 'APPROVED' | 'REJECTED' | 'NEW',
        signature: {
            signedBy: User
            signature: string
        }
    ) {
        const {
            data: { data: response }
        } = await axios.post<ApiResponse>(
            `${this.API_URL}/api/store/${process.env.STORE}/business/form`,
            {
                form,
                signature: {
                    signedAt: new Date().getTime(),
                    ...signature
                },
                status
            }
        )
        return response
    }

    async aforar(form: LegalForm, aforo: number) {
        const {
            data: { data: response }
        } = await axios.post<ApiResponse>(
            `${this.API_URL}/api/store/${process.env.STORE}/business/form/aforar`,
            {
                ...form,
                aforo
            }
        )
        return response
    }

    async saveLegalForm(form: LegalForm) {
        const {
            data: { data: response }
        } = await axios.post<ApiResponse>(
            `${this.API_URL}/api/store/${process.env.STORE}/business/form/save`,
            {
                ...form
            }
        )
        return response
    }
}

export const businessService = new BusinessService()
