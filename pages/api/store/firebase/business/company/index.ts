// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { connectToDatabase } from '../../../../../../utils/db'
import { handleResponse } from '../../../../../../utils/responseHandler'
import {
    getDoc,
    doc,
    getDocs,
    collection,
    where,
    query
} from 'firebase/firestore'
import { firebaseManager } from '../../../../../../services/firebase.services'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ApiResponse>
) {
    await connectToDatabase()
    const { cuit, status } = req.query
    if (cuit) {
        const q = query(
            collection(firebaseManager.getDB(), 'provider'),
            where('cuit.value', '==', cuit)
        )
        handleResponse(
            req,
            res,
            200,
            (await (await getDocs(q)).docs.map(d => d.id)[0]) as string
        )
    } else if (status) {
        const q = await query(
            collection(firebaseManager.getDB(), 'provider'),
            where('status', '==', status.toString().toUpperCase())
        )
        const orderStatus = []
        handleResponse(
            req,
            res,
            200,
            (await getDocs(q)).forEach(r => orderStatus.push(r.data()))
        )
    }
}
