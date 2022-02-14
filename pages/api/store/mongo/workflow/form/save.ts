// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { connectToDatabase } from '../../../../../../utils/db'

import WorkflowForm from '../../../../../../models/WorkflowForm'
import { handleResponse } from '../../../../../../utils/responseHandler'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ApiResponse>
) {
    const { formToSave } = req.body
    await connectToDatabase()
    const workflowForm = await WorkflowForm.create({
        ...formToSave,
        lastUpdated: new Date().getTime()
    })
    handleResponse(req, res, 200, formToSave, 'WorkflowForm correctly created')
}
