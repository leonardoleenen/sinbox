/* eslint-disable prettier/prettier */
import axios from 'axios'

class PreventivoService {
    async getPreventivo(id: string) {
        return axios
            .get(
                'https://us-central1-sinbox-155b2.cloudfunctions.net/getPreventivo?id=' +
                id // 'https://us-central1-sinbox-155b2.cloudfunctions.net/getPLannings'
            )
            .then(result => result.data)
    }

    async getPreventivos() {
        return axios
            .get(
                'https://us-central1-sinbox-155b2.cloudfunctions.net/getPreventivos' // 'https://us-central1-sinbox-155b2.cloudfunctions.net/getPLannings'
            )
            .then(result => result.data)
    }

    async savePreventivo(preventivo: any) {
        return axios
            .post(
                'https://us-central1-sinbox-155b2.cloudfunctions.net/savePreventivo', //            'https://us-central1-sinbox-155b2.cloudfunctions.net/savePlanning',
                preventivo
            )
            .then(result => result.data)
    }
    async setWaitingPreventivo(id: any) {
        return axios
            .post(
                'https://us-central1-sinbox-155b2.cloudfunctions.net/setWaitingPreventivo?id=' + id //            'https://us-central1-sinbox-155b2.cloudfunctions.net/savePlanning',
            )
            .then(result => result.data)
    }
    async setApprovedPreventivo(id: any) {
        return axios
            .post(
                'https://us-central1-sinbox-155b2.cloudfunctions.net/setApprovedPreventivo?id=' + id //            'https://us-central1-sinbox-155b2.cloudfunctions.net/savePlanning',
            )
            .then(result => result.data)
    }
}

export const preventivoService = new PreventivoService()
