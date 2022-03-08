import axios from 'axios'

class PlanificacionService {
    async getTarriffs() {
        return axios
            .get(
                'https://us-central1-sinbox-155b2.cloudfunctions.net/getTarriff'
            )
            .then(result => result.data)
    }

    async getPlanificacion(id: string) {
        return axios
            .get(
                'http://localhost:5001/sinbox-155b2/us-central1/getPlanning?id=' +
                    id // 'https://us-central1-sinbox-155b2.cloudfunctions.net/getPLannings'
            )
            .then(result => result.data)
    }

    async getPanificaciones() {
        return axios
            .get(
                'http://localhost:5001/sinbox-155b2/us-central1/getPLannings' // 'https://us-central1-sinbox-155b2.cloudfunctions.net/getPLannings'
            )
            .then(result => result.data)
    }

    async savePlanificacion(planificacion: any) {
        return axios
            .post(
                'http://localhost:5001/sinbox-155b2/us-central1/savePlanning', //            'https://us-central1-sinbox-155b2.cloudfunctions.net/savePlanning',
                planificacion
            )
            .then(result => result.data)
    }
}

export const planificacionService = new PlanificacionService()
