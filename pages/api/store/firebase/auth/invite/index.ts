// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { connectToDatabase } from '../../../../../../utils/db'
import { handleResponse } from '../../../../../../utils/responseHandler'
import {
    getDoc,
    doc,
    query,
    collection,
    getDocs,
    deleteDoc
} from 'firebase/firestore'
import { firebaseManager } from '../../../../../../services/firebase.services'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ApiResponse>
) {
    await connectToDatabase()
    const { id } = req.query
    if (id) {
        if (req.method === 'DELETE') {
            await deleteDoc(
                doc(firebaseManager.getDB(), 'invite', id as string)
            )
        } else {
            const docRef = doc(firebaseManager.getDB(), 'invite', id as string)
            const docSnap = await getDoc(docRef)
            handleResponse(req, res, 200, docSnap.data())
        }
    } else {
        const q = query(collection(firebaseManager.getDB(), 'invite'))
        handleResponse(req, res, 200, getDocs(q))
    }
}
