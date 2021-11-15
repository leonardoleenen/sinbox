import { Store } from 'pullstate'

interface ISignUpStore {
    user: any
}

export const SignUpStore = new Store<ISignUpStore>({
    user: null
})
