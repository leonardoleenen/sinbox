/* eslint-disable prettier/prettier */
import axios from 'axios'
import {
    getDocs,
    query,
    collection,
    getDoc,
    doc,
    updateDoc,
    setDoc
} from 'firebase/firestore'
import { firebaseManager } from './firebase.services'

class PlanificacionService {
    async getTarriffs() {
        const q = query(collection(firebaseManager.getDB(), 'tarriff'))
        return (await getDocs(q)).docs.map(d => d.data() as any)

        /* return axios
            .get(
                'https://us-central1-sinbox-155b2.cloudfunctions.net/getTarriff'
            )
            .then(result => result.data) */
    }

    async getPlanificacion(id: string) {
        const docRef = doc(firebaseManager.getDB(), 'planning', id)
        const docSnap = await getDoc(docRef)
        return docSnap.data() as any

        /*  return axios
            .get(
                'https://us-central1-sinbox-155b2.cloudfunctions.net/getPlanning?id=' +
                    id // 'https://us-central1-sinbox-155b2.cloudfunctions.net/getPLannings'
            )
            .then(result => result.data) */
    }
    async setApprovedPlanning(id: string) {
        await updateDoc(doc(firebaseManager.getDB(), 'planning', id), {
            status: 'approved'
        })

        /* return axios
            .post(
                'https://us-central1-sinbox-155b2.cloudfunctions.net/setApprovedPlanning?id=' +
                    id // 'https://us-central1-sinbox-155b2.cloudfunctions.net/getPLannings'
            )
            .then(result => result.data) */
    }
    async setWaitingPlanning(id: string) {
        await updateDoc(doc(firebaseManager.getDB(), 'planning', id), {
            status: 'waiting'
        })
        /*  return axios
            .post(
                'https://us-central1-sinbox-155b2.cloudfunctions.net/setWaitingPlanning?id=' +
                    id // 'https://us-central1-sinbox-155b2.cloudfunctions.net/getPLannings'
            )
            .then(result => result.data) */
    }
    async getPanificaciones() {
        const q = query(collection(firebaseManager.getDB(), 'planning'))
        return (await getDocs(q)).docs.map(d => d.data() as any)
        /* return axios
            .get(
                'https://us-central1-sinbox-155b2.cloudfunctions.net/getPLannings' // 'https://us-central1-sinbox-155b2.cloudfunctions.net/getPLannings'
            )
            .then(result => result.data) */
    }

    async getEntidadesPagadoras() {
        const q = query(
            collection(firebaseManager.getDB(), 'entidadesPagadoras')
        )
        return (await getDocs(q)).docs.map(d => d.data() as any)
    }
    async savePlanificacion(planificacion: any) {
        setDoc(
            doc(firebaseManager.getDB(), 'planning', planificacion.id),
            {
                ...planificacion,
                createdAt: new Date().getTime()
            }
        )

        return planificacion
        /* return axios
            .post(
                'https://us-central1-sinbox-155b2.cloudfunctions.net/savePlanning', //            'https://us-central1-sinbox-155b2.cloudfunctions.net/savePlanning',
                planificacion
            )
            .then(result => result.data) */
    }
}

export const planificacionService = new PlanificacionService()
