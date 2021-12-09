import React, { useEffect } from 'react'
import type { NextPage } from 'next'
import Loader from '../loader/index'
import { useRouter } from 'next/router'
import { SignUpStore } from '../../store/sigup.store'

const SecurePages: NextPage = (props: any) => {
    const router = useRouter()
    const state = SignUpStore.useState(s => s)
    useEffect(()=>{
        if (state.loading) {
            SignUpStore.update(s => {
                s.loading = false
            })
        }
        if (!props.user ) router.replace('/')
    },[props.children.props.id])
    return !props.user || state.loading ? <Loader /> : <div>{props.children}</div>
}

export default SecurePages
