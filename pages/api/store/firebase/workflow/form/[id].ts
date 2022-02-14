// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { collection, getDocs, query } from 'firebase/firestore'
import type { NextApiRequest, NextApiResponse } from 'next'
import { firebaseManager } from '../../../../../../services/firebase.services'
import { handleResponse } from '../../../../../../utils/responseHandler'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { id } = req.query
    const q = query(collection(firebaseManager.getDB(), 'workflowForm'))

    handleResponse(
        req,
        res,
        200,
        await (await getDocs(q)).docs.map(d => d.data() as WorkFlowForm)
    )
}
