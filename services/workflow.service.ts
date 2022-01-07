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
import { getToken, tokenDecode } from './auth.service'

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

    async createProcess(
        workflowSpec: WorkflowSpec,
        fileInstance: FileInstance,
        currentStep: Step
    ) {
        const id = nanoid(10)
        const wkfProcess: WorkflowProcess = {
            id,
            spec: workflowSpec,
            creator: tokenDecode(getToken() as string),
            createdAt: new Date().getTime(),
            nextStep: currentStep.next,
            steps: [
                {
                    file: fileInstance,
                    date: new Date().getTime()
                }
            ],
            processComplete: false
        }

        await setDoc(doc(firebaseManager.getDB(), 'process', id), wkfProcess)
    }

    async getActiveProcess() {
        const q = query(collection(firebaseManager.getDB(), 'process'))
        return await (
            await getDocs(q)
        ).docs.map(d => d.data() as WorkflowProcess)
    }
}

export const workflowService = new Workflow()
