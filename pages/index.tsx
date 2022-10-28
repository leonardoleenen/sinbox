/* eslint-disable @typescript-eslint/no-var-requires */
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
import { analyticsService } from '../services/analytics.service'
import Image from 'next/image'
import Lottie from 'react-lottie-player'

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

    const lootieJson = require('../public/lotties/news.json')
    return (
        <div className="flex h-screen">
            <div className="w-2/5 relative flex justify-center items-center hs-screen bg-blue-600">
                <div>
                    <div
                        className=" font-bold text-white px-8"
                        style={{
                            fontSize: '4.2rem'
                        }}
                    >
                        Bienvenido
                    </div>
                    <div className="text-regular pb-4 text-slate-200 mb-4 px-8">
                        Al portal de Planificación publicitaria y medios
                    </div>
                    <Lottie
                        loop
                        animationData={lootieJson}
                        play
                        style={{ width: 600, height: 600 }}
                    />
                </div>
                <div className="absolute inset-x-0 bottom-0 w-full  text-center text-white text-xs font-thin justify-center pb-8 space-x-2 ">
                    <div className="text-sm">
                        Uso exclusivo para prestadores de servicios
                        publicitarios
                    </div>
                    <div className="text-sm font-semibold pt-1 ">
                        Términos y condiciones
                    </div>
                </div>
            </div>
            <div className="flex w-3/5 relative ">
                <div className="w-full flex flex-col justify-center items-center">
                    <div className=" w-full flex justify-center pb-4  ">
                        <Image
                            className=""
                            src="/logos/SantaFe_Marca_blanco.jpeg"
                            width={200}
                            height={120}
                        />
                    </div>

                    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                        <div className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="email"
                                    className="input input-bordered"
                                />
                            </div>
                            <div className="form-control">
                                <select
                                    className="select w-full max-w-xs select-bordered"
                                    name="selectedRole"
                                    onChange={async e => {
                                        setProvisionalUserRole(e.target.value)
                                        localStorage.setItem(
                                            'sinbox:token',
                                            e.target.value
                                        )
                                        const decodedToken = tokenDecode(
                                            e.target.value
                                        )
                                        await analyticsService.insertUserSession(
                                            {
                                                accessedAt: Date.now(),
                                                name: decodedToken.name,
                                                entityId: decodedToken.id
                                            }
                                        )

                                        if (decodedToken.role === 'PROVIDER')
                                            router.push('/process')
                                        else router.push('/dashboard')
                                    }}
                                >
                                    <option disabled selected>
                                        Seleccione un rol{' '}
                                    </option>
                                    <option value="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdGF0dXMiOiJFTkFCTEVEIiwiZW1haWwiOiJsZW9uYXJkb2xlZW5lbkBnbWFpbC5jb20iLCJpZCI6ImQ1c2FFTXNGWmVhVm50cTZIZmZvZ2FCSktFSjIiLCJyb2xlIjoiUFJPVklERVIiLCJpZGVudGl0eVByb3ZpZGVyIjoiZ29vZ2xlIiwiaXNzdWVkQXQiOjE2NDU2ODc1MjY1NDksIm5hbWUiOiJGTSBTdGEgRmUiLCJpYXQiOjE2NDYwNTY2NDd9.moCF3joJzkk-x-IywaYiaIVeYWJXS7kcA1TcLrR5sto">
                                        Proveedor
                                    </option>
                                    <option value="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdGF0dXMiOiJFTkFCTEVEIiwiZW1haWwiOiJsZW9uYXJkb2xlZW5lbkBnbWFpbC5jb20iLCJpZCI6ImQ1c2FFTXNGWmVhVm50cTZIZmZvZ2FCSktFSjIiLCJyb2xlIjoiU0VDUkVUQVJJTyIsImlkZW50aXR5UHJvdmlkZXIiOiJnb29nbGUiLCJpc3N1ZWRBdCI6MTY0NTY4NzUyNjU0OSwibmFtZSI6IkNhcmxvcyBBbWVyaWNvIEJlcm11ZGV6IiwiaWF0IjoxNjQ2MDU2NjQ3fQ.vhcILrdZxVa1fPXQly5vqajZ71YHDdi5tS_ovY0nDZI">
                                        Secretario
                                    </option>
                                    <option value="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdGF0dXMiOiJFTkFCTEVEIiwiZW1haWwiOiJsZW9uYXJkb2xlZW5lbkBnbWFpbC5jb20iLCJpZCI6ImQ1c2FFTXNGWmVhVm50cTZIZmZvZ2FCSktFSjIiLCJyb2xlIjoiU1VCU0VDUkVUQVJJTyIsImlkZW50aXR5UHJvdmlkZXIiOiJnb29nbGUiLCJpc3N1ZWRBdCI6MTY0NTY4NzUyNjU0OSwibmFtZSI6Ikp1YW4gTWFudWVsIiwiaWF0IjoxNjQ2MDU2NjQ3fQ.7PCeHwPiFgMoi2vMIWwUCI0yKpCxiXXVWpNRNE4E3wk">
                                        Subsecretario
                                    </option>
                                    <option value="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdGF0dXMiOiJFTkFCTEVEIiwiZW1haWwiOiJsZW9uYXJkb2xlZW5lbkBnbWFpbC5jb20iLCJpZCI6ImQ1c2FFTXNGWmVhVm50cTZIZmZvZ2FCSktFSjIiLCJyb2xlIjoiUExBTklGSUNBRE9SQSIsImlkZW50aXR5UHJvdmlkZXIiOiJnb29nbGUiLCJpc3N1ZWRBdCI6MTY0NTY4NzUyNjU0OSwibmFtZSI6IlZpcmdpbmlhIHBheiIsImlhdCI6MTY0NjA1NjY0N30.FkmBsBupqrUkMdpUGjY5-KES5SDrAsjm0TjeGEk_6e4">
                                        Planificadora
                                    </option>

                                    <option value="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdGF0dXMiOiJFTkFCTEVEIiwiZW1haWwiOiJsZW9uYXJkb2xlZW5lbkBnbWFpbC5jb20iLCJpZCI6ImQ1c2FFTXNGWmVhVm50cTZIZmZvZ2FCSktFSjIiLCJyb2xlIjoiQ09PUkRJTkFET1JBIFBVQkxJQ0lEQUQiLCJpZGVudGl0eVByb3ZpZGVyIjoiZ29vZ2xlIiwiaXNzdWVkQXQiOjE2NDU2ODc1MjY1NDksIm5hbWUiOiJWaXJnaW5pYSBwYXoiLCJpYXQiOjE2NDYwNTY2NDd9.9NWkXZMe_LLp0FALxjfYN2G8BZdFXJw98ZT6wsrtU48">
                                        Coordinadora Publicidad
                                    </option>
                                    <option value="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdGF0dXMiOiJFTkFCTEVEIiwiZW1haWwiOiJsZW9uYXJkb2xlZW5lbkBnbWFpbC5jb20iLCJpZCI6ImQ1c2FFTXNGWmVhVm50cTZIZmZvZ2FCSktFSjIiLCJyb2xlIjoiQ09PUkRJTkFET1IgQVJURSIsImlkZW50aXR5UHJvdmlkZXIiOiJnb29nbGUiLCJpc3N1ZWRBdCI6MTY0NTY4NzUyNjU0OSwibmFtZSI6IlZpcmdpbmlhIHBheiIsImlhdCI6MTY0NjA1NjY0N30.7nT2EUAQLcbFYhE3B7gXmR-SSooEE1HvdjeKjVPuFNg">
                                        Coordinador de Arte
                                    </option>

                                    <option value="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdGF0dXMiOiJFTkFCTEVEIiwiZW1haWwiOiJsZW9uYXJkb2xlZW5lbkBnbWFpbC5jb20iLCJpZCI6ImQ1c2FFTXNGWmVhVm50cTZIZmZvZ2FCSktFSjIiLCJyb2xlIjoiRElSRUNUT1IiLCJpZGVudGl0eVByb3ZpZGVyIjoiZ29vZ2xlIiwiaXNzdWVkQXQiOjE2NDU2ODc1MjY1NDksIm5hbWUiOiJHYWJyaWVsYSBGcmFuY28iLCJpYXQiOjE2NDYwNTY2NDd9.UgPj1-M3letdzrDIF844klQ1KfvLFgtaDmywTZ8P1y8">
                                        Directora General
                                    </option>
                                    <option value="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdGF0dXMiOiJFTkFCTEVEIiwiZW1haWwiOiJsZW9uYXJkb2xlZW5lbkBnbWFpbC5jb20iLCJpZCI6ImQ1c2FFTXNGWmVhVm50cTZIZmZvZ2FCSktFSjIiLCJyb2xlIjoiU1VCRElSRUNUT1IiLCJpZGVudGl0eVByb3ZpZGVyIjoiZ29vZ2xlIiwiaXNzdWVkQXQiOjE2NDU2ODc1MjY1NDksIm5hbWUiOiJBbmFsaWEgVHJpYXkiLCJpYXQiOjE2NDYwNTY2NDd9.TBDKtPSswdG5Wqbrusu0WY7-grcLLasK2G2gMPiS2Ag">
                                        Subdirectora
                                    </option>
                                    <option value="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdGF0dXMiOiJFTkFCTEVEIiwiZW1haWwiOiJsZW9uYXJkb2xlZW5lbkBnbWFpbC5jb20iLCJpZCI6ImQ1c2FFTXNGWmVhVm50cTZIZmZvZ2FCSktFSjIiLCJyb2xlIjoiQU5BTElTVEEiLCJpZGVudGl0eVByb3ZpZGVyIjoiZ29vZ2xlIiwiaXNzdWVkQXQiOjE2NDU2ODc1MjY1NDksIm5hbWUiOiJNYXJpZWxhIFBlbGVzc29uIiwiaWF0IjoxNjQ2MDU2NjQ3fQ.lHfa4nuDEa0Q1wXhi-5rqk-XOR6ryAHsLBjsEXlVGxo">
                                        Analista
                                    </option>
                                    <option value="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdGF0dXMiOiJFTkFCTEVEIiwiZW1haWwiOiJsZW9uYXJkb2xlZW5lbkBnbWFpbC5jb20iLCJpZCI6ImQ1c2FFTXNGWmVhVm50cTZIZmZvZ2FCSktFSjIiLCJyb2xlIjoiUkVDRVBUSU9OSVNUIiwiaWRlbnRpdHlQcm92aWRlciI6Imdvb2dsZSIsImlzc3VlZEF0IjoxNjQ1Njg3NTI2NTQ5LCJuYW1lIjoiQW5hbGlzdGEgMSIsImlhdCI6MTY0NjA1NjY0N30.FojbLe3LAKpFfE0Fg08Zar6_iEgsCbXaoKGfl-A2Xwc">
                                        Mesa de Entrada
                                    </option>
                                    <option value="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdGF0dXMiOiJFTkFCTEVEIiwiZW1haWwiOiJsZW9uYXJkb2xlZW5lbkBnbWFpbC5jb20iLCJpZCI6ImQ1c2FFTXNGWmVhVm50cTZIZmZvZ2FCSktFSjIiLCJyb2xlIjoiUkVDRVBUSU9OSVNUIiwiaWRlbnRpdHlQcm92aWRlciI6Imdvb2dsZSIsImlzc3VlZEF0IjoxNjQ1Njg3NTI2NTQ5LCJuYW1lIjoiQW5hbGlzdGEgMiIsImlhdCI6MTY0NjA1NjY0N30.5EzwZQk18maCctnm6WwsLY-Ngmv3NBsO2_3Voqb6nbs">
                                        Analista 2
                                    </option>
                                    <option value="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdGF0dXMiOiJFTkFCTEVEIiwiZW1haWwiOiJsZW9uYXJkb2xlZW5lbkBnbWFpbC5jb20iLCJpZCI6ImQ1c2FFTXNGWmVhVm50cTZIZmZvZ2FCSktFSjIiLCJyb2xlIjoiUkVDRVBUSU9OSVNUIiwiaWRlbnRpdHlQcm92aWRlciI6Imdvb2dsZSIsImlzc3VlZEF0IjoxNjQ1Njg3NTI2NTQ5LCJuYW1lIjoiQW5hbGlzdGEgMyIsImlhdCI6MTY0NjA1NjY0N30.nHbVL76mzOiWLvctcJ4f0kK-DnUQMmV9D4BIEDkXN1s">
                                        Analista 3
                                    </option>
                                    <option value="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdGF0dXMiOiJFTkFCTEVEIiwiZW1haWwiOiJsZW9uYXJkb2xlZW5lbkBnbWFpbC5jb20iLCJpZCI6ImQ1c2FFTXNGWmVhVm50cTZIZmZvZ2FCSktFSjIiLCJyb2xlIjoiU0VDUkVUQVJJTyBDT09SRElOQUNJT04gIiwiaWRlbnRpdHlQcm92aWRlciI6Imdvb2dsZSIsImlzc3VlZEF0IjoxNjQ1Njg3NTI2NTQ5LCJuYW1lIjoiU2VjIENvb3JkaW5hY2lvbiAtIEFub24iLCJpYXQiOjE2NDYwNTY2NDd9.XtgRaENNtf4idJLWDVhEAPiUOKHyGyNZdj8ajFeM0X8">
                                        Secretario de Coordinacion
                                    </option>
                                </select>
                            </div>
                            <div className="form-control mt-6">
                                <button className="btn btn-primary">
                                    Ingresar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="absolute inset-x-0 bottom-0 w-full flex justify-center pb-8 space-x-2 ">
                    <div className="text-sm text-gray-500">
                        No tiene Usuario,
                    </div>
                    <div className="text-sm font-semibold text-blue-500">
                        Registrese
                    </div>
                </div>
            </div>
        </div>
    )

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
                            Ingresar a
                        </span>
                        <h4 className="mb-6 text-3xl">
                            Portal de Planificación publicitaria y medios
                        </h4>
                        <select
                            className="select w-full max-w-xs"
                            name="selectedRole"
                            onChange={async e => {
                                setProvisionalUserRole(e.target.value)
                                localStorage.setItem(
                                    'sinbox:token',
                                    e.target.value
                                )
                                const decodedToken = tokenDecode(e.target.value)
                                await analyticsService.insertUserSession({
                                    accessedAt: Date.now(),
                                    name: decodedToken.name,
                                    entityId: decodedToken.id
                                })

                                if (decodedToken.role === 'PROVIDER')
                                    router.push('/process')
                                else router.push('/dashboard')
                            }}
                        >
                            <option disabled selected>
                                Seleccione un rol{' '}
                            </option>
                            <option value="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdGF0dXMiOiJFTkFCTEVEIiwiZW1haWwiOiJsZW9uYXJkb2xlZW5lbkBnbWFpbC5jb20iLCJpZCI6ImQ1c2FFTXNGWmVhVm50cTZIZmZvZ2FCSktFSjIiLCJyb2xlIjoiUFJPVklERVIiLCJpZGVudGl0eVByb3ZpZGVyIjoiZ29vZ2xlIiwiaXNzdWVkQXQiOjE2NDU2ODc1MjY1NDksIm5hbWUiOiJGTSBTdGEgRmUiLCJpYXQiOjE2NDYwNTY2NDd9.moCF3joJzkk-x-IywaYiaIVeYWJXS7kcA1TcLrR5sto">
                                Proveedor
                            </option>
                            <option value="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdGF0dXMiOiJFTkFCTEVEIiwiZW1haWwiOiJsZW9uYXJkb2xlZW5lbkBnbWFpbC5jb20iLCJpZCI6ImQ1c2FFTXNGWmVhVm50cTZIZmZvZ2FCSktFSjIiLCJyb2xlIjoiU0VDUkVUQVJJTyIsImlkZW50aXR5UHJvdmlkZXIiOiJnb29nbGUiLCJpc3N1ZWRBdCI6MTY0NTY4NzUyNjU0OSwibmFtZSI6IkNhcmxvcyBBbWVyaWNvIEJlcm11ZGV6IiwiaWF0IjoxNjQ2MDU2NjQ3fQ.vhcILrdZxVa1fPXQly5vqajZ71YHDdi5tS_ovY0nDZI">
                                Secretario
                            </option>
                            <option value="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdGF0dXMiOiJFTkFCTEVEIiwiZW1haWwiOiJsZW9uYXJkb2xlZW5lbkBnbWFpbC5jb20iLCJpZCI6ImQ1c2FFTXNGWmVhVm50cTZIZmZvZ2FCSktFSjIiLCJyb2xlIjoiU1VCU0VDUkVUQVJJTyIsImlkZW50aXR5UHJvdmlkZXIiOiJnb29nbGUiLCJpc3N1ZWRBdCI6MTY0NTY4NzUyNjU0OSwibmFtZSI6Ikp1YW4gTWFudWVsIiwiaWF0IjoxNjQ2MDU2NjQ3fQ.7PCeHwPiFgMoi2vMIWwUCI0yKpCxiXXVWpNRNE4E3wk">
                                Subsecretario
                            </option>
                            <option value="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdGF0dXMiOiJFTkFCTEVEIiwiZW1haWwiOiJsZW9uYXJkb2xlZW5lbkBnbWFpbC5jb20iLCJpZCI6ImQ1c2FFTXNGWmVhVm50cTZIZmZvZ2FCSktFSjIiLCJyb2xlIjoiUExBTklGSUNBRE9SQSIsImlkZW50aXR5UHJvdmlkZXIiOiJnb29nbGUiLCJpc3N1ZWRBdCI6MTY0NTY4NzUyNjU0OSwibmFtZSI6IlZpcmdpbmlhIHBheiIsImlhdCI6MTY0NjA1NjY0N30.FkmBsBupqrUkMdpUGjY5-KES5SDrAsjm0TjeGEk_6e4">
                                Planificadora
                            </option>

                            <option value="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdGF0dXMiOiJFTkFCTEVEIiwiZW1haWwiOiJsZW9uYXJkb2xlZW5lbkBnbWFpbC5jb20iLCJpZCI6ImQ1c2FFTXNGWmVhVm50cTZIZmZvZ2FCSktFSjIiLCJyb2xlIjoiQ09PUkRJTkFET1JBIFBVQkxJQ0lEQUQiLCJpZGVudGl0eVByb3ZpZGVyIjoiZ29vZ2xlIiwiaXNzdWVkQXQiOjE2NDU2ODc1MjY1NDksIm5hbWUiOiJWaXJnaW5pYSBwYXoiLCJpYXQiOjE2NDYwNTY2NDd9.9NWkXZMe_LLp0FALxjfYN2G8BZdFXJw98ZT6wsrtU48">
                                Coordinadora Publicidad
                            </option>

                            <option value="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdGF0dXMiOiJFTkFCTEVEIiwiZW1haWwiOiJsZW9uYXJkb2xlZW5lbkBnbWFpbC5jb20iLCJpZCI6ImQ1c2FFTXNGWmVhVm50cTZIZmZvZ2FCSktFSjIiLCJyb2xlIjoiRElSRUNUT1IiLCJpZGVudGl0eVByb3ZpZGVyIjoiZ29vZ2xlIiwiaXNzdWVkQXQiOjE2NDU2ODc1MjY1NDksIm5hbWUiOiJHYWJyaWVsYSBGcmFuY28iLCJpYXQiOjE2NDYwNTY2NDd9.UgPj1-M3letdzrDIF844klQ1KfvLFgtaDmywTZ8P1y8">
                                Directora General
                            </option>
                            <option value="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdGF0dXMiOiJFTkFCTEVEIiwiZW1haWwiOiJsZW9uYXJkb2xlZW5lbkBnbWFpbC5jb20iLCJpZCI6ImQ1c2FFTXNGWmVhVm50cTZIZmZvZ2FCSktFSjIiLCJyb2xlIjoiU1VCRElSRUNUT1IiLCJpZGVudGl0eVByb3ZpZGVyIjoiZ29vZ2xlIiwiaXNzdWVkQXQiOjE2NDU2ODc1MjY1NDksIm5hbWUiOiJBbmFsaWEgVHJpYXkiLCJpYXQiOjE2NDYwNTY2NDd9.TBDKtPSswdG5Wqbrusu0WY7-grcLLasK2G2gMPiS2Ag">
                                Subdirectora
                            </option>
                            <option value="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdGF0dXMiOiJFTkFCTEVEIiwiZW1haWwiOiJsZW9uYXJkb2xlZW5lbkBnbWFpbC5jb20iLCJpZCI6ImQ1c2FFTXNGWmVhVm50cTZIZmZvZ2FCSktFSjIiLCJyb2xlIjoiQU5BTElTVEEiLCJpZGVudGl0eVByb3ZpZGVyIjoiZ29vZ2xlIiwiaXNzdWVkQXQiOjE2NDU2ODc1MjY1NDksIm5hbWUiOiJNYXJpZWxhIFBlbGVzc29uIiwiaWF0IjoxNjQ2MDU2NjQ3fQ.lHfa4nuDEa0Q1wXhi-5rqk-XOR6ryAHsLBjsEXlVGxo">
                                Analista
                            </option>
                            <option value="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdGF0dXMiOiJFTkFCTEVEIiwiZW1haWwiOiJsZW9uYXJkb2xlZW5lbkBnbWFpbC5jb20iLCJpZCI6ImQ1c2FFTXNGWmVhVm50cTZIZmZvZ2FCSktFSjIiLCJyb2xlIjoiUkVDRVBUSU9OSVNUIiwiaWRlbnRpdHlQcm92aWRlciI6Imdvb2dsZSIsImlzc3VlZEF0IjoxNjQ1Njg3NTI2NTQ5LCJuYW1lIjoiQW5hbGlzdGEgMSIsImlhdCI6MTY0NjA1NjY0N30.FojbLe3LAKpFfE0Fg08Zar6_iEgsCbXaoKGfl-A2Xwc">
                                Mesa de Entrada
                            </option>
                            <option value="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdGF0dXMiOiJFTkFCTEVEIiwiZW1haWwiOiJsZW9uYXJkb2xlZW5lbkBnbWFpbC5jb20iLCJpZCI6ImQ1c2FFTXNGWmVhVm50cTZIZmZvZ2FCSktFSjIiLCJyb2xlIjoiUkVDRVBUSU9OSVNUIiwiaWRlbnRpdHlQcm92aWRlciI6Imdvb2dsZSIsImlzc3VlZEF0IjoxNjQ1Njg3NTI2NTQ5LCJuYW1lIjoiQW5hbGlzdGEgMiIsImlhdCI6MTY0NjA1NjY0N30.5EzwZQk18maCctnm6WwsLY-Ngmv3NBsO2_3Voqb6nbs">
                                Analista 2
                            </option>
                            <option value="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdGF0dXMiOiJFTkFCTEVEIiwiZW1haWwiOiJsZW9uYXJkb2xlZW5lbkBnbWFpbC5jb20iLCJpZCI6ImQ1c2FFTXNGWmVhVm50cTZIZmZvZ2FCSktFSjIiLCJyb2xlIjoiUkVDRVBUSU9OSVNUIiwiaWRlbnRpdHlQcm92aWRlciI6Imdvb2dsZSIsImlzc3VlZEF0IjoxNjQ1Njg3NTI2NTQ5LCJuYW1lIjoiQW5hbGlzdGEgMyIsImlhdCI6MTY0NjA1NjY0N30.nHbVL76mzOiWLvctcJ4f0kK-DnUQMmV9D4BIEDkXN1s">
                                Analista 3
                            </option>
                            <option value="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdGF0dXMiOiJFTkFCTEVEIiwiZW1haWwiOiJsZW9uYXJkb2xlZW5lbkBnbWFpbC5jb20iLCJpZCI6ImQ1c2FFTXNGWmVhVm50cTZIZmZvZ2FCSktFSjIiLCJyb2xlIjoiU0VDUkVUQVJJTyBDT09SRElOQUNJT04gIiwiaWRlbnRpdHlQcm92aWRlciI6Imdvb2dsZSIsImlzc3VlZEF0IjoxNjQ1Njg3NTI2NTQ5LCJuYW1lIjoiU2VjIENvb3JkaW5hY2lvbiAtIEFub24iLCJpYXQiOjE2NDYwNTY2NDd9.XtgRaENNtf4idJLWDVhEAPiUOKHyGyNZdj8ajFeM0X8">
                                Secretario de Coordinacion
                            </option>
                        </select>
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
