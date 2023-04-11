import to from 'await-to-js'

import type { ActionCreatorWithPayload, Store } from '@reduxjs/toolkit'
import type { AxiosError, AxiosInstance, AxiosResponse } from 'axios'
import type { RootState } from 'store'

let store: Store<RootState> | undefined
let setToken: ActionCreatorWithPayload<{ token: string }> | undefined
export type AuthResponse = { user: IUserAuth; token: Token }
export type Token = string

export const injectStore = (_store: Store) => {
  store = _store
}

export const injectSetToken = (
  _setToken: ActionCreatorWithPayload<{ token: string }>
) => {
  setToken = _setToken
}

export const JWTInterceptor = <T extends AxiosInstance>(config: any) => {
  if (!store) return config

  const { authState } = store.getState()
  const { token } = authState
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
}

export const ErrorInterceptor =
  <T extends AxiosInstance>(
    instance: T,
    refreshMethod: () => Promise<AxiosResponse<AuthResponse, any>>
  ) =>
  async (err: AxiosError) => {
    const originalConfig = err.config

    if (!originalConfig) {
      return Promise.reject(err)
    }

    // token was expired
    if (err.response) {
      if (err.response.status === 401 && originalConfig.url !== '/refresh') {
        const [error, res] = await to<AxiosResponse, AxiosError>(
          refreshMethod()
        )

        if (error) {
          if (error.response && error.response.data) {
            return Promise.reject(error.response.data)
          }

          return Promise.reject(error)
        }
        if (!res) return
        const { token } = res.data
        if (store && setToken) store.dispatch(setToken({ token }))
        instance.defaults.headers.common.Authorization = `Bearer ${token}`

        return instance(originalConfig)
      }
      if (err.response.status === 403 && err.response.data) {
        return Promise.reject(err.response.data)
      }
    }
    return Promise.reject(err)
  }
