// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { ruleEngine } from '../../../../../services/rule.engine.service'

type Data = {
    name: string
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
    // res: NextApiResponse<Data>
) {
    const { id } = req.query
    const result = await ruleEngine.execute(id as string, req.body)
    res.status(200).json({
        result: result
    })
}
