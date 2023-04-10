import axios from 'axios'

import { getRefreshToken } from './auth'
import { intercepts } from './auth/config'

const BuildingsInstance = axios.create({
  baseURL: `${process.env.REACT_APP_SERVER_URL}/api/buildings`,
  timeout: 1000,
  withCredentials: true,
})

type BuildingsResponse = { buiLdings: IBuilding[] }

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
