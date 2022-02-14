// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { collection, doc, getDocs, query, setDoc } from 'firebase/firestore'
import type { NextApiRequest, NextApiResponse } from 'next'
import { firebaseManager } from '../../../../../services/firebase.services'
import { handleResponse } from '../../../../../utils/responseHandler'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { data } = req.body
    await setDoc(doc(firebaseManager.getDB(), 'ruleAssets', data.id), data)
    handleResponse(req, res, 200, data, 'The rule was created correctly')
}
