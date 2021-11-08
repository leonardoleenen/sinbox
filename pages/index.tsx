import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useEffect } from 'react'
import { tokenDecode } from '../services/auth.service'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
    useEffect( () => {

        console.log(tokenDecode('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyLCJpZCI6Imxlb25hcmRvbGVlbmVuQGdtYWlsLmNvbSIsInJvbGUiOiJFWFRFUk5BTCBVU0VSIn0.uXv8owTA-iKSsh7Bk7lOOb4lnbtQzX2KcYnEAeMvFm0'))
    },[])
    return <div className={styles.container}>HOla Mundo!!!</div>
}

export default Home
