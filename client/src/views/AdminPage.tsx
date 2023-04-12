import { Button, TextField } from '@mui/material'
import '../styles/AdminPage.css'
import to from 'await-to-js'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

import { addBuildings, getBuildings } from 'api/buildingsApi'
import { markers } from 'assets/markers'
import Map from 'components/Map'
import { login, register } from 'store/thunks/authThunk'

import type store from 'store'

const AdminPage = () => {
  const dispatch = useDispatch<typeof store.dispatch>()
  const [username, setUsername] = useState('a')
  const [password, setPassword] = useState('a')
  const [loggedIn, setLoggedIn] = useState(false)
  const [locations, setLocations]: any = useState(null)
  const [markersState, setMarkersState]: any = useState(null)

  const addLocation = async (input: IBuilding) => {
    console.log('add location input', input)
    const [err, res] = await to(addBuildings([input]))
    if (err) console.log(err)

    setMarkersState(markersState.concat(input))
  }

  const logout = () => {
    setLoggedIn(false)
    sessionStorage.removeItem('session-htf-wab-login')
  }

  useEffect(() => {
    setMarkersState(markers)
    const islogin = sessionStorage.getItem('session-htf-wab-login')
    console.log('log in', islogin)
    if (islogin === 'true') {
      setLoggedIn(true)
    }
  }, [])

  useEffect(() => {
    const fetchBuildings = async () => {
      const [err, res] = await to(getBuildings())
      if (err) {
        console.log(err)
        return
      }
      const { buildings } = res.data

      const items = []
      for (let i = 0; i < buildings.length; i += 1) {
        const item = new Array<Object>()
        item.push(buildings[i].coords[0]) // 0
        item.push(buildings[i].coords[1]) // 1
        item.push(buildings[i].name) // 2
        item.push(buildings[i].address) // 3
        item.push(buildings[i].description) // 4
        item.push(buildings[i].img) // 5
        item.push(buildings[i].foundingYear) // 6
        item.push(buildings[i].archiStyle) // 7
        item.push(buildings[i].additionalLinks) // 8
        const linkNames = []
        for (let j = 0; j < buildings[i].additionalLinks.length; j += 1) {
          linkNames.push(new URL(buildings[i].additionalLinks[j]).hostname)
        }
        item.push(linkNames) // 9
        item.push(buildings[i]._id as string) // 10
        item.push(buildings[i].likes || 0) // 11
        items.push(item)
      }

      setLocations(items)
      console.log(buildings)
    }

    fetchBuildings()
  }, [markersState])

  const loginHandler = async (e: any) => {
    e.preventDefault()
    console.log('submission:', username, '||', password)

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
                error={username === ''}
                label="Username"
                onChange={(e) => setUsername(e.target.value)}
                size="small"
              />
              <TextField
                className="field"
                error={password === ''}
                label="Password"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                // size="small"
              />
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
