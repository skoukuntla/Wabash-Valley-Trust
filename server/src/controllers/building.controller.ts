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

export const removeBuilding = async (req: Request, res: Response) => {
  const { buildingId } = req.query
  if (!buildingId)
    return res.status(400).send({ error: new Error('buildingId not provided') })

  const [err] = await to(Building.findByIdAndRemove(buildingId).exec())
  if (err) return res.status(500).send({ err })

  return res.status(200).json({})
}

export const updateBuliding = async (req: Request, res: Response) => {
  const { buildingId } = req.body
  if (!buildingId)
    return res.status(400).send({ error: new Error('buildingId not provided') })

  const buildingUpdate = req.body.building
  const [err, building] = await to(
    Building.findByIdAndUpdate(buildingUpdate).exec()
  )
  if (err) return res.status(500).send({ err })

  return res.status(200).json({ building })
}

export const addBuildings = async (req: Request, res: Response) => {
  if (req.body.name) return addSingleBuilding(req, res)
  if (req.body.buildingId) return updateBuliding(req, res)

  const inbuildings = req.body.buildings
  const [err, buildings] = await to(Building.create(inbuildings))

  if (err) return res.status(500).send({ err })

  return res.json({ buildings })
}
