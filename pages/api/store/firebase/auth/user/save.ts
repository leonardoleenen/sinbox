// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { connectToDatabase } from '../../../../../../utils/db'
import { handleResponse } from '../../../../../../utils/responseHandler'
import { getDoc, doc, setDoc } from 'firebase/firestore'
import { firebaseManager } from '../../../../../../services/firebase.services'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ApiResponse>
) {
    await connectToDatabase()
    const { data } = req.body
    await setDoc(doc(firebaseManager.getDB(), 'users', data.id), data)
    handleResponse(req, res, 200, data, 'User was succesfully created')
}
