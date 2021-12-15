import { Store } from 'pullstate'

interface IInboxStore {
    providersToApprove: Array<Company>
}

export const InboxStore = new Store<IInboxStore>({
    providersToApprove: []
})
