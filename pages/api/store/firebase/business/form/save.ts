// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { doc, setDoc } from 'firebase/firestore'
import { nanoid } from 'nanoid'
import type { NextApiRequest, NextApiResponse } from 'next'
import { firebaseManager } from '../../../../../../services/firebase.services'
import { handleResponse } from '../../../../../../utils/responseHandler'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { form } = req.body
    const _id = nanoid(10)
    if (form.id) {
        await setDoc(doc(firebaseManager.getDB(), 'legalForm', form.id), form)
    } else {
        await setDoc(doc(firebaseManager.getDB(), 'legalForm', _id), {
            ...form,
            id: _id
        })
    }
    handleResponse(req, res, 200, {
        ...form
    })
}
