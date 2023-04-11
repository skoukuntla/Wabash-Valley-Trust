import axios from 'axios'

import { intercepts } from './config'

// https://www.npmjs.com/package/axios-cache-adapter
// best to cache GET requests for better performance

export type AuthResponse = { user: IUserAuth; token: Token }
type Token = string

const AuthInstance = axios.create({
  baseURL: `${process.env.REACT_APP_SERVER_URL}/api/auth`,
  timeout: 1000,
  withCredentials: true,
})

export const register = ({ email, password }: IUserAuth) =>
  AuthInstance.post<AuthResponse>('/register', { email, password })

export const login = ({ email, password }: IUserAuth) =>
  AuthInstance.post<AuthResponse>('/login', { email, password })

// avoid infinite loops when refresh token request fails
export const getRefreshToken = () =>
  AuthInstance.post<AuthResponse>('/refreshToken')

export const getUser = () => AuthInstance.get<Pick<AuthResponse, 'user'>>('/me')

export const logout = () => AuthInstance.post('/logout')

intercepts(AuthInstance, getRefreshToken)
