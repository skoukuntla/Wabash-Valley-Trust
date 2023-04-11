import to from 'await-to-js'

import Building from 'models/building.model'

import type { Request, Response } from 'express'

export const getBuildings = async (req: Request, res: Response) => {
  const { locationType } = req.query
  if (!locationType)
    return res
      .status(400)
      .send({ error: new Error('please provide a locationType') })

  const [error, buildings] = await to(
    Building.find({ locationType }).lean().exec()
  )
  if (error) return res.status(500).send({ error })

  return res.json({ buildings })
}

const addSingleBuilding = async (req: Request, res: Response) => {
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

export const addBuildings = async (req: Request, res: Response) => {
  if (req.body.name) return addSingleBuilding(req, res)

  const inbuildings = req.body.buildings
  const [err, buildings] = await to(Building.create(inbuildings))

  if (err) return res.status(500).send({ err })

  return res.json({ buildings })
}
