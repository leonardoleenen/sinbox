// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { connectToDatabase } from '../../../../../../utils/db'

import WorkflowForm from '../../../../../../models/WorkflowForm'
import { handleResponse } from '../../../../../../utils/responseHandler'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ApiResponse>
) {
    const { id } = req.query
    await connectToDatabase()
    const workflowForm = await WorkflowForm.find({ id })
    handleResponse(req, res, 200, { ...workflowForm })
}
