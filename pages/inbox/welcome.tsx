import React from 'react'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'

const Page: NextPage = () => {
    const router = useRouter()
    return (
        <div>
            <section>
                <div className="container px-4 mx-auto">
                    <nav className="flex justify-between items-center py-6">
                        <a
                            className="text-3xl font-semibold leading-none"
                            href="#"
                        >
                            <img className="h-10 mr-6" src="/logos/inbox.svg" />
                        </a>
                        <div className="lg:hidden">
                            <button className="navbar-burger flex items-center py-2 px-3 text-blue-600 hover:text-blue-700 rounded border border-blue-200 hover:border-blue-300">
                                <svg
                                    className="fill-current h-4 w-4"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <title>Mobile menu</title>
                                    <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
                                </svg>
                            </button>
                        </div>
                        <ul className="hidden lg:flex lg:items-center lg:w-auto lg:space-x-12">
                            <li>
                                <a
                                    className="text-sm text-blueGray-400 hover:text-blueGray-500"
                                    href="#"
                                >
                                    Bandeja de entradas
                                </a>
                            </li>
                            <li>
                                <a
                                    className="text-sm text-blueGray-400 hover:text-blueGray-500"
                                    href="#"
                                >
                                    Preguntas Frecuentes
                                </a>
                            </li>
                            <li>
                                <a
                                    className="text-sm text-blueGray-400 hover:text-blueGray-500"
                                    href="#"
                                    data-removed="true"
                                >
                                    About Us
                                </a>
                            </li>
                            <li>
                                <a
                                    className="text-sm text-blueGray-400 hover:text-blueGray-500"
                                    href="#"
                                    data-removed="true"
                                >
                                    Features
                                </a>
                            </li>
                        </ul>
                        <div className="hidden lg:block">
                            <a
                                className="mr-2 inline-block px-4 py-3 text-xs text-blue-600 hover:text-blue-700 font-semibold leading-none border border-blue-200 hover:border-blue-300 rounded"
                                href="#"
                                data-removed="true"
                            >
                                Log In
                            </a>
                            <a
                                className="inline-block px-4 py-3 text-xs font-semibold leading-none hover:bg-blue-700 text-white rounded bg-red-600"
                                href="#"
                            >
                                Logout
                            </a>
                        </div>
                    </nav>
                    <div className="flex flex-wrap items-center -mx-3">
                        <div className="w-full lg:w-1/2 px-3">
                            <div className="py-12">
                                <div className="max-w-lg lg:max-w-md mx-auto lg:mx-0 mb-8 text-center lg:text-left">
                                    <h2 className="text-3xl md:text-4xl mb-4 font-bold font-heading">
                                        <span>Bienvenido a </span>
                                        <span className="text-blue-600">
                                            Prensa y comunicación
                                        </span>
                                        <span>
                                            {' '}
                                            de la provincia de Santa Fé
                                        </span>
                                    </h2>
                                    <p className="text-blueGray-400 leading-relaxed">
                                        Aquí ud podrá registrar su empresa
                                        (física o juridica) para luego realizar
                                        la presentación de liquidación de
                                        certificación de servicios
                                    </p>
                                </div>
                                <div className="text-center lg:text-left">
                                    <a
                                        onClick={() =>
                                            router.push('/inbox/inscription')
                                        }
                                        className="block sm:inline-block py-4 px-8 mb-4 sm:mb-0 sm:mr-3 text-xs text-white text-center font-semibold leading-none bg-blue-600 hover:bg-blue-700 rounded"
                                        href="#"
                                    >
                                        Nueva Inscripción
                                    </a>
                                    <a
                                        onClick={() =>
                                            router.push('/inbox/how_it_works')
                                        }
                                        className="block sm:inline-block py-4 px-8 text-xs text-blueGray-500 hover:text-blueGray-600 text-center font-semibold leading-none bg-white border border-blueGray-200 hover:border-blueGray-300 rounded"
                                        href="#"
                                    >
                                        Como funciona?
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="w-full lg:w-1/2 px-3 mb-12 lg:mb-0">
                            <div className="lg:h-128 flex items-center justify-center">
                                <img
                                    className="lg:max-w-lg"
                                    src="/illustrations/work-tv.png"
                                    alt=""
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="hidden navbar-menu fixed top-0 left-0 bottom-0 w-5/6 max-w-sm z-50">
                    <div className="navbar-backdrop fixed inset-0 bg-blueGray-800 opacity-25"></div>
                    <nav className="relative flex flex-col py-6 px-6 w-full h-full bg-white border-r overflow-y-auto">
                        <div className="flex items-center mb-8">
                            <a
                                className="mr-auto text-3xl font-semibold leading-none"
                                href="#"
                            >
                                <img
                                    className="h-10"
                                    src="metis-assets/logos/metis/metis.svg"
                                    alt=""
                                    width="auto"
                                />
                            </a>
                            <button className="navbar-close">
                                <svg
                                    className="h-6 w-6 text-blueGray-400 cursor-pointer hover:text-blueGray-500"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    ></path>
                                </svg>
                            </button>
                        </div>
                        <div>
                            <ul>
                                <li className="mb-1">
                                    <a
                                        className="block p-4 text-sm text-blueGray-500 hover:bg-blue-50 hover:text-blue-600"
                                        href="#"
                                    >
                                        Bandeja de entradas
                                    </a>
                                </li>
                                <li className="mb-1">
                                    <a
                                        className="block p-4 text-sm text-blueGray-500 hover:bg-blue-50 hover:text-blue-600"
                                        href="#"
                                    >
                                        Preguntas Frecuentes
                                    </a>
                                </li>
                                <li className="mb-1">
                                    <a
                                        className="block p-4 text-sm text-blueGray-500 hover:bg-blue-50 hover:text-blue-600"
                                        href="#"
                                    >
                                        About Us
                                    </a>
                                </li>
                                <li className="mb-1">
                                    <a
                                        className="block p-4 text-sm text-blueGray-500 hover:bg-blue-50 hover:text-blue-600"
                                        href="#"
                                    >
                                        Features
                                    </a>
                                </li>
                            </ul>
                            <div className="mt-4 pt-6 border-t border-blueGray-100">
                                <a
                                    className="block px-4 py-3 mb-3 text-xs text-center font-semibold leading-none bg-blue-600 hover:bg-blue-700 text-white rounded"
                                    href="#"
                                >
                                    Logout
                                </a>
                                <a
                                    className="block px-4 py-3 mb-2 text-xs text-center text-blue-600 hover:text-blue-700 font-semibold leading-none border border-blue-200 hover:border-blue-300 rounded"
                                    href="#"
                                >
                                    Log In
                                </a>
                            </div>
                        </div>
                        <div className="mt-auto">
                            <p className="my-4 text-xs text-blueGray-400">
                                <span>Get in Touch</span>
                                <a
                                    className="text-blue-600 hover:text-blue-600 underline"
                                    href="#"
                                >
                                    info@example.com
                                </a>
                            </p>
                            <a className="inline-block px-1" href="#">
                                <img
                                    src="metis-assets/icons/facebook-blue.svg"
                                    alt=""
                                />
                            </a>
                            <a className="inline-block px-1" href="#">
                                <img
                                    src="metis-assets/icons/twitter-blue.svg"
                                    alt=""
                                />
                            </a>
                            <a className="inline-block px-1" href="#">
                                <img
                                    src="metis-assets/icons/instagram-blue.svg"
                                    alt=""
                                />
                            </a>
                        </div>
                    </nav>
                </div>
            </section>
        </div>
    )
}

export default Page
