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

const Home: NextPage = () => {
    const router = useRouter()
    firebaseManager
    const { token } = router.query
    const [loading, setLoading] = useState(false)
    const provider = new GoogleAuthProvider()

    const sigWithGoogle = () => {
        const auth = getAuth()
        signInWithPopup(auth, provider)
            .then(async result => {
                setLoading(true)
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential =
                    GoogleAuthProvider.credentialFromResult(result)
                const token = credential.accessToken
                // The signed-in user info.
                const user = result.user
                SignUpStore.update(s => {
                    s.user = user
                })
                const existUser = await userAlreadyExist(user.uid)
                if (existUser) router.push('/inbox')
                else router.push('/signup/personal_info')
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

    useEffect(() => {
        setToken(token as string)
        //router.push('/inbox')
    }, [token])

    if (loading) return <Loader />
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
                            Sign In
                        </span>
                        <h4 className="mb-6 text-3xl">
                            Ingresar o registrarse
                        </h4>

                        <p className="my-6 text-xs text-blueGray-400 text-center">
                            continuar el proceso con{' '}
                        </p>

                        <button
                            onClick={sigWithGoogle}
                            className="flex items-center px-4 py-3 w-full text-xs text-blueGray-500 font-semibold leading-none border hover:bg-blueGray-50 rounded"
                        >
                            <img
                                className="h-6 pr-10"
                                src="/logos/google-sign.svg"
                            />
                            <span>Google</span>
                        </button>
                    </div>
                    <div>
                        <p className="text-xs text-blue-200 text-center">
                            <a
                                className="underline hover:text-blue-100"
                                href="#"
                            >
                                Police privacy
                            </a>{' '}
                            and{' '}
                            <a
                                className="underline hover:text-blue-100"
                                href="#"
                            >
                                Terms of Use
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Home
