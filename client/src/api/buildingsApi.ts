import axios from 'axios'

import { getRefreshToken } from './auth'
import { intercepts } from './auth/config'

const BuildingsInstance = axios.create({
  baseURL: `${process.env.REACT_APP_SERVER_URL}/api/buildings`,
  timeout: 1000,
  withCredentials: true,
})

type BuildingsResponse = { buiLdings: IBuilding[] }
type CounterResponse = {}

intercepts(BuildingsInstance, getRefreshToken)

// Call this to get all buildings with locationType == 'buildings'
export const getBuildings = () =>
  BuildingsInstance.get<BuildingsResponse>('/', {
    params: { locationType: 'building' },
  })

// Call this to get all buildings with locationType == 'neighborhoods'
export const getNeighborhoods = () =>
  BuildingsInstance.get<BuildingsResponse>('/', {
    params: { locationType: 'neighborhood' },
  })

// Call this to add all the buildings in the array
export const addBulidings = (buildings: IBuilding[]) =>
  BuildingsInstance.post<BuildingsResponse>('/', { buildings })

// Call this to add one like to the buildingId
export const like = (buildingId: string) =>
  BuildingsInstance.post<CounterResponse>('/likes', { buildingId, amount: 1 })

// Call this to remove one like from the buildingId
export const removeLike = (buildingId: string) =>
  BuildingsInstance.post<CounterResponse>('/likes', { buildingId, amount: -1 })
