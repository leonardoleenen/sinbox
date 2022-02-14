// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { doc, getDoc } from 'firebase/firestore'
import type { NextApiRequest, NextApiResponse } from 'next'
import { firebaseManager } from '../../../../../services/firebase.services'
import { handleResponse } from '../../../../../utils/responseHandler'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { id } = req.query
    const docRef = doc(firebaseManager.getDB(), 'ruleAssets', id as string)
    const docSnap = await getDoc(docRef)
    handleResponse(req, res, 200, docSnap.data() as RuleAsset)
}
