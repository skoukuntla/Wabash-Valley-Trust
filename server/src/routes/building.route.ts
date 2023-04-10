import { Router } from 'express'

import { verifyUser } from 'config/auth'
import { addBuildings, getBuildings } from 'controllers/building.controller'

const buildingRouter = Router()

/*
Building Routes:

- GET / (loationType): returns every building
- POST / (buildings[]): adds every building in buildings
- POST / (name, address, ...): adds one building
*/

buildingRouter.get('/', verifyUser, getBuildings)
buildingRouter.post('/', verifyUser, addBuildings)

export default buildingRouter
