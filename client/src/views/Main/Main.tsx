/* eslint-disable jsx-a11y/alt-text */
import { Container } from '@mui/material'

import { markers } from 'assets/markers'
import mapImage from 'assets/tempmap.png'
import Map from 'components/Map'

export default function Main() {
  const items = []
  for (let i = 0; i < markers.length; i += 1) {
    const item = new Array<Object>()
    item.push(50 + i * 10)
    item.push(50 + i * 10)
    item.push(markers[i].name)
    item.push(markers[i].description)
    items.push(item)
  }
  return (
    <Container>
      {/* <Typography variant="h4">Main Page</Typography>
      <Typography variant="body1">
        Welcome! Feel free to check out all the demos here!
      </Typography>
      <Box sx={{ mt: 4 }}>
        <Typography variant="h6">Demos</Typography>
        <ul>
          <li>
            <Link to="/axios">Axios</Link>
          </li>
          <li>
            <Link to="/redux">Redux</Link>
          </li>
          <li>
            <Link to="/auth">Auth</Link>
          </li>
        </ul>
      </Box> */}
      <Map image={mapImage} markers={items} />
    </Container>
  )
}
