// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'
import pg from 'knex'

type Data = {
    name: string
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
    // res: NextApiResponse<Data>
) {
    const db = pg({
        client: 'pg',
        connection: {
            database: process.env.KNEX_DB_NAME,
            user: process.env.KNEX_DB_USER,
            password: process.env.KNEX_DB_PASSWORD
        }
    })
    if (req.method === 'POST') {
        const { data } = req.body
        const result = await db
            .insert(data)
            .into('sessions')
            .returning('*')
            .then(rows => {
                return rows[0]
            })
        res.status(200).json({
            result: result
        })
    }
}
