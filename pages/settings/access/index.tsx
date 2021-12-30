import React, { useEffect, useState } from 'react'
import type { NextPage } from 'next'
import Header from '../../../components/header'
import Container from '../../../components/container'
import { getInvites } from '../../../services/auth.service'
import Link from 'next/link'
const Page: NextPage = () => {
    const [invites, setInvites] = useState<Array<UserInvite>>([])

    useEffect(() => {
        getInvites().then(result =>
            setInvites(result.docs.map(d => d.data() as UserInvite))
        )
    }, [])

    return (
        <div>
            <Header />
            <Container>
                <div className="my-6 flex justify-between">
                    <h2 className="text-2xl mb-2 leading-tight font-bold font-heading">
                        Usuarios del sistema
                    </h2>
                    <div>
                        <button className="btn btn-outline btn-primary">
                            Invitar
                        </button>{' '}
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="table w-full table-zebra">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Email</th>
                                <th>Rol</th>
                                <th>Estado</th>
                                <th>Link</th>
                                <th>Accion</th>
                            </tr>
                        </thead>
                        <tbody>
                            {invites.map((invite, index) => (
                                <tr key={`invite${index}`}>
                                    <td>{invite.id}</td>
                                    <td>{invite.email}</td>
                                    <td>{invite.role}</td>
                                    <td>Pending</td>
                                    <td>
                                        <Link
                                            href={`${document.location.origin}/?invite=${invite.id}`}
                                        >
                                            Link de Acceso
                                        </Link>
                                    </td>
                                    <td>Accion</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Container>
        </div>
    )
}

export default Page
