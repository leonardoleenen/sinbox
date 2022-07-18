// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { doc, getDoc, query, setDoc } from 'firebase/firestore'
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

    const evidence = docSnap ? docSnap.data().evidence[evidenceIndex].data : []

    const id = nanoid()
    await setDoc(doc(firebaseManager.getDB(), 'tarriff', id), {
        cuit: evidence.datosBasicos.cuit_datosBasicos,
        razonSocial: evidence.datosBasicos.nombre_datosBasicos,
        tarifas: evidence.programa.map(p => ({
            importe: p.importe,
            programa: p.nombre
        }))
    })

    res.status(200).send({
        result: {
            cuit: evidence.datosBasicos.cuit_datosBasicos,
            razonSocial: evidence.datosBasicos.nombre_datosBasicos,
            tarifas: evidence.programa.map(p => ({
                importe: p.importe,
                programa: p.nombre
            }))
        }
    })
}
