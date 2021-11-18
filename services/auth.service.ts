import jwt from 'jsonwebtoken'
import { firebaseManager } from './firebase.services'
import { getDocs, collection, doc, getDoc } from 'firebase/firestore'

export const tokenDecode = (token: string): User => {
    return jwt.decode(token) as User
}

export const setToken = (token: string) => {
    localStorage.setItem('sinbox:token', token)
}

export const userAlreadyExist = async (id: string) => {
    const docRef = doc(firebaseManager.getDB(), 'users', id)
    const docSnap = await getDoc(docRef)

    return docSnap.exists()
}
