// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { connectToDatabase } from '../../../../../../utils/db'
import { handleResponse } from '../../../../../../utils/responseHandler'
import {
    getDoc,
    doc,
    collection,
    query,
    Query,
    where,
    getDocs
} from 'firebase/firestore'
import { firebaseManager } from '../../../../../../services/firebase.services'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ApiResponse>
) {
    await connectToDatabase()
    const { id } = req.query
    const providersRef = collection(firebaseManager.getDB(), 'provider')
    const q: Query = query(providersRef, where('representante.id', '==', id))
    const querySnapshot = await getDocs(q)
    let provider: unknown
    querySnapshot.forEach(doc => (provider = doc.data()))
    handleResponse(req, res, 200, provider)
}
