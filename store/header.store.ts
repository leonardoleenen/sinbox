import { Store } from 'pullstate'

interface IHeaderStore {
    activePage: 'INBOX' | 'OUTBOX' | 'PLANNING'
}

export const HeaderStore = new Store<IHeaderStore>({
    activePage: 'INBOX'
})
