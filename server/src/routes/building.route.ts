import { Router } from 'express'

import { verifyUser } from 'config/auth'
import { addBuilding, getBuildings } from 'controllers/building.controller'

const buildingRouter = Router()

buildingRouter.get('/', verifyUser, getBuildings)
buildingRouter.post('/', verifyUser, addBuilding)

export default buildingRouter
