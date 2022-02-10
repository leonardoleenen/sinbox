import jwt from 'jsonwebtoken'
import { firebaseManager } from './firebase.services'
import { getDocs, collection, doc, setDoc, query } from 'firebase/firestore'
import { nanoid } from 'nanoid'
import axios from 'axios'
const API_URL = process.env.API_URL
export const tokenDecode = (token: string): User => {
    return jwt.decode(token) as User
}

export const getToken = () => {
    return localStorage.getItem('sinbox:token')
}

export const generateToken = (user: User) => {
    return jwt.sign(user, 'sinbox')
}

export const setToken = (token: string) => {
    localStorage.setItem('sinbox:token', token)
}

export const setCredentials = (publicKey: string) => {
    localStorage.setItem('sinbox:key', publicKey)
}

export const userAlreadyExist = async (id: string) => {
    const { data: response } = await axios.get<ApiResponse>(
        `${API_URL}/api/store/${process.env.STORE}/auth/user/${id}`
    )
    return response.data
}

export const getInvite = async (inviteId: string) => {
    const {
        data: { data: response }
    } = await axios.get<ApiResponse>(
        `${API_URL}/api/store/${process.env.STORE}/auth/invite?id=${inviteId}`
    )
    return response
}

export const registerBackendUser = async (invite: any, user: any) => {
    if (invite.email !== user.email)
        throw 'There is no invite for ' + user.email

    const newUser = {
        id: user.uid,
        role: invite.role,
        identityProvider: 'google',
        name: user.displayName,
        status: 'ENABLED',
        email: user.email,
        issuedAt: new Date().getTime()
    }
    const {
        data: { data: response }
    } = await axios.post<ApiResponse>(
        `${API_URL}/api/store/${process.env.STORE}/auth/user/save`,
        { data: newUser }
    )

    await axios.delete<ApiResponse>(
        `${API_URL}/api/store/${process.env.STORE}/auth/invite?id=$${invite.id}`
    )
    return newUser
}

export const getUsers = async () => {
    const q = query(collection(firebaseManager.getDB(), 'users'))
    return (await getDocs(q)).docs.map(d => d.data() as User)
}

export const getInvites = async () => {
    const {
        data: { data: response }
    } = await axios.get<ApiResponse>(
        `${API_URL}/api/store/${process.env.STORE}/auth/invite`
    )
    return response
}

export const createInvite = async (email: string, role: string) => {
    const invite: UserInvite = {
        id: nanoid(10),
        issuedAt: new Date().getTime(),
        email,
        role
    }

    await setDoc(doc(firebaseManager.getDB(), 'invite', invite.id), invite)
    return invite
}

export const getRouteAfterLogin = () => {
    if (!tokenDecode(getToken() as string)) return '/signup'

    if (tokenDecode(getToken() as string).role === 'ESCRIBANO')
        return '/registro/modulo1'
    else {
        return '/process'
    }
}

export const logout = () => {
    localStorage.removeItem('sinbox:token')
}
