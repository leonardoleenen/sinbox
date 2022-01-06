import { Store } from 'pullstate'

interface IHeaderStore {
    activePage: 'INBOX' | 'OUTBOX'
}

export const HeaderStore = new Store<IHeaderStore>({
    activePage: 'INBOX'
})
