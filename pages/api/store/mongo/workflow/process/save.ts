// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { connectToDatabase } from '../../../../../../utils/db'

import WorkflowProcess from '../../../../../../models/WorkflowProcess'
import { handleResponse } from '../../../../../../utils/responseHandler'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ApiResponse>
) {
    await connectToDatabase()
    const { wkfProcess, process, currentStep, evidence, processComplete } =
        req.body
    const { next } = req.query
    if (next) {
        await WorkflowProcess.create({
            ...process,
            currentStep,
            evidence,
            processComplete
        })
    } else {
        await WorkflowProcess.create(wkfProcess)
    }
    handleResponse(req, res, 200, null, 'Your data was created')
}
