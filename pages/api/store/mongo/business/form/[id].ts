// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { connectToDatabase } from '../../../../../../utils/db'

import LegalForm from '../../../../../../models/LegalForm'
import { handleResponse } from '../../../../../../utils/responseHandler'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ApiResponse>
) {
    await connectToDatabase()
    const { id } = req.query
    const singleLegalForm = await LegalForm.findOne({ id })
    handleResponse(req, res, 200, singleLegalForm, 'Form retrieved correctly')
}
