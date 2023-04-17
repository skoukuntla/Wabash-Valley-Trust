import { Button, TextField } from '@mui/material'
import '../styles/AdminPage.css'
import to from 'await-to-js'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

import { addBuildings, getBuildings, updateBuilding } from 'api/buildingsApi'
import Map from 'components/Map'
import { login } from 'store/thunks/authThunk'

import type store from 'store'

const AdminPage = () => {
  const dispatch = useDispatch<typeof store.dispatch>()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [usernameActive, setUsernameActive] = useState(false)
  const [passwordActive, setPasswordActive] = useState(false)
  const [loggedIn, setLoggedIn] = useState(false)

  // the data that gets passed to the Map
  const [locations, setLocations]: any = useState(null)
  // used to keep track of additions & deletions for JSON form
  // gets processed into locations in useEffect
  const [markersState, setMarkersState]: any = useState(null)
  const [errorMessage, setErrorMessage] = useState('')

  const addLocationLocally = async (input: IBuilding) => {
    console.log('add location input', input)
    const [err] = await to(addBuildings([input]))
    if (err) console.log(err)

    fetchBuildings()
  }

  const updateLocationLocally = async (_id: any, input: any) => {
    console.log('update location', input)
    const [err] = await to(updateBuilding(_id, input))
    if (err) console.log(err)

    fetchBuildings()
  }

  const deleteLocationLocally = async (input: any) => {
    console.log('delete location', input)
    console.log('markers', markersState)

    // const updatedMarkers = markersState.filter(
    //   (item: any) => item.name !== input
    // )
    // setMarkersState(updatedMarkers)
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

  const logout = () => {
    setLoggedIn(false)
    sessionStorage.removeItem('session-htf-wab-login')
  }

  const fetchBuildings = async () => {
    const [err, res] = await to(getBuildings())
    if (err) {
      console.log(err)
      return
    }
    const { buildings } = res.data
    setMarkersState(buildings)

    console.log('received data', buildings)
  }

  // runs on initial render
  useEffect(() => {
    // TODO change this to checking for auth token cause this is super insecure
    const islogin = sessionStorage.getItem('session-htf-wab-login')
    console.log('log in', islogin)
    if (islogin === 'true') {
      setLoggedIn(true)
    }

    console.log('attempt')
    // console.log('mongo buildings', getBuildings())
  }, [])

  // initially gets buildings & updates locations
  useEffect(() => {
    fetchBuildings()
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

    console.log('submission:', username, '||', password)

    if (username === '' || password === '') {
      setErrorMessage('Enter all login information')
      return
    }

    if (username === 'username' && password === 'htfpass') {
      const req: IUserAuth = {
        email: username,
        password,
      }
      // const [err] = await to(dispatch(register(req)).unwrap())
      // if (err) {
      const [err] = await to(dispatch(login(req)).unwrap())

      if (err) {
        console.log(err)
        return
      }
      // }

      setLoggedIn(true)
      sessionStorage.setItem('session-htf-wab-login', 'true')
      setUsername('')
      setPassword('')
      setUsernameActive(false)
      setPasswordActive(false)
    } else {
      setErrorMessage('Incorrect login')
    }
  }

  return (
    <div className="adminPage">
      {!loggedIn && (
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

      {locations && loggedIn && (
        <main className="loggedIn">
          <nav>
            <Button
              type="button"
              onClick={logout}
              variant="contained"
              className="logoutButton"
            >
              Logout
            </Button>
          </nav>
          <Map
            image="/assets/map_clean.png"
            markers={locations}
            addLocationLocally={addLocationLocally}
            deleteLocationLocally={deleteLocationLocally}
            updateLocationLocally={updateLocationLocally}
          />
        </main>
      )}
    </div>
  )
}

export default AdminPage
