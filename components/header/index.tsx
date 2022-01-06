/* eslint-disable @next/next/no-html-link-for-pages */
import _ from 'lodash'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { getToken, logout, tokenDecode } from '../../services/auth.service'
import { HeaderStore } from '../../store/header.store'

const Component = (): JSX.Element => {
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
        <section>
            <div className="navbar ">
                <div className="flex-1 px-2 lg:flex-none">
                    <a className="text-lg font-bold">Sinbox</a>
                </div>
                <div className="flex justify-end flex-1 px-2">
                    <div className="flex items-stretch">
                        <ul className="menu items-stretch px-3  bg-base-100 horizontal ">
                            <li
                                className={
                                    state.activePage === 'INBOX'
                                        ? 'bordered'
                                        : ''
                                }
                            >
                                <a onClick={() => goTo('INBOX', 'inbox')}>
                                    Inbox
                                </a>
                            </li>
                            <li
                                className={
                                    state.activePage === 'OUTBOX'
                                        ? 'bordered'
                                        : ''
                                }
                            >
                                <a onClick={() => goTo('OUTBOX', 'outbox')}>
                                    Outbox
                                </a>
                            </li>
                        </ul>

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
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
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
    )
}

export default Component
