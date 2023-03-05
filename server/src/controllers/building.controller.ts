import to from 'await-to-js'

import Building from 'models/building.model'

import type { Request, Response } from 'express'

export const getBuildings = async (req: Request, res: Response) => {
  const [error, buildings] = await to(Building.find({}).lean().exec())
  if (error) return res.status(500).send({ error })

  return res.json({ buildings })
}

export const addBuilding = async (req: Request, res: Response) => {
  const {
    name,
    address,
    foundingYear,
    archiStyle,
    locationType,
    img,
    coords,
    additionalLinks,
  } = req.body

  if (!name || !address || !coords)
    return res
      .status(400)
      .send({ error: new Error('name, address, coords required') })

  const [error, building] = await to(
    Building.create({
      name,
      address,
      foundingYear,
      archiStyle,
      locationType,
      img,
      coords,
      additionalLinks,
    })
  )

  if (error) return res.status(500).send({ error })
  return res.json({ building })
}
