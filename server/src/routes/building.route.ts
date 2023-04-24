import { Router } from 'express'

import { verifyUser } from 'config/auth'
import {
  addBuildings,
  getBuildings,
  removeBuilding,
} from 'controllers/building.controller'
import { getLikes, updateLikes } from 'controllers/counter.controller'

const buildingRouter = Router()

/*
Building Routes:

- GET / (loationType): returns every building
- POST / (buildings[]): adds every building in buildings
- POST / (name, address, ...): adds one building
- POST / (buildingId, building): where building is a buildingUpdate updates the building
- DELETE / (buildingId): deletes that building
*/

buildingRouter.get('/', getBuildings)
buildingRouter.get('/admin', verifyUser, getBuildings)
buildingRouter.post('/', verifyUser, addBuildings)
buildingRouter.post('/', verifyUser, addBuildings)
buildingRouter.delete('/', verifyUser, removeBuilding)
buildingRouter.post('/likes', updateLikes)
buildingRouter.get('/likes', getLikes)

export default buildingRouter
