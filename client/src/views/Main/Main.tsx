/* eslint-disable jsx-a11y/alt-text */
import { faUserGear as AdminIcon } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { FormControlLabel, Switch } from '@mui/material'
import to from 'await-to-js'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { getBuildings, getNeighborhoods } from 'api/buildingsApi'
import districtImage from 'assets/districts_clean.png'
import mapImage from 'assets/map_clean.png'
import Map from 'components/Map'
import Map2 from 'components/Map2'
import '../../styles/Main.css'

export default function Main() {
  const [showMap, setShowMap] = useState(false)
  const [items, setItems]: any = useState([]) // buildings
  const [items2, setItems2]: any = useState([]) // neighborhoods
  const [requestError, setRequestError] = useState(false)
  const navigate = useNavigate()

  const toggleMap = () => {
    setShowMap(!showMap)
  }

  useEffect(() => {
    const fetchBuildings = async () => {
      const [err, res] = await to(getBuildings())
      if (err) {
        if ((err as NodeJS.ErrnoException).code === 'ERR_NETWORK') {
          console.log('Network error')
        }

        setRequestError(true)
        console.log(err)
        return
      }
      const { buildings } = res.data

      const newItems = []
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
        newItems.push(item)
      }

      setItems(newItems)
    }
    const fetchNeighborhoods = async () => {
      const [err, res] = await to(getNeighborhoods())
      if (err) {
        console.log(err)
        return
      }
      const { buildings } = res.data

      const newItems = []
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
        newItems.push(item)
      }

      // console.log(newItems)
      setItems2(newItems)
    }

    fetchBuildings()
    fetchNeighborhoods()
  }, [])

  return (
    <main className="Main">
      {!requestError && (
        <nav>
          <div className="spacer" />
          <FormControlLabel
            control={<Switch checked={showMap} onChange={toggleMap} />}
            label="District Map"
            className="switch"
          />

          <div className="buttonContainer">
            {/* a button is used instead of Link because links are draggable */}
            <button
              type="button"
              onClick={() => navigate('/admin')}
              className="admin"
            >
              <FontAwesomeIcon icon={AdminIcon} className="adminIcon" />
            </button>
          </div>
        </nav>
      )}
      {!requestError && items2.length > 0 && showMap && (
        <Map2 image={districtImage} markers={items2} />
      )}
      {!requestError && items.length > 0 && !showMap && (
        <Map
          image={mapImage}
          markers={items}
          addLocation={null}
          deleteLocation={null}
          updateLocation={null}
        />
      )}

      {requestError && (
        <div className="mainError">
          <h1>Couldn't connect to the server.</h1>
          <p>
            Try checking your internet connection. If the issue persists, check
            that the server is running properly
          </p>
        </div>
      )}
    </main>
  )
}
