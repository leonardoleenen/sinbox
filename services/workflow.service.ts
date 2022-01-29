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
import { ruleEngine } from './rule.engine.service'

class Workflow {
    async getList(): Promise<Array<WorkflowSpec>> {
        const q = query(collection(firebaseManager.getDB(), 'workflowSpec'))
        return await (await getDocs(q)).docs.map(d => d.data() as WorkflowSpec)
    }

    async getSpec(id: string): Promise<WorkflowSpec> {
        const docRef = doc(firebaseManager.getDB(), 'workflowSpec', id)
        const docSnap = await getDoc(docRef)

        return {
            ...docSnap.data()
        } as WorkflowSpec
    }

    async getForms(): Promise<Array<WorkFlowForm>> {
        const q = query(collection(firebaseManager.getDB(), 'workflowForm'))
        return await (await getDocs(q)).docs.map(d => d.data() as WorkFlowForm)
    }

    async getFormSpec(id: string): Promise<WorkFlowForm> {
        const docRef = doc(firebaseManager.getDB(), 'workflowForm', id)
        const docSnap = await getDoc(docRef)

        return docSnap.data() as WorkFlowForm
    }

    async createProcess(workflowSpec: WorkflowSpec) {
        const id = nanoid(10)
        const ruleResult = await ruleEngine.execute(
            workflowSpec.ruleAssetStep,
            {
                role: tokenDecode(getToken() as string).role,
                currentAction: 'START'
            }
        )

        const wkfProcess: WorkflowProcess = {
            id,
            spec: workflowSpec,
            creator: tokenDecode(getToken() as string),
            createdAt: new Date().getTime(),
            currentStep: ruleResult[0].result,
            processComplete: false
        }

        await setDoc(doc(firebaseManager.getDB(), 'process', id), wkfProcess)
    }

    async moveNext(process: WorkflowProcess, isFinalStep: boolean) {
        const ruleResult = await ruleEngine.execute(
            process.spec.ruleAssetStep,
            {
                role: tokenDecode(getToken() as string).role,
                currentAction: process.currentStep
            }
        )

        await setDoc(doc(firebaseManager.getDB(), 'process', process.id), {
            ...process,
            currentStep: ruleResult[0].result,
            processComplete: isFinalStep
        })
    }

    async getProcess(id: string): Promise<WorkflowProcess> {
        const docRef = doc(firebaseManager.getDB(), 'process', id)
        return (await (await getDoc(docRef)).data()) as WorkflowProcess
    }

    async getActiveProcess() {
        const q = query(collection(firebaseManager.getDB(), 'process'))
        return await (
            await getDocs(q)
        ).docs.map(d => d.data() as WorkflowProcess)
    }
}

export const workflowService = new Workflow()
