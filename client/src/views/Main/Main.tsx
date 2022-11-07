import { Box, Container, Typography } from '@mui/material'
import { Link } from 'react-router-dom'

import mapImage from '../../assets/tempmap.png'
import { markers } from '../../assets/tempmarkers'
import Map from '../../components/Map'

export default function Main() {
  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4">Main Page</Typography>
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
      </Box>
      <Map image={mapImage} markers={markers} />
    </Container>
  )
}
