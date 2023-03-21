/* eslint-disable jsx-a11y/alt-text */

import {
  Container,
  FormControlLabel,
  FormGroup,
  Grid,
  Slider,
  Switch,
} from '@mui/material'
import React, { useState } from 'react'

import districtImage from 'assets/districts.png'
import mapImage from 'assets/map.png'
import { markers } from 'assets/markers'
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
  const [showMap, setShowMap] = useState(false)

  const toggleMap = () => {
    setShowMap(!showMap)
  }

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

  return (
    <Container>
      <Grid container justifyContent="center">
        <FormGroup>
          <FormControlLabel
            control={<Switch checked={showMap} onChange={toggleMap} />}
            label="District Map"
          />
        </FormGroup>

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

        {showMap && <Map image={districtImage} markers={items} />}
        {!showMap && <Map image={mapImage} markers={items} />}
      </Grid>
    </Container>
  )
}
