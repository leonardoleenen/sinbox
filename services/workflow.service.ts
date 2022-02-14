import {
    getDocs,
    collection,
    doc,
    getDoc,
    setDoc,
    query
} from 'firebase/firestore'
import { firebaseManager } from './firebase.services'
import { nanoid } from 'nanoid'
import { getToken, tokenDecode } from './auth.service'
import { ruleEngine } from './rule.engine.service'
import axios from 'axios'

class Workflow {
    private API_URL = process.env.API_URL
    private STORE = process.env.STORE
    async getList(): Promise<Array<WorkflowSpec>> {
        const {
            data: { data: response }
        } = await axios.get<ApiResponse>(
            `${this.API_URL}/api/store/${process.env.STORE}/workflow/spec/`
        )
        return response as unknown as Array<WorkflowSpec>
    }

    async getSpec(id: string): Promise<WorkflowSpec> {
        const {
            data: { data: response }
        } = await axios.get<ApiResponse>(
            `${this.API_URL}/api/store/${process.env.STORE}/workflow/spec/${id}`
        )
        return response as WorkflowSpec
    }

    async saveSpec(workFlow: WorkflowSpec): Promise<WorkflowSpec> {
        if (!workFlow.id) {
            workFlow.id = nanoid(10)
        }
        const {
            data: { data: response }
        } = await axios.get<ApiResponse>(
            `${this.API_URL}/api/store/${process.env.STORE}/workflow/save`
        )
        return response as WorkflowSpec
    }

    async getForms(): Promise<Array<WorkFlowForm>> {
        const {
            data: { data: response }
        } = await axios.get<ApiResponse>(
            `${this.API_URL}/api/store/${process.env.STORE}/workflow/form/`
        )
        return response as unknown as Promise<Array<WorkFlowForm>>
    }

    async getFormSpec(id: string): Promise<WorkFlowForm> {
        const {
            data: { data: response }
        } = await axios.get<ApiResponse>(
            `${this.API_URL}/api/store/${process.env.STORE}/workflow/form/${id}`
        )
        return response as unknown as Promise<WorkFlowForm>
    }

    async saveFormSpec(formToSave: WorkFlowForm): Promise<WorkFlowForm> {
        if (!formToSave.id) {
            formToSave.id = nanoid(10)
        }

        const {
            data: { data: response }
        } = await axios.post<ApiResponse>(
            `${this.API_URL}/api/store/${process.env.STORE}/workflow/form/save`,
            {
                formToSave: formToSave
            }
        )
        return response as WorkFlowForm
    }

    async createProcess(
        workflowSpec: WorkflowSpec,
        data: any,
        formSpec: WorkFlowForm
    ) {
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
            processComplete: false,
            evidence: [
                {
                    data,
                    form: formSpec,
                    date: new Date().getTime(),
                    user: tokenDecode(getToken() as string),
                    action: 'START'
                }
            ]
        }
        const {
            data: { data: response }
        } = await axios.post<ApiResponse>(
            `${this.API_URL}/api/store/${process.env.STORE}/workflow/form/save`,
            {
                wkfProcess
            }
        )
        return response
    }

    async moveNext(
        process: WorkflowProcess,
        isFinalStep: boolean,
        data: any,
        formSpec: WorkFlowForm
    ) {
        const ruleResult = await ruleEngine.execute(
            process.spec.ruleAssetStep,
            {
                role: tokenDecode(getToken() as string).role,
                currentAction: process.currentStep
            }
        )

        const {
            data: { data: response }
        } = await axios.post<ApiResponse>(
            `${this.API_URL}/api/store/${this.STORE}/workflow/process/save?next=true`,
            {
                ...process,
                currentStep: ruleResult[0].result,
                evidence: [
                    ...(process.evidence as []),
                    {
                        data,
                        form: formSpec,
                        date: new Date().getTime(),
                        user: tokenDecode(getToken() as string),
                        action: process.currentStep
                    }
                ],
                processComplete: isFinalStep
            }
        )
        return response
    }

    async getProcess(id: string): Promise<WorkflowProcess> {
        const {
            data: { data: response }
        } = await axios.get<ApiResponse>(
            `${this.API_URL}/api/store/${process.env.STORE}/workflow/process/${id}`
        )
        return response as WorkflowProcess
    }

    async validateProcessForUser(process: WorkflowProcess) {
        const _wfSpec = process.spec

        const user = tokenDecode(getToken() as string)
        const ruleResult = await ruleEngine.execute(_wfSpec.ruleAsset as any, {
            signal: process.currentStep,
            role: user.role
        })

        return ruleResult[0].result ? true : false
    }

    async getActionFromProcess(process: WorkflowProcess) {
        const _wfSpec = process.spec

        const user = tokenDecode(getToken() as string)
        const ruleResult = await ruleEngine.execute(_wfSpec.ruleAsset as any, {
            signal: process.currentStep,
            role: user.role
        })

        return ruleResult[0].result.willBeRequiredDescription
    }

    async parseProcess(p: WorkflowProcess) {
        const actionLiteral = await this.getActionFromProcess(p)

        return {
            ...p,
            descriptionCurrentStep: actionLiteral
        } as WorkflowProcess
    }

    async getActiveProcess() {
        const {
            data: { data: processes }
        } = await axios.get<ApiResponse>(
            `${this.API_URL}/api/store/${process.env.STORE}/workflow/process`
        )
        const filteredProcesses = []
        for (const p in processes) {
            if (await this.validateProcessForUser(processes[p])) {
                filteredProcesses.push(processes[p])
            }
        }

        const result = []
        for (const d in filteredProcesses) {
            result.push(await this.parseProcess(filteredProcesses[d]))
        }

        return result
    }
}

export const workflowService = new Workflow()
