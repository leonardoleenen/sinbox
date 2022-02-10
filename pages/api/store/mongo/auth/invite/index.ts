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
    if (id) {
        if (req.method === 'DELETE') {
            const invite = await Invite.deleteOne({ id: id })
            handleResponse(
                req,
                res,
                200,
                invite,
                'Invite was succesfully deleted'
            )
        } else {
            const invite = await Invite.findOne({ id: id })
            handleResponse(req, res, 200, invite)
        }
    } else {
        const invites = await Invite.find()
        handleResponse(req, res, 200, invites)
    }
}
