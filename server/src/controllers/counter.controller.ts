import to from 'await-to-js'

import Building from 'models/building.model'

import type { Request, Response } from 'express'

export const updateLikes = async (req: Request, res: Response) => {
  const { buildingId, amount } = req.body
  if (!buildingId || !amount)
    return res
      .status(400)
      .send({ error: new Error('please provide a buildingId and amount') })

  const [error] = await to(
    Building.findByIdAndUpdate(buildingId, { $inc: { likes: amount } }).exec()
  )
  if (error) return res.status(500).send({ error })

  return res.status(200).json({})
}

export const getLikes = async (req: Request, res: Response) => {
  const buildingID = req.query
  if (!buildingID)
    return res
      .status(400)
      .send({ error: new Error('please provide a buildingId') })
  const [error, building] = await to(Building.findById(buildingID).exec())
  if (!building) return res.status(404).send({ error })
  if (error) return res.status(500).send({ error })
  console.log(building)
  return res.status(200).json({ likes: building.likes })
}
