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
    const source = req.body.schema
    const template = Handlebars.compile(source)
    const data = {
        ...req.body.data
    }
    const result = template(data)
    res.status(200).send({ html: result })
}
