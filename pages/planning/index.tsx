import React, { useEffect } from 'react'
import type { NextPage } from 'next'
import Header from '../../components/header'
import Container from '../../components/container'
import InternalContainer from '../../components/container/internal'
import { planificacionService } from '../../services/planificacion.service'
import { useRouter } from 'next/router'

const Page: NextPage = () => {
    const router = useRouter()
    useEffect(() => {
        planificacionService
            .getPanificaciones()
            .then(result => console.log(result))
    }, [])
    return (
        <div>
            <Header />
            <Container>
                <InternalContainer
                    title="Planificación"
                    actions={
                        <button
                            className="btn btn-primary"
                            onClick={() => router.push('/planning/new')}
                        >
                            Nueva planificación
                        </button>
                    }
                >
                    <div>Lista</div>
                </InternalContainer>
            </Container>
        </div>
    )
}

export default Page
