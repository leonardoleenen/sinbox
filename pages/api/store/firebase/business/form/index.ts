// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import {
    collection,
    doc,
    getDocs,
    query,
    setDoc,
    where
} from 'firebase/firestore'
import type { NextApiRequest, NextApiResponse } from 'next'
import { firebaseManager } from '../../../../../../services/firebase.services'
import { handleResponse } from '../../../../../../utils/responseHandler'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { status } = req.query
    if (req.method === 'POST') {
        const { form, signature, status } = req.body
        await setDoc(doc(firebaseManager.getDB(), 'legalForm', form.id), {
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
        const q = query(
            collection(firebaseManager.getDB(), 'legalForm'),
            where('status', '==', status.toString().toUpperCase())
        )
        handleResponse(req, res, 200, getDocs(q))
    } else {
        const q = query(collection(firebaseManager.getDB(), 'legalForm'))
        handleResponse(req, res, 200, getDocs(q))
    }
}
