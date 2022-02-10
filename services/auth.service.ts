import jwt from 'jsonwebtoken'
import axios from 'axios'
const API_URL: any = process.env.API_URL

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
        name: user.displayName
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

export const getInvites = async () => {
    const {
        data: { data: response }
    } = await axios.get<ApiResponse>(
        `${API_URL}/api/store/${process.env.STORE}/auth/invite`
    )
    return response
}

export const getRouteAfterLogin = () => {
    if (!tokenDecode(getToken() as string)) return '/signup'

    if (tokenDecode(getToken() as string).role === 'ESCRIBANO')
        return '/registro/modulo1'

    if (
        tokenDecode(getToken() as string).role === 'SUPERVISOR' ||
        tokenDecode(getToken() as string).role === 'BACKOFFICE' ||
        tokenDecode(getToken() as string).role === 'RECEPTIONIST' ||
        tokenDecode(getToken() as string).role === 'CERT RECEPTIONIST' ||
        tokenDecode(getToken() as string).role === 'CERT SUPERVISOR'
    )
        return '/inbox'
}

export const logout = () => {
    localStorage.removeItem('sinbox:token')
}
