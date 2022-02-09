// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { connectToDatabase } from '../../../../../../utils/db'

import Invite from '../../../../../../models/Invite'
import { handleResponse } from '../../../../../../utils/responseHandler'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ApiResponse>
) {
    await connectToDatabase()
    const { id } = req.query
    const invite = await Invite.findOne({ id: id })
    handleResponse(req, res, 200, invite)
}
