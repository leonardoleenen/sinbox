/* eslint-disable prettier/prettier */
import axios from 'axios'

class PreventivoService {
    async getPreventivo(id: string) {
        return axios
            .get(
                'http://localhost:5001/sinbox-155b2/us-central1/getPreventivo?id=' +
                id // 'https://us-central1-sinbox-155b2.cloudfunctions.net/getPLannings'
            )
            .then(result => result.data)
    }

    async getPreventivos() {
        return axios
            .get(
                'http://localhost:5001/sinbox-155b2/us-central1/getPreventivos' // 'https://us-central1-sinbox-155b2.cloudfunctions.net/getPLannings'
            )
            .then(result => result.data)
    }

    async savePreventivo(preventivo: any) {
        return axios
            .post(
                'http://localhost:5001/sinbox-155b2/us-central1/savePreventivo', //            'https://us-central1-sinbox-155b2.cloudfunctions.net/savePlanning',
                preventivo
            )
            .then(result => result.data)
    }
    async setWaitingPreventivo(id: any) {
        return axios
            .post(
                'http://localhost:5001/sinbox-155b2/us-central1/setWaitingPreventivo?id=' + id //            'https://us-central1-sinbox-155b2.cloudfunctions.net/savePlanning',
            )
            .then(result => result.data)
    }
    async setApprovedPreventivo(id: any) {
        return axios
            .post(
                'http://localhost:5001/sinbox-155b2/us-central1/setApprovedPreventivo?id=' + id //            'https://us-central1-sinbox-155b2.cloudfunctions.net/savePlanning',
            )
            .then(result => result.data)
    }
}

export const preventivoService = new PreventivoService()
