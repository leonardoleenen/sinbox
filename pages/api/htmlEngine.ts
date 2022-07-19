// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
type Data = {
    html: string
}
import Handlebars from 'handlebars'

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
