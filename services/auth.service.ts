import jwt from 'jsonwebtoken'
import { firebaseManager } from './firebase.services'
import {
    getDocs,
    collection,
    deleteDoc,
    doc,
    getDoc,
    setDoc,
    query
} from 'firebase/firestore'

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
    const docRef = doc(firebaseManager.getDB(), 'users', id)
    const docSnap = await getDoc(docRef)
    return docSnap.data()
}

export const getInvite = async (inviteId: string) => {
    const docRef = doc(firebaseManager.getDB(), 'invite', inviteId)
    const docSnap = await getDoc(docRef)
    return docSnap.data()
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
    await setDoc(doc(firebaseManager.getDB(), 'users', user.uid), newUser)

    await deleteDoc(doc(firebaseManager.getDB(), 'invite', invite.id))
    return newUser
}

export const getInvites = async () => {
    const q = query(collection(firebaseManager.getDB(), 'invite'))
    return getDocs(q)
}

export const getRouteAfterLogin = () => {
    if (tokenDecode(getToken() as string).role === 'ESCRIBANO')
        return '/registro/modulo1'

    if (
        tokenDecode(getToken() as string).role === 'SUPERVISOR' ||
        tokenDecode(getToken() as string).role === 'BACKOFFICE'
    )
        return '/inbox'
}

export const logout = () => {
    localStorage.clear()
}
