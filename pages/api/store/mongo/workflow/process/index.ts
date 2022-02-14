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
    const proccesses = await WorkflowProcess.find()
    handleResponse(req, res, 200, proccesses, 'Your data was created')
}
