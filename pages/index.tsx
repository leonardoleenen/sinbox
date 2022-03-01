import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import {
    generateToken,
    getInvite,
    getRouteAfterLogin,
    registerBackendUser,
    setToken,
    tokenDecode,
    userAlreadyExist
} from '../services/auth.service'
import { useRouter } from 'next/router'
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { firebaseManager } from '../services/firebase.services'
import { SignUpStore } from '../store/sigup.store'
import Loader from '../components/loader'
import { businessService } from '../services/business.service'
import { webAuthn } from '../services/webauthn.service'

const Home: NextPage = () => {
    const router = useRouter()
    const { token } = router.query
    const { invite } = router.query
    const provider = new GoogleAuthProvider()
    const [provisionalUserRole, setProvisionalUserRole] = useState<string>(
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdGF0dXMiOiJFTkFCTEVEIiwiZW1haWwiOiJsZW9uYXJkb2xlZW5lbkBnbWFpbC5jb20iLCJpZCI6ImQ1c2FFTXNGWmVhVm50cTZIZmZvZ2FCSktFSjIiLCJyb2xlIjoiU1VQRVJWSVNPUiIsImlkZW50aXR5UHJvdmlkZXIiOiJnb29nbGUiLCJpc3N1ZWRBdCI6MTY0NTY4NzUyNjU0OSwibmFtZSI6IkFsdGFtaXJhbm8iLCJpYXQiOjE2NDYwNTY2NDd9.X5uMC6la31IoSanVF_KPKOMGKyw5oOnOqlQdeLhgaOY'
    )
    const state = SignUpStore.useState(s => s)

    const handleInvite = async (user: any) => {
        const inviteObj = {
            id: invite,
            ...(await getInvite(invite as string))
        }
        const newUser = await registerBackendUser(inviteObj, user)
        setToken(generateToken(newUser as User))
        router.push(getRouteAfterLogin() as string)
    }

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

                if (invite) {
                    await handleInvite(result.user)
                }

                SignUpStore.update(s => {
                    s.user = user
                    s.userCn = user.displayName as string
                    s.email = user.email as string
                })
                if (existUser) {
                    setToken(generateToken(existUser as User))

                    router.push('/process')
                } else {
                    router.push(getRouteAfterLogin() as string)
                }
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
                        <h4 className="mb-6 text-3xl">Santa Fé </h4>
                        <select
                            className="select w-full max-w-xs"
                            name="selectedRole"
                            onChange={e => {
                                setProvisionalUserRole(e.target.value)
                                localStorage.setItem(
                                    'sinbox:token',
                                    e.target.value
                                )
                                router.push('/process')
                            }}
                        >
                            <option disabled selected>
                                Seleccione un rol{' '}
                            </option>
                            <option value="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdGF0dXMiOiJFTkFCTEVEIiwiZW1haWwiOiJsZW9uYXJkb2xlZW5lbkBnbWFpbC5jb20iLCJpZCI6ImQ1c2FFTXNGWmVhVm50cTZIZmZvZ2FCSktFSjIiLCJyb2xlIjoiUFJPVklERVIiLCJpZGVudGl0eVByb3ZpZGVyIjoiZ29vZ2xlIiwiaXNzdWVkQXQiOjE2NDU2ODc1MjY1NDksIm5hbWUiOiJGTSBTdGEgRmUiLCJpYXQiOjE2NDYwNTY2NDd9.moCF3joJzkk-x-IywaYiaIVeYWJXS7kcA1TcLrR5sto">
                                Proveedor Ej. FM Sta Fe
                            </option>

                            <option value="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdGF0dXMiOiJFTkFCTEVEIiwiZW1haWwiOiJsZW9uYXJkb2xlZW5lbkBnbWFpbC5jb20iLCJpZCI6ImQ1c2FFTXNGWmVhVm50cTZIZmZvZ2FCSktFSjIiLCJyb2xlIjoiU1VQRVJWSVNPUiIsImlkZW50aXR5UHJvdmlkZXIiOiJnb29nbGUiLCJpc3N1ZWRBdCI6MTY0NTY4NzUyNjU0OSwibmFtZSI6IkFsdGFtaXJhbm8iLCJpYXQiOjE2NDYwNTY2NDd9.X5uMC6la31IoSanVF_KPKOMGKyw5oOnOqlQdeLhgaOY">
                                Secretario: Altamirano
                            </option>
                            <option value="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdGF0dXMiOiJFTkFCTEVEIiwiZW1haWwiOiJsZW9uYXJkb2xlZW5lbkBnbWFpbC5jb20iLCJpZCI6ImQ1c2FFTXNGWmVhVm50cTZIZmZvZ2FCSktFSjIiLCJyb2xlIjoiU1VQRVJWSVNPUiIsImlkZW50aXR5UHJvdmlkZXIiOiJnb29nbGUiLCJpc3N1ZWRBdCI6MTY0NTY4NzUyNjU0OSwibmFtZSI6Ikp1YW4gTWFudWVsIiwiaWF0IjoxNjQ2MDU2NjQ3fQ.QS3QRMQv1Lt9hfwwAhQMfJpwAVfgssVEg1RsF0HNMYA">
                                Subsecretario: Juan Manuel
                            </option>
                            <option value="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdGF0dXMiOiJFTkFCTEVEIiwiZW1haWwiOiJsZW9uYXJkb2xlZW5lbkBnbWFpbC5jb20iLCJpZCI6ImQ1c2FFTXNGWmVhVm50cTZIZmZvZ2FCSktFSjIiLCJyb2xlIjoiU1VQRVJWSVNPUiIsImlkZW50aXR5UHJvdmlkZXIiOiJnb29nbGUiLCJpc3N1ZWRBdCI6MTY0NTY4NzUyNjU0OSwibmFtZSI6IkdhYnJpZWxhIEZyYW5jbyIsImlhdCI6MTY0NjA1NjY0N30.Ji8QpffNTxcIAuoAx2C-5z67X2vxjluHz5k8sTHTi9A">
                                Directora General: Gabriela Franco
                            </option>
                            <option value="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdGF0dXMiOiJFTkFCTEVEIiwiZW1haWwiOiJsZW9uYXJkb2xlZW5lbkBnbWFpbC5jb20iLCJpZCI6ImQ1c2FFTXNGWmVhVm50cTZIZmZvZ2FCSktFSjIiLCJyb2xlIjoiU1VQRVJWSVNPUiIsImlkZW50aXR5UHJvdmlkZXIiOiJnb29nbGUiLCJpc3N1ZWRBdCI6MTY0NTY4NzUyNjU0OSwibmFtZSI6IkFuYWxpYSBUcmlheSIsImlhdCI6MTY0NjA1NjY0N30.P2mHDdzM0wyNplJJde0RCjFmA0CSz4xS0cKaIUQVGoE">
                                Subdirectora: Analia Triay
                            </option>
                            <option value="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdGF0dXMiOiJFTkFCTEVEIiwiZW1haWwiOiJsZW9uYXJkb2xlZW5lbkBnbWFpbC5jb20iLCJpZCI6ImQ1c2FFTXNGWmVhVm50cTZIZmZvZ2FCSktFSjIiLCJyb2xlIjoiUkVDRVBUSU9OSVNUIEFOQUxZU1QiLCJpZGVudGl0eVByb3ZpZGVyIjoiZ29vZ2xlIiwiaXNzdWVkQXQiOjE2NDU2ODc1MjY1NDksIm5hbWUiOiJNYXJpZWxhIFBlbGV6b24iLCJpYXQiOjE2NDYwNTY2NDd9.FjZIwSF4DLzHTfZtjbKxkIqiWSrKhlTuPVVlHLUsbVU">
                                Analista Mariela Pelezon
                            </option>
                            <option value="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdGF0dXMiOiJFTkFCTEVEIiwiZW1haWwiOiJsZW9uYXJkb2xlZW5lbkBnbWFpbC5jb20iLCJpZCI6ImQ1c2FFTXNGWmVhVm50cTZIZmZvZ2FCSktFSjIiLCJyb2xlIjoiUkVDRVBUSU9OSVNUIiwiaWRlbnRpdHlQcm92aWRlciI6Imdvb2dsZSIsImlzc3VlZEF0IjoxNjQ1Njg3NTI2NTQ5LCJuYW1lIjoiQW5hbGlzdGEgMSIsImlhdCI6MTY0NjA1NjY0N30.FojbLe3LAKpFfE0Fg08Zar6_iEgsCbXaoKGfl-A2Xwc">
                                Analista 1
                            </option>
                            <option value="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdGF0dXMiOiJFTkFCTEVEIiwiZW1haWwiOiJsZW9uYXJkb2xlZW5lbkBnbWFpbC5jb20iLCJpZCI6ImQ1c2FFTXNGWmVhVm50cTZIZmZvZ2FCSktFSjIiLCJyb2xlIjoiUkVDRVBUSU9OSVNUIiwiaWRlbnRpdHlQcm92aWRlciI6Imdvb2dsZSIsImlzc3VlZEF0IjoxNjQ1Njg3NTI2NTQ5LCJuYW1lIjoiQW5hbGlzdGEgMiIsImlhdCI6MTY0NjA1NjY0N30.5EzwZQk18maCctnm6WwsLY-Ngmv3NBsO2_3Voqb6nbs">
                                Analista 2
                            </option>
                            <option value="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdGF0dXMiOiJFTkFCTEVEIiwiZW1haWwiOiJsZW9uYXJkb2xlZW5lbkBnbWFpbC5jb20iLCJpZCI6ImQ1c2FFTXNGWmVhVm50cTZIZmZvZ2FCSktFSjIiLCJyb2xlIjoiUkVDRVBUSU9OSVNUIiwiaWRlbnRpdHlQcm92aWRlciI6Imdvb2dsZSIsImlzc3VlZEF0IjoxNjQ1Njg3NTI2NTQ5LCJuYW1lIjoiQW5hbGlzdGEgMyIsImlhdCI6MTY0NjA1NjY0N30.nHbVL76mzOiWLvctcJ4f0kK-DnUQMmV9D4BIEDkXN1s">
                                Analista 3
                            </option>
                        </select>

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
                        {/* <button
                            onClick={registerToken}
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
                            <span>Registrarse con Token de firma </span>
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
                        </button> */}
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
