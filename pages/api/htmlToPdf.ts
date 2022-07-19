// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

import Handlebars from 'handlebars'
import _ from 'lodash'
import axios from 'axios'
interface Pages {
    html: string
    data: any
}
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const pages = req.body.pages as Array<Pages>
    const parsedPages: string[] = []
    for (let index = 0; index < pages.length; index++) {
        if (_.startsWith(pages[index].html, 'http')) {
            const res = await axios.get(pages[index].html)
            console.log(res)
            parsedPages.push(res.data)
        } else {
            const template = Handlebars.compile(pages[index].html)
            const result = template(pages[index].data)
            parsedPages.push(result)
        }
    }
    res.status(200).send({ pages: parsedPages })
}
