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

class Workflow {
    async getList(): Promise<Array<WorkflowSpec>> {
        const q = query(collection(firebaseManager.getDB(), 'workflowSpec'))
        return await (await getDocs(q)).docs.map(d => d.data() as WorkflowSpec)
    }

    async getSpec(id: string): Promise<WorkflowSpec> {
        const docRef = doc(firebaseManager.getDB(), 'workflowSpec', id)
        const docSnap = await getDoc(docRef)
        return docSnap.data() as WorkflowSpec
    }
}

export const workflowService = new Workflow()
