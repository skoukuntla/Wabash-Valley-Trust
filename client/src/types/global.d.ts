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
