import type { NextApiRequest, NextApiResponse } from 'next'

const CURRENT_STORE: any = process.env.STORE
/**
 * Use this function to correctly format responses in API
 *
 * @param req Required param to handle correctly the response
 * @param res Required param to use in order to access functionalities from the response
 * @param status Required param to set status code in response
 * @param data Data that the backend has correctly managed
 * @param msg This optional param is given in order to retrieve more feedback in the response
 * @param Opts Optional params to pass to the response
 * @return void
 */
export function handleResponse(
    req: NextApiRequest,
    res: NextApiResponse<ApiResponse>,
    status: number,
    data: any,
    msg?: string,
    opts?: {
        providedStore: 'firebase' | 'mongo'
    }
) {
    return res.status(status).send({
        store: opts?.providedStore || CURRENT_STORE,
        data,
        message: msg
    })
}
