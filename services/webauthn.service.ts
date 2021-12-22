import { async } from '@firebase/util'
import base64url from 'base64url'
import { nanoid } from 'nanoid'
interface User {
    id?: string
    public_key?: string
    name: string
    displayName: string
}
interface Opts {
    authenticatorType: 'platform' | 'cross-platform'
}
interface Assertion {
    public_key: string
    clientDataObj: {
        type: string
        crossOrigin: boolean
        origin: string
        challenge: string
    }
    response: {
        authenticatorData: ArrayBuffer
        signature: ArrayBuffer
        userHandle: ArrayBuffer
    }
}
class WebAuthn {
    constructor() {
        const isBrowser = () => typeof window !== 'undefined'
        if (isBrowser()) {
            //Checks that Webauthn is available
            if (window.PublicKeyCredential) {
                PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable()
                    .then(available => {
                        if (available) console.log('Supported, PA available')
                    })
                    .catch(err => console.error('Not supported PA'))
            }
        }
    }
    /**
     * Returns an object of type Credentials containting
     * the public key, raw id decoded and the type of credentials
     * alongside an object op type response which have some buffers
     * <p>
     *
     * @param  User  an object that MUST be pased in order to generate credentials
     * @param  opts  optional params such as the type of auth
     * @return       The whole credentials object
     */
    async createCredentials(user: User, opts?: Opts) {
        const user_id = nanoid()
        const credentialsUserId = Uint8Array.from(user_id, c => c.charCodeAt(0))
        const isBrowser = () => typeof window !== 'undefined'
        if (isBrowser()) {
            const publicKeyCredentialCreationOptions: any = {
                challenge: this.getChallenge(),
                rp: {
                    name: 'Sinbox',
                    id: window.location.hostname || 'localhost'
                },
                user: {
                    id: credentialsUserId,
                    name: user.name,
                    displayName: user.displayName
                },
                authenticatorSelection: {
                    authenticatorAttachment:
                        opts?.authenticatorType || 'platform'
                },
                pubKeyCredParams: [{ alg: -7, type: 'public-key' }]
            }
            try {
                const cred: any = await navigator.credentials.create({
                    publicKey: publicKeyCredentialCreationOptions
                })
                //TODO: Register credentials object in server
                const credentials = {
                    id: cred?.id,
                    rawId: base64url.encode(cred.rawId),
                    type: cred?.type,
                    response: {}
                }
                if (cred.response) {
                    const clientDataJSON = base64url.encode(
                        cred.response.clientDataJSON
                    )
                    const attestationObject = base64url.encode(
                        cred.response.attestationObject
                    )
                    credentials.response = {
                        clientDataJSON,
                        attestationObject
                    }
                }
                localStorage.setItem('credentialId', credentials.id)
                return credentials
            } catch (error) {
                console.log(error)
            }
        }
    }
    /**
     * Returns an object of type Assertion containting
     * the public key, clientDataJSON decoded and  an object op type response which have some buffers
     * <p>
     *
     * @return       The returned object of type Assertion is the response of navigator.credentials.get()
     */
    async getCredentials() {
        const credentials_id = localStorage.getItem('credentialId')
        if (credentials_id) {
            const publicKey: PublicKeyCredentialRequestOptions = {
                challenge: this.getChallenge(),
                allowCredentials: [
                    {
                        type: 'public-key',
                        id: Buffer.from(credentials_id, 'base64'),
                        transports: ['internal']
                    }
                ]
            }
            try {
                const assertionResponse: any = await navigator.credentials.get({
                    publicKey: publicKey
                })

                const public_key = assertionResponse?.id.toString()
                const utf8Decoder = new TextDecoder('utf-8')
                const decodedClientData = utf8Decoder.decode(
                    assertionResponse.response.clientDataJSON
                )
                const clientDataObj = JSON.parse(decodedClientData)
                const assertion: Assertion = {
                    public_key,
                    clientDataObj,
                    response: {
                        authenticatorData:
                            assertionResponse.response.authenticatorData,
                        signature: assertionResponse.response.signature,
                        userHandle: assertionResponse.response.userHandle
                    }
                }
                return assertion
            } catch (error) {
                console.error(error)
            }
        } else {
            console.error('There is no credentials')
        }
    }
    getChallenge() {
        //TODO:  Retrieve challenge from backend
        return Uint8Array.from('...', c => c.charCodeAt(0))
    }
}

export const webAuthn = new WebAuthn()
