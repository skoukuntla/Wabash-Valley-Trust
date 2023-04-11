import { Router } from 'express'

import { verifyUser } from 'config/auth'
import { addBuildings, getBuildings } from 'controllers/building.controller'
import updateLikes from 'controllers/counter.controller'

const buildingRouter = Router()

/*
Building Routes:

- GET / (loationType): returns every building
- POST / (buildings[]): adds every building in buildings
- POST / (name, address, ...): adds one building
*/

buildingRouter.get('/', verifyUser, getBuildings)
buildingRouter.post('/', verifyUser, addBuildings)
buildingRouter.post('/likes', verifyUser, updateLikes)

export default buildingRouter
