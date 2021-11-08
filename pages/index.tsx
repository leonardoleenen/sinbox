import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useEffect } from 'react'
import { setToken, tokenDecode } from '../services/auth.service'
import styles from '../styles/Home.module.css'
import { useRouter } from 'next/router'

const Home: NextPage = () => {
    const router = useRouter()
    const { token } = router.query

    useEffect(() => {
        setToken(token as string)
        // tokenDecode(token).role=''
    }, [token])
    return <div className={styles.container}>HOla Mundo!!!</div>
}

export default Home
