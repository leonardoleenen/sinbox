import { Store } from 'pullstate'

interface ISignUpStore {
    user: any
    userCn: string
    email: string
    personalId: string
}

export const SignUpStore = new Store<ISignUpStore>({
    user: null,
    userCn: '',
    email: '',
    personalId: ''
})
