import React from 'react'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { SignUpStore } from '../../store/sigup.store'
import SecurePages from '../../components/signup/securePages'
import Inscription from '../../components/inscription/index'
const Page: NextPage = () => {
    const router = useRouter()
    const state = SignUpStore.useState(s => s)
    return (
        <SecurePages {...state}>
            <Inscription readonly={false} />
        </SecurePages>
    )
}

export default Page
