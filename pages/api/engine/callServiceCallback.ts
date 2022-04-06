// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'
import { workflowService } from '../../../services/workflow.service'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { url, evidenceIndex, processId } = req.body
    try {
        const evidence = await (
            await workflowService.getProcess(processId)
        ).evidence[evidenceIndex].data
        const result = await axios.post(url, { evidence })
        console.log(result.data)
        return res.status(200).send({
            ...result.data
        })
    } catch (error) {
        console.error(error)
    }
}
