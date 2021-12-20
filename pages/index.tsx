import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import {
    setToken,
    tokenDecode,
    userAlreadyExist
} from '../services/auth.service'
import styles from '../styles/Home.module.css'
import { useRouter } from 'next/router'
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { firebaseManager } from '../services/firebase.services'
import { SignUpStore } from '../store/sigup.store'
import Loader from '../components/loader'
import Link from 'next/link'
import { businessService } from '../services/business.service'
import { nanoid } from 'nanoid'

const Home: NextPage = () => {
    const router = useRouter()
    firebaseManager
    const { token } = router.query
    const provider = new GoogleAuthProvider()
    const state = SignUpStore.useState(s => s)
    const signWithGoogle = () => {
        const auth = getAuth()
        signInWithPopup(auth, provider)
            .then(async result => {
                SignUpStore.update(s => {
                    s.loading = !s.loading
                })
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential =
                    GoogleAuthProvider.credentialFromResult(result)
                const token = credential && credential.accessToken
                // The signed-in user info.
                const user = result.user
                const existUser = await userAlreadyExist(user.uid)

                //Hardcode to REMOVE!!! Only for Registro santa fe
                if (user.uid === 'fHIZaRqhMOO2ennE4on7dCCV1gv2') {
                    router.push('/registro/modulo1')
                    return
                }
                SignUpStore.update(s => {
                    s.user = user
                    s.userCn = user.displayName as string
                    s.email = user.email as string
                })
                if (!existUser) router.push('/signup')
                else {
                    const company = await businessService.getCompanyControlled(
                        user.uid
                    )
                    SignUpStore.update(s => {
                        s.companyInReview = company
                    })
                    if (company.status === 'APPROVED')
                        router.push('/inbox/welcome')
                    if (company.status === 'PENDING')
                        router.push('/signup/wait-for-approval')
                }
                // ...
            })
            .catch(error => {
                // Handle Errors here.
                const errorCode = error.code
                const errorMessage = error.message
                // The email of the user's account used.
                const email = error.email
                // The AuthCredential type that was used.
                const credential = GoogleAuthProvider.credentialFromError(error)
                // ...
            })
    }
    const signInToken = async () => {
        const user_id = nanoid()
        const credentialsUserId = Uint8Array.from(user_id, c => c.charCodeAt(0))
        //TODO In production may change id (.env)
        const publicKeyCredentialCreationOptions: any = {
            challenge: Uint8Array.from('...', c => c.charCodeAt(0)),
            rp: {
                name: 'Sinbox',
                id: 'localhost'
            },
            user: {
                id: credentialsUserId,
                name: '',
                displayName: ''
            },
            authenticatorSelection: {
                authenticatorAttachment: 'platform'
            },
            pubKeyCredParams: [{ alg: -7, type: 'public-key' }],
            timeout: 60000,
            attestation: 'direct'
        }
        try {
            const credentials = await navigator.credentials.create({
                publicKey: publicKeyCredentialCreationOptions
            })
            console.log(credentials)
            if (credentials?.id) {
                const userExist = await userAlreadyExist(credentials.id)
                SignUpStore.update(s => {
                    s.user = { id: credentials.id, providerId: 'webauthn' }
                    s.userCn = ''
                    s.email = ''
                })
                if (!userExist) router.push('/signup')
                else {
                    const company = await businessService.getCompanyControlled(
                        credentials.id
                    )
                    SignUpStore.update(s => {
                        s.companyInReview = company
                    })
                    if (company.status === 'APPROVED')
                        router.push('/inbox/welcome')
                    if (company.status === 'PENDING')
                        router.push('/signup/wait-for-approval')
                }
            }
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        setToken(token as string)
        //router.push('/inbox')
    }, [token])
    if (state.loading) return <Loader />
    return (
        <section className="py-12 bg-blue-600 flex h-screen items-center">
            <div className="container px-4 mx-auto">
                <div className="flex max-w-md mx-auto flex-col text-center">
                    <a
                        className="block mx-auto text-white text-3xl font-semibold leading-none"
                        href="#"
                    >
                        <img
                            className="h-10"
                            src="/logos/inbox-mail.png"
                            alt=""
                            width="auto"
                        />
                    </a>
                    <div className="mt-12 mb-8 p-8 bg-white rounded">
                        <span className="text-sm text-blueGray-400">
                            Ingreso
                        </span>
                        <h4 className="mb-6 text-3xl">Prensa y medios </h4>
                        <div className="flex mb-4 px-4 bg-blueGray-50 rounded">
                            <input
                                type="text"
                                placeholder="username"
                                className="input input-bordered w-full"
                            />
                        </div>
                        <div className="flex mb-6 px-4 bg-blueGray-50 rounded">
                            <input
                                type="password"
                                placeholder="password"
                                className="input input-bordered w-full"
                            />
                        </div>
                        <button className="block w-full p-4 text-center text-xs text-white font-semibold leading-none bg-blue-600 hover:bg-blue-700 rounded">
                            Ingresar con clave y usuario
                        </button>
                        <p className="my-6 text-xs text-blueGray-400 text-center">
                            o utilizando una red social
                        </p>
                        <button className="flex items-center w-full px-4 py-3 mb-2 text-xs text-blueGray-500 font-semibold leading-none border hover:bg-blueGray-50 rounded">
                            <img
                                className="h-6 pr-10"
                                src="/logos/facebook-sign.svg"
                            />
                            <span>Ingresar Facebook</span>
                        </button>
                        <button
                            onClick={signWithGoogle}
                            className="flex items-center px-4 py-3 w-full text-xs text-blueGray-500 font-semibold leading-none border hover:bg-blueGray-50 rounded"
                        >
                            <img
                                className="h-6 pr-10"
                                src="/logos/google-sign.svg"
                            />
                            <span>Ingresar con Google</span>
                        </button>
                        <button
                            onClick={signInToken}
                            className="flex items-center px-4 py-3 mt-3 w-full text-xs text-blueGray-500 font-semibold leading-none border hover:bg-blueGray-50 rounded"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6 mr-10"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
                                />
                            </svg>
                            <span>Ingresar con Token de firma </span>
                        </button>
                    </div>
                    <div>
                        <p className="text-xs text-blue-200 text-center">
                            <a
                                className="underline hover:text-blue-100"
                                href="#"
                            >
                                Politicas de privacidad
                            </a>{' '}
                            and{' '}
                            <a
                                className="underline hover:text-blue-100"
                                href="#"
                            >
                                Terminos de uso
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Home
