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
    <Grid container justifyContent="center">
      <FormGroup>
        <FormControlLabel
          control={<Switch checked={showMap} onChange={toggleMap} />}
          label="District Map"
        />
      </FormGroup>
      {showMap && <Map image={districtImage} markers={items} />}
      {!showMap && <Map image={mapImage} markers={items} />}
    </Grid>
  )
}
