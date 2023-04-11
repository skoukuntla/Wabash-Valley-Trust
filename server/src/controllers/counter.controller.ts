import to from 'await-to-js'

import Building from 'models/building.model'

import type { Request, Response } from 'express'

const updateLikes = async (req: Request, res: Response) => {
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

export default updateLikes
