// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { connectToDatabase } from '../../../../../utils/db'
import mongoose from 'mongoose'
import User from '../../../../../models/User'
import Provider from '../../../../../models/Provider'
type Data = {
    name: string
}
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    await connectToDatabase()
    const { data, user, id } = req.body
    User.create(user)
    if (id) {
        await Provider.findByIdAndUpdate(id, data)
    } else {
        await Provider.create(data)
    }
}
