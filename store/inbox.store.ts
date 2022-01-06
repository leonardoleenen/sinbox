import { Store } from 'pullstate'

interface IInboxStore {
    providersToApprove: Array<Company>
    legalForms: Array<LegalForm>
}

export const InboxStore = new Store<IInboxStore>({
    providersToApprove: [],
    legalForms: []
})
