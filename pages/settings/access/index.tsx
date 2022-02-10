import React, { useEffect, useState } from 'react'
import type { NextPage } from 'next'
import Header from '../../../components/header'
import Container from '../../../components/container'
import { getInvites, getUsers } from '../../../services/auth.service'
import Link from 'next/link'
import { useRouter } from 'next/router'
import moment from 'moment'
const Page: NextPage = () => {
    const [invites, setInvites] = useState<Array<UserInvite>>([])
    const [users, setUsers] = useState<Array<User>>([])

    const router = useRouter()
    useEffect(() => {
        getInvites().then(result =>
            setInvites(result.docs.map(d => d.data() as UserInvite))
        )

        getUsers().then(result => setUsers(result))
    }, [])

    return (
        <div>
            <Header />
            <Container>
                <div className="my-6 flex justify-between">
                    <h2 className="text-2xl mb-2 leading-tight font-bold font-heading">
                        Invitaciones de Acceso
                    </h2>
                    <div>
                        <button
                            className="btn btn-outline btn-primary"
                            onClick={() => router.push('/settings/access/new')}
                        >
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
                                    <td className="cursor-pointer link link-primary">
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

                <div className="mt-16 mb-4">
                    <h2 className="text-2xl mb-2 leading-tight font-bold font-heading">
                        Usuarios del sistema
                    </h2>
                </div>
                <div className="overflow-x-auto">
                    <table className="table w-full table-zebra">
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Email</th>
                                <th>Rol</th>
                                <th>Estado</th>
                                <th>REgistrado el</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((u, index) => (
                                <tr key={`user${index}`}>
                                    <td>{u.name}</td>
                                    <td>{u.email}</td>
                                    <td>{u.role}</td>
                                    <td>{u.status}</td>
                                    <td>
                                        {moment(u.issuedAt).format(
                                            'DD/MM/YYY HH:mm:SS'
                                        )}
                                    </td>
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
