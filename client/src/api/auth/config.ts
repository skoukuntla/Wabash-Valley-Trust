import {
  ErrorInterceptor,
  JWTInterceptor,
  injectSetToken,
  injectStore,
} from './intercepts'

import type { AuthResponse } from './intercepts'
import type { ActionCreatorWithPayload, Store } from '@reduxjs/toolkit'
import type { AxiosInstance, AxiosResponse } from 'axios'

export const inject = (
  store: Store,
  setToken: ActionCreatorWithPayload<{ token: string }>
) => {
  injectStore(store)
  injectSetToken(setToken)
}

// This must be called on every axios instance we create in order to
// embed the JWT token into our requests (which authorizes it)
export const intercepts = <T extends AxiosInstance>(
  instance: T,
  refreshMethod: () => Promise<AxiosResponse<AuthResponse, any>>
) => {
  instance.interceptors.request.use(JWTInterceptor, (error) =>
    Promise.reject(error)
  )

  instance.interceptors.response.use(
    (res) => res,
    ErrorInterceptor(instance, refreshMethod)
  )
}
