import jwt from 'jsonwebtoken'

export const tokenDecode = (token: string): User => {
    return jwt.decode(token) as User
}

export const setToken = (token: string) => {
    localStorage.setItem('sinbox:token', token)
}
