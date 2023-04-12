// images
declare module '*.jpg'
declare module '*.jpeg'
declare module '*.png'
declare module '*.ico'

// user
interface IUser {
  _id?: string
  firstName: string
  lastName?: string
}

interface IUserAuth {
  email: string
  password: string
}

// buildings

type LocationType = 'building' | 'neighborhood'

interface IBuilding {
  _id?: string
  name: string
  address: string
  foundingYear: number
  archiStyle: string
  locationType: LocationType
  description: string
  img: string
  coords: number[]
  additionalLinks: string[]
  likes?: number // don't initialize this on the client side
}

interface BuildingUpdate {
  name?: string
  address?: string
  foundingYear?: number
  archiStyle?: string
  locationType?: LocationType
  description?: string
  img?: string
  coords?: number[]
  additionalLinks?: string[]
}
