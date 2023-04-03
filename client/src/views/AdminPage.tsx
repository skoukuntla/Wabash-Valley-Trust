import { Container, Grid, Slider } from '@mui/material'
import { useEffect, useState } from 'react'

import '../styles/AdminPage.css'
import { markers } from 'assets/markers'
import Map from 'components/Map'

const AdminPage = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loggedIn, setLoggedIn] = useState(false)
  const [locations, setLocations]: any = useState(null)
  const [markersState, setMarkersState]: any = useState(null)

  const addLocation = (input: any) => {
    console.log('add location input', input)

    setMarkersState(markersState.concat(input))
  }

  useEffect(() => {
    setMarkersState(markers)
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

  const submitHandler = (e: any) => {
    e.preventDefault()
    console.log('submission:', username, '||', password)

    if (username === 'username' && password === 'password') setLoggedIn(true)
  }

  return (
    <div className="adminPage">
      <main>
        {!loggedIn && (
          <div>
            <p>hello there</p>
            <form onSubmit={submitHandler}>
              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="username"
                className="field"
              />
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="password"
                className="field"
              />
              <button type="submit">Log in</button>
            </form>
          </div>
        )}

        {locations && loggedIn && (
          <Map
            image="/assets/map.png"
            markers={locations}
            addLocation={addLocation}
          />
        )}
      </main>
    </div>
  )
}

export default AdminPage
