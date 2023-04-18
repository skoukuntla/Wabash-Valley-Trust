import { Button, TextField } from '@mui/material'
import '../styles/AdminPage.css'
import to from 'await-to-js'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

import { getRefreshToken } from 'api/auth'
import {
  addBuildings,
  getBuildings,
  removeBuilding,
  updateBuilding,
} from 'api/buildingsApi'
import mapImage from 'assets/map_clean.png'
import Map from 'components/Map'
import { logout as _logout, login } from 'store/thunks/authThunk'

import type store from 'store'

const AdminPage = () => {
  const dispatch = useDispatch<typeof store.dispatch>()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [usernameActive, setUsernameActive] = useState(false)
  const [passwordActive, setPasswordActive] = useState(false)
  const [loggedIn, setLoggedIn] = useState(false)
  const [requestError, setRequestError] = useState(false)

  // the data that gets passed to the Map
  const [locations, setLocations]: any = useState(null)
  // used to keep track of additions & deletions for JSON form
  // gets processed into locations in useEffect
  const [markersState, setMarkersState]: any = useState(null)
  const [errorMessage, setErrorMessage] = useState('')

  const addLocation = async (input: IBuilding) => {
    // console.log('add location input', input)
    const [err] = await to(addBuildings([input]))
    if (err) {
      console.log('add error', err)
    }

    fetchBuildings()
  }

  const updateLocation = async (_id: any, input: any) => {
    // console.log('update location', input)
    const [err] = await to(updateBuilding(_id, input))
    if (err) {
      console.log('update error', err)
    }

    fetchBuildings()
  }

  const deleteLocation = async (_id: any, input: any) => {
    // console.log('delete location', input)
    // console.log('markers', markersState)

    const [err] = await to(removeBuilding(_id))
    if (err) {
      console.log('delete error', err)
    }

    fetchBuildings()
  }

  const checkError = (input: string) => {
    if (input === 'username') {
      if (errorMessage === 'Incorrect login') {
        return true
      }

      if (usernameActive) {
        return username === ''
      }
    }

    if (input === 'password') {
      if (errorMessage === 'Incorrect login') {
        return true
      }
      if (passwordActive) {
        return password === ''
      }
    }
  }

  const handleUsername = (e: any) => {
    setUsername(e.target.value)
    setErrorMessage('')
    setUsernameActive(true)
  }

  const handlePassword = (e: any) => {
    setPassword(e.target.value)
    setErrorMessage('')
    setPasswordActive(true)
  }

  const logout = async () => {
    const [err] = await to(dispatch(_logout()).unwrap())
    if (err) console.log(err)
  }

  const logoutHandler = () => {
    setLoggedIn(false)
    logout()
    // console.log('logout')
  }

  const fetchBuildings = async () => {
    const [err, res] = await to(getBuildings())
    if (err) {
      if ((err as NodeJS.ErrnoException).code === 'ERR_NETWORK') {
        console.log('Network error')
      }

      setRequestError(true)
      console.log(err)
      return
    }
    const { buildings } = res.data
    setMarkersState(buildings)
    // console.log('received data', buildings)
  }

  // initially gets buildings & checks login
  useEffect(() => {
    const checkLogin = async () => {
      getRefreshToken().then((item) => {
        if (!item) {
          setLoggedIn(false)
        } else {
          setLoggedIn(true)
        }
      })
    }

    fetchBuildings()
    checkLogin()
  }, [])

  // updates locations whenever markersState changes (after new get requests)
  useEffect(() => {
    if (markersState === null) return

    // Takes buildings in JSON and converts to arrays to form markers (locations)
    // Must be run whenvers markers state changes
    const items = []
    for (let i = 0; i < markersState.length; i += 1) {
      const item = new Array<Object>()
      item.push(markersState[i].coords[0]) // 0
      item.push(markersState[i].coords[1]) // 1
      item.push(markersState[i].name) // 2
      item.push(markersState[i].address) // 3
      item.push(markersState[i].description) // 4
      item.push(markersState[i].img) // 5
      item.push(markersState[i].foundingYear) // 6
      item.push(markersState[i].archiStyle) // 7
      item.push(markersState[i].additionalLinks) // 8
      const linkNames = []
      for (let j = 0; j < markersState[i].additionalLinks.length; j += 1) {
        linkNames.push(new URL(markersState[i].additionalLinks[j]).hostname)
      }
      item.push(linkNames) // 9
      item.push(markersState[i]._id as string) // 10
      item.push(markersState[i].likes || 0) // 11
      items.push(item)
    }

    setLocations(items)
  }, [markersState])

  const loginHandler = async (e: any) => {
    e.preventDefault()
    setUsernameActive(true)
    setPasswordActive(true)

    if (username === '' || password === '') {
      setErrorMessage('Enter all login information')
      return
    }

    const req: IUserAuth = {
      email: username,
      password,
    }

    const [err] = await to(dispatch(login(req)).unwrap())

    if (err) {
      setErrorMessage('Incorrect login')
    } else {
      setLoggedIn(true)
      setUsername('')
      setPassword('')
      setUsernameActive(false)
      setPasswordActive(false)
    }
  }

  return (
    <div className="adminPage">
      {!requestError && !loggedIn && (
        <main className="loggedOut">
          <nav className="">
            <Link to="/" className="homeLink">
              Home
            </Link>
          </nav>
          <div className="container">
            <h1>Admin log in</h1>
            <form onSubmit={loginHandler}>
              <TextField
                className="field"
                error={checkError('username')}
                label="Username"
                onChange={handleUsername}
              />
              <TextField
                className="field"
                error={
                  passwordActive &&
                  (password === '' || errorMessage === 'Incorrect login')
                }
                label="Password"
                type="password"
                onChange={handlePassword}
              />
              <div className="errorMessage">{errorMessage}</div>
              <Button type="submit" variant="contained" className="loginButton">
                Log in
              </Button>
            </form>
          </div>
        </main>
      )}

      {!requestError && locations && loggedIn && (
        <main className="loggedIn">
          <nav>
            <Button
              type="button"
              onClick={logoutHandler}
              variant="contained"
              className="logoutButton"
            >
              Logout
            </Button>
          </nav>
          <Map
            image={mapImage}
            markers={locations}
            addLocation={addLocation}
            deleteLocation={deleteLocation}
            updateLocation={updateLocation}
          />
        </main>
      )}

      {requestError && (
        <div className="mainError">
          <h1>Couldn't connect to the server.</h1>
          <p>
            Try checking your internet connection. If the issue persists, check
            that the server is running properly
          </p>
        </div>
      )}
    </div>
  )
}

export default AdminPage
