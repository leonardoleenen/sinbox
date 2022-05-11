/* eslint-disable @next/next/no-html-link-for-pages */
import _ from 'lodash'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { getToken, logout, tokenDecode } from '../../services/auth.service'
import { HeaderStore } from '../../store/header.store'
import Icon from '../../components/icon'
interface Props {
    headTitle?: string
}
const Component = (props: Props): JSX.Element => {
    const router = useRouter()
    const [user, setUser] = useState<User>()
    const state = HeaderStore.useState(s => s)

    useEffect(() => {
        setUser(tokenDecode(getToken() as string))
    }, [])
    const closeSession = () => {
        logout()
        router.push('/')
    }

    if (!user) return <></>

    const goTo = (action: string, route: string) => {
        HeaderStore.update(s => {
            s.activePage = action as any
        })

        router.push(route)
    }

    return (
        <div className="px-4 py-8 bg-gray-100">
            <div className="navbar bg-base-100  shadow-xl rounded-box">
                <div className="navbar-start">
                    <div className="dropdown">
                        <label
                            tabIndex={0}
                            className="btn btn-ghost btn-circle"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h16M4 18h7"
                                />
                            </svg>
                        </label>
                        <ul
                            tabIndex={0}
                            className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-64"
                        >
                            <li>
                                <div
                                    className="flex px-3"
                                    onClick={() => router.push('/dashboard')}
                                >
                                    <Icon type={'HOME'} stroke={1} size={24} />
                                    <span>Página principal</span>
                                </div>
                            </li>
                            <li>
                                <div
                                    className="flex px-3"
                                    onClick={() => router.push('/process')}
                                >
                                    <Icon
                                        type={'DOWNLOAD'}
                                        stroke={1}
                                        size={24}
                                    />
                                    <span>Bandeja de entrada</span>
                                </div>
                            </li>

                            <li>
                                <div
                                    className="flex px-3"
                                    onClick={() =>
                                        router.push('/process/completed')
                                    }
                                >
                                    <Icon
                                        type={'UPLOAD'}
                                        stroke={1}
                                        size={24}
                                    />
                                    <span>Procesos Finalizados</span>
                                </div>
                            </li>
                            {user.role !== 'PROVIDER' && (
                                <div>
                                    <li>
                                        <div
                                            className="flex px-3"
                                            onClick={() =>
                                                router.push('/preventivo')
                                            }
                                        >
                                            <Icon
                                                type={'CALCULATOR'}
                                                stroke={1}
                                                size={24}
                                            />
                                            <span>Preventivos</span>
                                        </div>
                                    </li>
                                    <li>
                                        <div
                                            className="flex px-3"
                                            onClick={() =>
                                                router.push('/planning')
                                            }
                                        >
                                            <Icon
                                                type={'PLANNING'}
                                                stroke={1}
                                                size={24}
                                            />
                                            <span>Planificación</span>
                                        </div>
                                    </li>

                                    <div>
                                        <div className="divider">Settings</div>
                                    </div>
                                    <li>
                                        <div
                                            className="flex px-3"
                                            onClick={() =>
                                                router.push('/forms/list')
                                            }
                                        >
                                            <Icon
                                                type={'FORMS'}
                                                stroke={1}
                                                size={24}
                                            />
                                            <span>Formularios</span>
                                        </div>
                                    </li>
                                    <li>
                                        <div
                                            className="flex px-3"
                                            onClick={() =>
                                                router.push('/rules/list')
                                            }
                                        >
                                            <Icon
                                                type={'RULES'}
                                                stroke={1}
                                                size={24}
                                            />
                                            <span>Reglas</span>
                                        </div>
                                    </li>
                                    <li>
                                        <div
                                            className="flex px-3"
                                            onClick={() =>
                                                router.push(
                                                    '/settings/workflow/list'
                                                )
                                            }
                                        >
                                            <Icon
                                                type={'WORKFLOW'}
                                                stroke={1}
                                                size={24}
                                            />
                                            <span>Flujos de trabajo</span>
                                        </div>
                                    </li>
                                </div>
                            )}
                        </ul>
                    </div>
                </div>
                <div className="navbar-center">
                    <a className="btn btn-ghost normal-case text-xl">
                        {props.headTitle || 'Simple workspace'}
                    </a>
                </div>
                <div className="navbar-end">
                    <div className="pr-4">{` ${user.role}`}</div>
                    <div className="dropdown dropdown-end">
                        <label
                            tabIndex={0}
                            className="btn btn-ghost btn-circle avatar"
                        >
                            <div className="w-10 rounded-full">
                                <Icon type="USER" stroke={1} />
                            </div>
                        </label>
                        <ul
                            tabIndex={0}
                            className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-64"
                        >
                            <li>
                                <a className="justify-between">
                                    <span className="badge">User</span>
                                </a>
                            </li>
                            <li>
                                <a>{user.role}</a>
                            </li>

                            <li>
                                <a onClick={() => closeSession()}>Salir</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Component

/* 
<section style={{ backgroundColor: 'rgb(30,41,59)' }}>
            <div className="navbar ">
                <div className="flex-1 px-2 lg:flex-none">
                    <a className="text-lg text-white font-bold">Sinbox</a>
                </div>
                <div className="flex justify-end flex-1 px-2 py-2 text-sm">
                    <div className="flex items-stretch">
                        <div className="dropdown dropdown-end">
                            <div className="flex items-center">
                                <div
                                    className="btn btn-ghost rounded-btn"
                                    tabIndex={0}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-6 w-6"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="white"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={1}
                                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                        />
                                    </svg>
                                </div>
                            </div>
                            <ul
                                tabIndex={0}
                                className="p-2 shadow menu dropdown-content bg-base-100 rounded-box w-52"
                            >
                                <li>
                                    <a>{`${user.name}`}</a>
                                </li>
                                <li>
                                    <a>{user.role}</a>
                                </li>

                                <li>
                                    <a onClick={() => closeSession()}>Salir</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
*/
