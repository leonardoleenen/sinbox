import jwt from 'jsonwebtoken'
import { firebaseManager } from './firebase.services'
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite'

export const tokenDecode = (token: string): User => {
    return jwt.decode(token) as User
}

export const setToken = (token: string) => {
    localStorage.setItem('sinbox:token', token)
}

export const userAlreadyExist = async (id: string) => {
    const usersCol = collection(firebaseManager.getDB(), 'users')
    const users = await getDocs(usersCol)
    console.log(users)

    return false
}
