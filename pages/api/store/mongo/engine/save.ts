// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { connectToDatabase } from '../../../../../utils/db'

import RuleAsset from '../../../../../models/RuleAsset'
import { handleResponse } from '../../../../../utils/responseHandler'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ApiResponse>
) {
    await connectToDatabase()
    const { data } = req.body
    await RuleAsset.create(data)
    handleResponse(req, res, 200, data, 'The rule was created correctly')
}
