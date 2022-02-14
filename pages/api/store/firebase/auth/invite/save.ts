// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { handleResponse } from '../../../../../../utils/responseHandler'
import { doc, setDoc } from 'firebase/firestore'
import { firebaseManager } from '../../../../../../services/firebase.services'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ApiResponse>
) {
    const { invite } = req.body
    await setDoc(doc(firebaseManager.getDB(), 'invite', invite.id), invite)
    handleResponse(req, res, 200, null, 'Your invite was saved succesfully')
}
