import { Button, TextField } from '@mui/material'
import '../styles/AdminPage.css'
import { useEffect, useState } from 'react'

import { markers } from 'assets/markers'
import Map from 'components/Map'

const AdminPage = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loggedIn, setLoggedIn] = useState(false)
  const [locations, setLocations]: any = useState(null)
  const [markersState, setMarkersState]: any = useState(null)
  const [errorMessage, setErrorMessage] = useState('')
  const [usernameActive, setUsernameActive] = useState(false)
  const [passwordActive, setPasswordActive] = useState(false)

  const addLocation = (input: any) => {
    console.log('add location input', input)

    setMarkersState(markersState.concat(input))
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

  useEffect(() => {
    setMarkersState(markers)
    const login = sessionStorage.getItem('session-htf-wab-login')
    console.log('log in', login)
    if (login === 'true') {
      setLoggedIn(true)
    }
  }, [])

  useEffect(() => {
    if (markersState === null) return

    console.log('new markers', markersState)

    const items = []
    for (let i = 0; i < markersState.length; i += 1) {
      const item = new Array<Object>()
      item.push(markersState[i].coords[0])
      item.push(markersState[i].coords[1])
      item.push(markersState[i].name)
      item.push(markersState[i].address)
      item.push(markersState[i].description)
      item.push(markersState[i].img)
      item.push(markersState[i].foundingYear)
      item.push(markersState[i].archiStyle)
      item.push(markersState[i].additionalLinks)
      const linkNames = []
      for (let j = 0; j < markersState[i].additionalLinks.length; j += 1) {
        linkNames.push(new URL(markersState[i].additionalLinks[j]).hostname)
      }
      item.push(linkNames)
      items.push(item)
    }

    setLocations(items)
    console.log('markers', markersState)
  }, [markersState])

  const loginHandler = (e: any) => {
    e.preventDefault()
    setUsernameActive(true)
    setPasswordActive(true)

    console.log('submission:', username, '||', password)

    if (username === '' || password === '') {
      setErrorMessage('Enter all login information')
      return
    }

    if (username === 'username' && password === 'htfpass') {
      setLoggedIn(true)
      sessionStorage.setItem('session-htf-wab-login', 'true')
      setUsername('')
      setPassword('')
    } else {
      setErrorMessage('Incorrect login')
    }
  }

  return (
    <div className="adminPage">
      <main>
        {!loggedIn && (
          <div className="container">
            <h1>Admin log in</h1>
            <form onSubmit={loginHandler}>
              <TextField
                className="field"
                error={checkError('username')}
                label="Username"
                onChange={handleUsername}
                size="small"
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
                // size="small"
              />
              <div className="errorMessage">{errorMessage}</div>
              <Button type="submit" variant="contained" className="loginButton">
                Log in
              </Button>
            </form>
          </div>
        )}

        {locations && loggedIn && (
          <>
            <nav>
              <Button type="button" onClick={logout} variant="contained">
                Logout
              </Button>
            </nav>
            <Map
              image="/assets/map.png"
              markers={locations}
              addLocation={addLocation}
            />
          </>
        )}
      </main>
    </div>
  )
}

export default AdminPage
