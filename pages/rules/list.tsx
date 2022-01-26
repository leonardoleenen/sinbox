import React from 'react'
import type { NextPage } from 'next'
import Header from '../../components/header'
import Container from '../../components/container'
import InternalPage from '../../components/internalPage'

const Page: NextPage = () => {
    return (
        <div>
            <Header />
            <Container>
                <InternalPage
                    title="Rule List"
                    rigthActions={
                        <button className="btn btn-primary ">New Rule</button>
                    }
                >
                    <div>asdfasdf</div>
                </InternalPage>
            </Container>
        </div>
    )
}

export default Page
