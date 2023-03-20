import { Container, Grid, Slider } from '@mui/material'
import { useEffect, useState } from 'react'

import '../styles/AdminPage.css'
import { markers } from 'assets/markers'
import Map from 'components/Map'

const AdminPage = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [locations, setLocations]: any = useState(null)

  useEffect(() => {
    const items = []
    for (let i = 0; i < markers.length; i += 1) {
      const item = new Array<Object>()
      item.push(markers[i].coords[0])
      item.push(markers[i].coords[1])
      item.push(markers[i].name)
      item.push(markers[i].address)
      item.push(markers[i].description)
      item.push(markers[i].img)
      item.push(markers[i].foundingYear)
      item.push(markers[i].archiStyle)
      item.push(markers[i].additionalLinks)
      const linkNames = []
      for (let j = 0; j < markers[i].additionalLinks.length; j += 1) {
        linkNames.push(new URL(markers[i].additionalLinks[j]).hostname)
      }
      item.push(linkNames)
      items.push(item)
    }

    setLocations(items)
  }, [])

  const submitHandler = (e: any) => {
    e.preventDefault()
    console.log('submission:', username, '||', password)
  }

  return (
    <div className="adminPage">
      <main>
        <p>hello there</p>
        <form onSubmit={submitHandler}>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="username"
          />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="password"
          />
          <button type="submit">Log in</button>
        </form>

        {locations && <Map image="/assets/map.png" markers={locations} />}
      </main>
    </div>
  )
}

export default AdminPage
