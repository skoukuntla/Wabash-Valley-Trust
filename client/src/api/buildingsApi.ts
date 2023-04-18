import axios from 'axios'

import { getRefreshToken } from './auth'
import { intercepts } from './auth/config'

const BuildingsInstance = axios.create({
  baseURL: `${process.env.REACT_APP_SERVER_URL}/api/buildings`,
  timeout: 1000,
  withCredentials: true,
})

const UnprotectedBuildingsInstance = axios.create({
  baseURL: `${process.env.REACT_APP_SERVER_URL}/api/buildings`,
  timeout: 1000,
  withCredentials: false,
})

type BuildingsResponse = { buildings: IBuilding[] }
type CounterResponse = { likes: number }

intercepts(BuildingsInstance, getRefreshToken)

// Call this to get all buildings with locationType == 'building'
export const getBuildings = () =>
  BuildingsInstance.get<BuildingsResponse>('/', {
    params: { locationType: 'building' },
  })

// Call this to get all buildings with locationType == 'neighborhood'
export const getNeighborhoods = () =>
  BuildingsInstance.get<BuildingsResponse>('/', {
    params: { locationType: 'neighborhood' },
  })

// Call this to add all the buildings in the array
export const addBuildings = (buildings: IBuilding[]) =>
  BuildingsInstance.post<BuildingsResponse>('/', { buildings })

// Call this to update this specific building
export const updateBuilding = (buildingId: string, building: BuildingUpdate) =>
  BuildingsInstance.post<BuildingsResponse>('/', { buildingId, building })

// Call this to remove the building with the corresponding id
export const removeBuilding = (buildingId: string) =>
  BuildingsInstance.delete<BuildingsResponse>('/', { data: { buildingId } })

// Call this to add one like to the buildingIda (very bad practice)
export const like = (buildingId: string) =>
  UnprotectedBuildingsInstance.post<CounterResponse>('/likes', {
    buildingId,
    amount: 1,
  })

// Call this to remove one like from the buildingId (very bad practice)
export const removeLike = (buildingId: string) =>
  UnprotectedBuildingsInstance.post<CounterResponse>('/likes', {
    buildingId,
    amount: -1,
  })

// Call this to get the number of likes from the buildingID
export const getLikes = (buildingId: string) =>
  UnprotectedBuildingsInstance.get<CounterResponse>('/likes', {
    params: { _id: buildingId },
  })
