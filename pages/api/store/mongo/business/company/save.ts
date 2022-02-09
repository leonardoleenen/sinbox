// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { connectToDatabase } from '../../../../../../utils/db'
import User from '../../../../../../models/User'
import Provider from '../../../../../../models/Provider'
import { handleResponse } from '../../../../../../utils/responseHandler'
import { nanoid } from 'nanoid'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ApiResponse>
) {
    await connectToDatabase()
    const { data, user, id } = req.body
    await User.create(user)
    if (id) {
        await Provider.findOneAndUpdate({ id }, data)
        handleResponse(req, res, 200, data, 'Provider  succesfully update')
    } else {
        const _id = nanoid(10)
        Object.assign(data, { id: _id })
        await Provider.create(data)
        handleResponse(req, res, 200, data, 'Provider  succesfully created')
    }
}
