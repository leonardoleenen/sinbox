import React, { useEffect, useState } from 'react'
import { getToken, tokenDecode } from '../../../services/auth.service'
import { businessService } from '../../../services/business.service'
import { webAuthn, Assertion } from '../../../services/webauthn.service'

interface Props {
    className?: string
    legalForm: LegalForm
    onClose: any
    actionType: 'CHECK' | 'CHECK AND APPROVE' | 'CHECK AND REJECT'
}

const Component = (props: Props): JSX.Element => {
    const [inProcess, setInProcess] = useState(false)
    const [user, setUser] = useState<User>()

    useEffect(() => {
        setUser(tokenDecode(getToken() as string))
    }, [])

    function arrayBufferToBase64(buffer: any) {
        let binary = ''
        const bytes = new Uint8Array(buffer)
        const len = bytes.byteLength
        for (let i = 0; i < len; i++) {
            binary += String.fromCharCode(bytes[i])
        }
        return window.btoa(binary)
    }

    const sign = async () => {
        setInProcess(true)
        const test = {
            name: 'Alex',
            displayName: 'Fiorenza'
        }
        //!! OBJECT OF FORM TO PASS TO CHALLENGE
        const challengeTest = {
            testField: 'Morpheo',
            testField2: 'Neo',
            testField3: 'Trinity'
        }
        const credentials = await webAuthn.createCredentials(
            test,
            {
                storeCredentials: false
            },
            challengeTest
        )
        if (credentials) {
            //Contains response.signature
            const assertion: any = await webAuthn.getCredentials(
                false,
                credentials
            )

            await businessService.setLegalFormStatus(
                props.legalForm,
                props.actionType as any,
                {
                    signedBy: user as User,
                    signature: arrayBufferToBase64(assertion.response.signature)
                }
            )
            setInProcess(false)
            props.onClose()
        }
    }

    return (
        <div>
            <div className="p-8 justify-end w-screen flex">
                <div>
                    <button
                        onClick={props.onClose}
                        className="btn btn-outline btn-primary mr-4"
                    >
                        Volver
                    </button>
                    <button onClick={sign} className="btn btn-primary">
                        Firmar
                    </button>
                </div>
            </div>
            {inProcess ? (
                <div>En proceso de firma, aguarde por favor...</div>
            ) : (
                <div>
                    <iframe
                        src={`/registro/modulo_1_PDF/?id=${props.legalForm.id}`}
                        className="p-8 w-full h-screen"
                    />
                </div>
            )}
        </div>
    )
}

export default Component
