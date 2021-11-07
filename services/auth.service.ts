import jwt from 'jsonwebtoken'

export const tokenDecode = (token: string) : User => {
    return jwt.decode(token) as User
}