// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { doc, setDoc } from 'firebase/firestore'
import type { NextApiRequest, NextApiResponse } from 'next'
import { firebaseManager } from '../../../../../../services/firebase.services'
import { handleResponse } from '../../../../../../utils/responseHandler'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { formToSave } = req.body
    await setDoc(doc(firebaseManager.getDB(), 'workflowForm', formToSave.id), {
        ...formToSave,
        lastUpdated: new Date().getTime()
    }).then(() => formToSave)
    handleResponse(req, res, 200, formToSave)
}
