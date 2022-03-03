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
        <div className="p-4">
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
                            className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
                        >
                            <li>
                                <a>Homepage</a>
                            </li>
                            <li>
                                <a>Portfolio</a>
                            </li>
                            <li>
                                <a>About</a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="navbar-center">
                    <a className="btn btn-ghost normal-case text-xl">
                        Simple Workspace
                    </a>
                </div>
                <div className="navbar-end">
                    <button className="btn btn-ghost btn-circle">
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
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                            />
                        </svg>
                    </button>
                    <button className="btn btn-ghost btn-circle">
                        <div className="indicator">
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
                                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                                />
                            </svg>
                            <span className="badge badge-xs badge-primary indicator-item"></span>
                        </div>
                    </button>
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
