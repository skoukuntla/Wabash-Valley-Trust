import { Router } from 'express'

import userRouter from 'routes/user.route'

import authRouter from './auth.route'
import buildingRouter from './building.route'

const rootRouter = Router()

rootRouter.use('/user', userRouter)
rootRouter.use('/auth', authRouter)
rootRouter.use('/buildings', buildingRouter)

export default rootRouter
