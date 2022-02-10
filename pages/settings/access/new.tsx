import React, { useState } from 'react'
import type { NextPage } from 'next'
import ClearContainer from '../../../components/container/clear'
import { createInvite } from '../../../services/auth.service'
import { useRouter } from 'next/router'

const Page: NextPage = () => {
    const [isSaving, setIsSaving] = useState(false)
    const [email, setEmail] = useState('')
    const [role, setRole] = useState('')
    const router = useRouter()
    const save = async () => {
        setIsSaving(true)
        await createInvite(email, role)
        setIsSaving(false)
        router.push('/settings/access')
    }
    return (
        <ClearContainer
            title="Nueva Invitación"
            actions={
                <div className="flex">
                    <button
                        className="btn btn-error mr-4"
                        onClick={() => router.push('/settings/access')}
                    >
                        Volver
                    </button>
                    <button
                        className={`btn btn-primary ${isSaving && 'loading'}`}
                        onClick={save}
                    >
                        Crear
                    </button>
                </div>
            }
        >
            <div>
                <div className="form-control w-1/2">
                    <label className="label">
                        <span className="label-text">Email de la persona</span>
                    </label>
                    <input
                        type="text"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        placeholder="Email"
                        className="input input-bordered"
                    />
                </div>

                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Email de la persona</span>
                    </label>
                    <select
                        onChange={e => setRole(e.target.value)}
                        className="select select-bordered w-full max-w-xs"
                    >
                        <option value={'PROVIDER'}>PROVIDER</option>
                        <option value={'RECEPTIONIST'}>RECEPTIONIST</option>
                        <option value={'SUPERVISOR'}>SUPERVISOR</option>
                        <option value={'SUB CHIEF'}>SUB CHIEF</option>
                        <option value={'CHIEF'}>CHIEF</option>
                    </select>
                </div>
            </div>
        </ClearContainer>
    )
}

export default Page
