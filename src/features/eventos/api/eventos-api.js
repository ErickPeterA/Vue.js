import { requisitar } from '../../../api/http.js'

export const listarEventos = () => requisitar('/eventos')
export const buscarEvento = (id) => requisitar(`/eventos/${encodeURIComponent(id)}`)
