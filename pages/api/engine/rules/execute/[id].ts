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

    const URL_RULE_ENGINE: string =
        process.env.RULE_ENGINE_URL ||
        ' http://localhost:21345/jitdmn/dmnresult'

    const result = await axios
        // https://kie-sandbox-extended-services-image-leonardoleenen-dev.apps.sandbox.x8i5.p1.openshiftapps.com/jitdmn/dmnresult
        .post(URL_RULE_ENGINE, {
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
