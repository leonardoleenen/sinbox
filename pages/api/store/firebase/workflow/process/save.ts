// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { doc, setDoc } from 'firebase/firestore'
import type { NextApiRequest, NextApiResponse } from 'next'
import { firebaseManager } from '../../../../../../services/firebase.services'
import { handleResponse } from '../../../../../../utils/responseHandler'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { wkfProcess, process, currentStep, evidence, processComplete } =
        req.body
    const { next } = req.query
    if (next) {
        await setDoc(doc(firebaseManager.getDB(), 'process', process.id), {
            ...process,
            currentStep,
            evidence,
            processComplete
        })
    } else {
        await setDoc(doc(firebaseManager.getDB(), 'process', wkfProcess.id), {
            ...wkfProcess
        })
    }

    handleResponse(req, res, 200, null, 'Your data was saved succesfully')
}
