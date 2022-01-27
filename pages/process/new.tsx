import React, { useEffect, useState } from 'react'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'

const Page: NextPage = () => {
    const router = useRouter()

    const { id } = router.query

    return <div>New Form</div>
}

export default Page
