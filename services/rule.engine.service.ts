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
        const docRef = doc(firebaseManager.getDB(), 'ruleAssets', id)
        const docSnap = await getDoc(docRef)
        return docSnap.data() as RuleAsset
    }
    async getAll(): Promise<Array<RuleAsset>> {
        const q = query(collection(firebaseManager.getDB(), 'ruleAssets'))
        return (await getDocs(q)).docs.map(d => d.data() as RuleAsset)
    }

    async save(rule: RuleAsset) {
        await setDoc(doc(firebaseManager.getDB(), 'ruleAssets', rule.id), rule)
    }
}

export const ruleEngine = new RuleEngine()
