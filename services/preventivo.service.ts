/* eslint-disable prettier/prettier */
import axios from 'axios'
import {
    collection,
    doc,
    getDoc,
    getDocs,
    query,
    setDoc
} from 'firebase/firestore'
import { firebaseManager } from './firebase.services'

class PreventivoService {
    async getPreventivo(id: string) {
        const docRef = doc(firebaseManager.getDB(), 'preventivos', id)
        const docSnap = await getDoc(docRef)
        return docSnap.data() as any
        /*return axios
            .get(
                'https://us-central1-sinbox-155b2.cloudfunctions.net/getPreventivo?id=' +
                id // 'https://us-central1-sinbox-155b2.cloudfunctions.net/getPLannings'
            )
            .then(result => result.data) */
    }

    async getPreventivos() {
        const q = query(collection(firebaseManager.getDB(), 'preventivos'))
        return (await getDocs(q)).docs.map(d => d.data() as any)

        /* return axios
            .get(
                'https://us-central1-sinbox-155b2.cloudfunctions.net/getPreventivos' // 'https://us-central1-sinbox-155b2.cloudfunctions.net/getPLannings'
            )
            .then(result => result.data) */
    }

    async savePreventivo(preventivo: any) {
        await setDoc(
            doc(firebaseManager.getDB(), 'preventivos', preventivo.id),
            preventivo
        )

        return preventivo
        /* return axios
            .post(
                'https://us-central1-sinbox-155b2.cloudfunctions.net/savePreventivo', //            'https://us-central1-sinbox-155b2.cloudfunctions.net/savePlanning',
                preventivo
            )
            .then(result => result.data) */
    }
    async setWaitingPreventivo(id: any) {
        const _preventivo = await this.getPreventivo(id)
        await this.savePreventivo({
            ..._preventivo,
            status: 'waiting'
        })

        return {
            ..._preventivo,
            status: 'waiting'
        }

        /*  return axios
            .post(
                'https://us-central1-sinbox-155b2.cloudfunctions.net/setWaitingPreventivo?id=' +
                    id //            'https://us-central1-sinbox-155b2.cloudfunctions.net/savePlanning',
            )
            .then(result => result.data) */
    }

    async setApprovedPreventivo(id: any) {
        const _preventivo = await this.getPreventivo(id)
        await this.savePreventivo({
            ..._preventivo,
            status: 'approved'
        })

        return {
            ..._preventivo,
            status: 'approved'
        }
        /*  return axios
            .post(
                'https://us-central1-sinbox-155b2.cloudfunctions.net/setApprovedPreventivo?id=' +
                    id //            'https://us-central1-sinbox-155b2.cloudfunctions.net/savePlanning',
            )
            .then(result => result.data) */
    }
}

export const preventivoService = new PreventivoService()
