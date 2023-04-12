/* eslint-disable jsx-a11y/alt-text */
import { faUserGear as AdminIcon } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { FormControlLabel, FormGroup, Grid, Switch } from '@mui/material'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import districtImage from 'assets/districts.png'
import mapImage from 'assets/map.png'
import { markers, markers2 } from 'assets/markers'
import Map from 'components/Map'
import Map2 from 'components/Map2'
import '../../styles/Main.css'

export default function Main() {
  const [showMap, setShowMap] = useState(false)
  const navigate = useNavigate()

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

  const items2 = []
  for (let i = 0; i < markers2.length; i += 1) {
    const item = new Array<Object>()
    item.push(markers2[i].coords[0])
    item.push(markers2[i].coords[1])
    item.push(markers2[i].name)
    item.push(markers2[i].address)
    item.push(markers2[i].description)
    item.push(markers2[i].img)
    item.push(markers2[i].foundingYear)
    item.push(markers2[i].archiStyle)
    item.push(markers2[i].additionalLinks)
    const linkNames = []
    for (let j = 0; j < markers2[i].additionalLinks.length; j += 1) {
      linkNames.push(new URL(markers[i].additionalLinks[j]).hostname)
    }
    item.push(linkNames)
    items2.push(item)
  }

  return (
    <Grid container justifyContent="center" className="Main">
      <nav>
        <div className="spacer" />
        <FormControlLabel
          control={<Switch checked={showMap} onChange={toggleMap} />}
          label="District Map"
          className="switch"
        />

        <div className="buttonContainer">
          <button
            type="button"
            onClick={() => navigate('/admin')}
            className="admin"
          >
            <FontAwesomeIcon icon={AdminIcon} className="adminIcon" />
          </button>
        </div>
      </nav>
      {showMap && <Map2 image={districtImage} markers={items2} />}
      {!showMap && (
        <Map
          image={mapImage}
          markers={items}
          addLocation={null}
          deleteLocation={null}
        />
      )}
    </Grid>
  )
}
