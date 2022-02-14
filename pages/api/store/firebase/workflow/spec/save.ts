// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { collection, doc, getDocs, query, setDoc } from 'firebase/firestore'
import type { NextApiRequest, NextApiResponse } from 'next'
import { firebaseManager } from '../../../../../../services/firebase.services'
import { handleResponse } from '../../../../../../utils/responseHandler'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { data } = req.body
    await setDoc(doc(firebaseManager.getDB(), 'workflowSpec', data.id), {
        ...data,
        lastUpdated: new Date().getTime()
    })
    handleResponse(req, res, 200, data, 'Your data was saved succesfully')
}
