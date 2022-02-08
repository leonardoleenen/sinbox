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
    const { data, user, id } = req.body
    await setDoc(doc(firebaseManager.getDB(), 'users', user.id), user)
    if (id) {
        await setDoc(doc(firebaseManager.getDB(), 'provider', id), data)
        handleResponse(req, res, 200, data, 'Provider  succesfully update')
    } else {
        const _id = nanoid(10)
        await setDoc(doc(firebaseManager.getDB(), 'provider', _id), data)
        handleResponse(req, res, 200, data, 'Provider  succesfully created')
    }
}
