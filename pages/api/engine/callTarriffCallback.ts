// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { url, processId, evidenceIndex } = req.body
    try {
        const result = await axios.post(url, { processId, evidenceIndex })
        return res.status(200).send({
            ...result.data
        })
    } catch (error) {
        console.error(error)
    }
}
