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
}

export const analyticsService = new AnalyticsService()
