// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import type { NextApiRequest, NextApiResponse } from 'next'
import { firebaseManager } from '../../../../../services/firebase.services'
import {
    getDocs,
    collection,
    doc,
    getDoc,
    setDoc,
    query,
    where,
    Query
} from 'firebase/firestore'
import axios from 'axios'
type Data = {
    name: string
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
    // res: NextApiResponse<Data>
) {
    const { id } = req.query

    const docRef = doc(firebaseManager.getDB() as any, 'ruleAssets', id as any)
    const docSnap = await getDoc(docRef)
    const ruleAsset = docSnap.data() as any

    const result = await axios
        .post('http://localhost:21345/jitdmn/dmnresult', {
            context: req.body,
            mainURI: 'regla prueba',
            resources: [
                {
                    URI: 'regla prueba',
                    content: ruleAsset.spec
                }
            ]
        })
        .then((result: any) => result.data.decisionResults)
    res.status(200).json({
        result: result
    })
}
