/* eslint-disable jsx-a11y/alt-text */
import { Container, Grid, Slider } from '@mui/material'

import mapImage from 'assets/tempmap.png'
import { markers } from 'assets/tempmarkers'
import Map from 'components/Map'

const marks = [
  { value: 0, label: '0' },
  { value: 10, label: '10' },
  { value: 20, label: '20' },
  { value: 30, label: '30' },
  { value: 40, label: '40' },
  { value: 50, label: '50' },
]

export default function Main() {
  return (
    <Container>
      <Grid container justifyContent="center">
        <Slider
          aria-label="Restricted values"
          defaultValue={20}
          step={null}
          valueLabelDisplay="auto"
          marks={marks}
          max={50}
          min={0}
          sx={{
            width: 300,
            color: 'success.main',
            '& .MuiSlider-thumb': {
              width: 20,
              height: 20,
              backgroundColor: 'currentColor',
              borderRadius: '0',
              transform: 'rotate(45deg)',
              shapeRendering: 'geometricPrecision',
              borderTop: '10px solid transparent',
              borderRight: '8px solid currentColor',
              borderBottom: '8px solid transparent',
              borderLeft: '8px solid transparent',
              marginBottom: '-30px',
              marginleft: '-50px',

              marginRight: '-10px',
              marginLeft: '-20px',
            },
            '& .MuiSlider-valueLabel': {
              transform: 'rotate(-45deg)',
              marginBottom: '-30px',
              marginTop: '-20px',
            },
            '& .MuiSlider-mark': {
              borderRadius: '50%',
              width: 8,
              height: 8,
            },
          }}
        />

        <Map image={mapImage} markers={markers} />
      </Grid>
    </Container>
  )
}
