import { Store } from 'pullstate'

interface IUIPlanningStore {
    campainsSelected: []
    rowSelected: any
}

export const UIPlanningStore = new Store<IUIPlanningStore>({
    campainsSelected: [],
    rowSelected: null
})
