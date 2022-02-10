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
    const { status } = req.query
    if (req.method === 'POST') {
        const { form, signature, status } = req.body
        await LegalForm.create({
            ...form,
            signature,
            status
        })
        handleResponse(
            req,
            res,
            200,
            {
                ...form,
                signature,
                status
            },
            'Form was succesfully saved in our db'
        )
    }
    if (status) {
        const legalFormStatus = await LegalForm.find({
            status: status.toString().toUpperCase()
        })
        handleResponse(
            req,
            res,
            200,
            legalFormStatus,
            'Form retrieved correctly'
        )
    } else {
        const legalForm = await LegalForm.find()
        handleResponse(req, res, 200, legalForm, 'Form retrieved correctly')
    }
}
