// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { connectToDatabase } from '../../../../../../utils/db'

import LegalForm from '../../../../../../models/LegalForm'
import { handleResponse } from '../../../../../../utils/responseHandler'
import { nanoid } from 'nanoid'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ApiResponse>
) {
    await connectToDatabase()
    const { form } = req.body
    const _id = nanoid(10)
    if (form.id) {
        await LegalForm.updateOne({ id: form.id, form })
    } else {
        Object.assign({ id: _id })
        await LegalForm.create({ ...form })
    }
    handleResponse(req, res, 200, {
        ...form
    })
}
