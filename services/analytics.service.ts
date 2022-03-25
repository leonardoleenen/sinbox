import { getDocs, collection, query } from 'firebase/firestore'
import { firebaseManager } from './firebase.services'
import axios from 'axios'
class AnalyticsService {
    async getServicesRegistered(): Promise<Array<AnalyticsServicesRegistered>> {
        const q = query(collection(firebaseManager.getDB(), 'dataServices'))
        return (await getDocs(q)).docs.map(
            d => d.data() as AnalyticsServicesRegistered
        )
    }
    getData(service: AnalyticsServicesRegistered): Promise<Array<any>> {
        return axios.get(service.url).then(result => result.data)
    }
    async insertUserSession(data: {
        accessedAt: number
        name: string
        entityId: string
    }) {
        const result = await axios.post(
            `${process.env.API_URL}/api/analytics/sessions`,
            {
                data: data
            }
        )
        return result
    }
    async insertWorkflowForm(data: {
        title: string
        subtitle?: string
        description: string
        createdAt: number
        entityId: string
    }) {
        const result = await axios.post(
            `${process.env.API_URL}/api/analytics/workflows`,
            {
                data: data
            }
        )
        return result
    }
}

export const analyticsService = new AnalyticsService()
