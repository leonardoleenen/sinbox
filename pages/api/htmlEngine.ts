// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
type Data = {
    html: string
}
import Handlebars from 'handlebars'
import { firebaseManager } from '../../services/firebase.services'
import { doc, getDoc } from 'firebase/firestore'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    const { id } = req.query
    const docRef = doc(firebaseManager.getDB(), 'workflowForm', id as string)
    const docSnap = await getDoc(docRef)
    const workflowData = (await docSnap.data()) as WorkFlowForm
    const source = workflowData.spec?.pdfschema
    const template = Handlebars.compile(source)
    const data = {
        ...req.body
    }
    const result = template(data)
    res.status(200).send({ html: result })
}
