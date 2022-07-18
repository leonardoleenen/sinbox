// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { doc, getDoc, updateDoc, setDoc } from 'firebase/firestore'
import { nanoid } from 'nanoid'
import type { NextApiRequest, NextApiResponse } from 'next'
import { firebaseManager } from '../../../services/firebase.services'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { processId, evidenceIndex } = req.body

    const docRef = await doc(
        firebaseManager.getDB(),
        'process',
        processId as string
    )
    const docSnap = await getDoc(docRef)

    const evidence = docSnap.data().evidence[0].data

    await updateDoc(
        doc(firebaseManager.getDB(), 'preventivos', evidence.preventivoNro),
        {
            status: 'approved'
        }
    )

    res.status(200).send({
        result: true
    })
}
