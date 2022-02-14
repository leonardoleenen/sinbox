// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { doc, getDoc, setDoc } from 'firebase/firestore'
import type { NextApiRequest, NextApiResponse } from 'next'
import { firebaseManager } from '../../../../../../services/firebase.services'
import { handleResponse } from '../../../../../../utils/responseHandler'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { id } = req.query
    const docRef = await doc(firebaseManager.getDB(), 'process', id as string)

    handleResponse(
        req,
        res,
        200,
        (await (await getDoc(docRef)).data()) as WorkflowProcess,
        'Your data was saved succesfully'
    )
}
