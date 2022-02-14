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

class RuleEngine {
    private API_URL = process.env.API_URL
    async execute(ruleId: string, context: any) {
        const docRef = doc(firebaseManager.getDB(), 'ruleAssets', ruleId)
        const docSnap = await getDoc(docRef)
        const ruleAsset = docSnap.data() as any

        return axios
            .post('http://localhost:21345/jitdmn/dmnresult', {
                context,
                mainURI: 'regla prueba',
                resources: [
                    {
                        URI: 'regla prueba',
                        content: ruleAsset.spec
                    }
                ]
            })
            .then((result: any) => result.data.decisionResults)
    }

    async get(id: string): Promise<RuleAsset> {
        const {
            data: { data: response }
        } = await axios.get<ApiResponse>(
            `${this.API_URL}/api/store/${process.env.STORE}/engine/${id}`
        )
        return response as RuleAsset
    }
    async getAll(): Promise<Array<RuleAsset>> {
        const {
            data: { data: response }
        } = await axios.get<ApiResponse>(
            `${this.API_URL}/api/store/${process.env.STORE}/engine`
        )
        return response as unknown as Array<RuleAsset>
    }

    async save(rule: RuleAsset) {
        const {
            data: { data: response }
        } = await axios.post<ApiResponse>(
            `${this.API_URL}/api/store/${process.env.STORE}/engine/save`,
            { data: rule }
        )
        return response
    }
}

export const ruleEngine = new RuleEngine()
