// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { connectToDatabase } from '../../../../../../utils/db'

import Workflow from '../../../../../../models/WorkflowSpec'
import { handleResponse } from '../../../../../../utils/responseHandler'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ApiResponse>
) {
    await connectToDatabase()
    const { data } = req.body
    await Workflow.create(data)
    handleResponse(req, res, 200, data, 'Your workflow was correctly saved')
}
