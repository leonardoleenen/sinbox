import axios from 'axios'

class PlanificacionService {
    async getTarriffs() {
        return axios
            .get(
                'https://us-central1-sinbox-155b2.cloudfunctions.net/getTarriff'
            )
            .then(result => result.data)
    }
}

export const planificacionService = new PlanificacionService()
