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
        return axios
            .post(('/api/engine/rules/execute/' + ruleId) as any, context)
            .then((result: any) => result.data.result)
    }
    async execute2(ruleId: string, context: any) {
        const docRef = doc(firebaseManager.getDB(), 'ruleAssets', ruleId)
        const docSnap = await getDoc(docRef)
        const ruleAsset = docSnap.data() as any

        return axios
            .post(
                'https://kie-sandbox-extended-services-image-leonardoleenen-dev.apps.sandbox.x8i5.p1.openshiftapps.com:21345/jitdmn/dmnresult',
                {
                    context,
                    mainURI: 'regla prueba',
                    resources: [
                        {
                            URI: 'regla prueba',
                            content: ruleAsset.spec
                        }
                    ]
                }
            )
            .then((result: any) => result.data.decisionResults)
            .catch(err => console.log(err))
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
