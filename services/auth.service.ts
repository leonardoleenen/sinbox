import jwt from 'jsonwebtoken'
import { firebaseManager } from './firebase.services'
import {
    getDocs,
    collection,
    deleteDoc,
    doc,
    getDoc,
    setDoc
} from 'firebase/firestore'

export const tokenDecode = (token: string): User => {
    return jwt.decode(token) as User
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
    return docSnap.exists()
}

export const getInvite = async (inviteId: string) => {
    const docRef = doc(firebaseManager.getDB(), 'invite', inviteId)
    const docSnap = await getDoc(docRef)
    return docSnap.data()
}

export const registerBackendUser = async (invite: any, user: any) => {
    if (invite.email !== user.email)
        throw 'There is no invite for ' + user.email
    await setDoc(doc(firebaseManager.getDB(), 'users', user.uid), {
        id: user.uid,
        rol: invite.role,
        identityProvider: 'google',
        name: user.displayName
    })
    await deleteDoc(doc(firebaseManager.getDB(), 'invite', invite.id))
}
