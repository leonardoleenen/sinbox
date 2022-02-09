// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { connectToDatabase } from '../../../../../../utils/db'

import Provider from '../../../../../../models/Provider'
import { handleResponse } from '../../../../../../utils/responseHandler'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ApiResponse>
) {
    await connectToDatabase()
    const { cuit, status } = req.query
    if (status) {
        const getStatus = await Provider.findOne({
            status: status.toString().toUpperCase()
        })
        handleResponse(req, res, 200, getStatus)
    } else if (cuit) {
        const companyByCuit = await Provider.findOne({ 'cuit.value': cuit })
        handleResponse(req, res, 200, companyByCuit)
    }
}
