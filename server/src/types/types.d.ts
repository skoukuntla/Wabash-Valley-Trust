import type { Document, PassportLocalDocument } from 'mongoose'

type Session = string

interface IUser extends Document {
  firstName: string
  lastName?: string
}

interface IUserAuth extends PassportLocalDocument {
  email: string
  password: string
  refreshTokens: [Session]
}

type LocationType = 'building' | 'neighborhood'

interface IBuilding extends Document {
  name: string
  address: string
  foundingYear: number
  archiStyle: string
  locationType: LocationType
  description: string
  img: string
  coords: number[]
  additionalLinks: string[]
  likes?: number
}
