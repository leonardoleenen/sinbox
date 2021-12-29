import React, { useState } from 'react'
import { webAuthn, Assertion } from '../../../services/webauthn.service'

interface Props {
    className?: string
    legalForm?: LegalForm
    onClose: any
    actionType: 'CHECK' | 'CHECK AND APPROVE' | 'CHECK AND REJECT'
}

const Component = (props: Props): JSX.Element => {
    const [inProcess, setInProcess] = useState(false)

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
            const assertion = await webAuthn.getCredentials(false, credentials)
            setInProcess(false)
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
                        src="/registro/modulo_1_PDF"
                        className="p-8 w-full h-screen"
                    />
                </div>
            )}
        </div>
    )
}

export default Component
