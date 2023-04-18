import { Schema, SchemaTypes, model } from 'mongoose'

import type { Model } from 'mongoose'
import type { IBuilding } from 'types/types'

const BuildingSchema = new Schema<IBuilding>({
  name: {
    type: SchemaTypes.String,
    required: true,
  },
  address: {
    type: SchemaTypes.String,
    required: true,
  },
  description: SchemaTypes.String,
  foundingYear: SchemaTypes.String,
  archiStyle: SchemaTypes.String,
  locationType: SchemaTypes.String,
  img: SchemaTypes.String,
  coords: {
    type: [SchemaTypes.Number],
    required: true,
  },
  likes: {
    type: SchemaTypes.Number,
    default: 0,
  },
  additionalLinks: [SchemaTypes.String],
})

const Building = model('building', BuildingSchema) as Model<IBuilding>

export default Building
