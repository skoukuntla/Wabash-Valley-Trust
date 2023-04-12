import { Grid, Slider } from '@mui/material'
import { CRS } from 'leaflet'
import { useEffect, useState } from 'react'
import { ImageOverlay, MapContainer, useMapEvents } from 'react-leaflet'

import InfoModal from 'components/Building/InfoModal'

import MapRoute from './MapRoute'
import Building from '../Building/Building'

import type { LatLngExpression } from 'leaflet'

interface RouteData {
  name: string
  color: string
  lines: Array<Array<LatLngExpression>>
}

type MapProps = {
  image: string
  markers: Array<Array<any>>
  addLocation: any
}

type MapEventsProps = {
  addLocation: Function
}

function Map({ image, markers, addLocation }: MapProps) {
  const [routes, setRoutes] = useState<Array<RouteData>>([])
  const [currentRoute, setCurrentRoute] = useState<number>(0)
  // const [currentText, setCurrentText] = useState('')
  const [name, setName] = useState('')
  const [address, setAddress] = useState('')
  const [desc, setDesc] = useState('')
  const [img, setImg] = useState('')
  const [year, setYear] = useState(0)
  const [archStyle, setArchStyle] = useState('')
  const [links, setLinks] = useState([''])
  const [linkNames, setLinkNames] = useState([''])
  const [open, setOpen] = useState(false)
  const [timeLine, setTimeLine] = useState('')
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  if (timeLine === '') {
    setTimeLine('1930')
  }
  useEffect(() => {
    const gatherAssets = async () => {
      const res = await fetch('routes.json')
      const data = await res.text()
      const obj = JSON.parse(data)
      setRoutes(obj)
    }

    gatherAssets()
  }, [])
  return (
    <Grid container justifyContent="center" marginTop="2vh">
      <Slider
        aria-label="Restricted values"
        onChange={async (e, val) => {
          const target = e.target as HTMLTextAreaElement
          setTimeLine(target.value)
        }}
        defaultValue={1930}
        step={10}
        valueLabelDisplay="on"
        marks
        max={1930}
        min={1820}
        sx={{
          width: 500,
          color: 'Brown',
          '& .MuiSlider-thumb': {
            width: 20,
            height: 20,
            backgroundColor: 'currentColor',
            borderRadius: '0',
            shapeRendering: 'geometricPrecision',
            borderTop: '10px solid transparent',
            borderRight: '8px solid currentColor',
            borderBottom: '8px solid transparent',
            borderLeft: '8px solid transparent',
            marginBottom: '0px',
            marginLeft: '0px',
          },
          '& .MuiSlider-valueLabel': {
            transform: 'none',
            marginTop: '10px',
          },
          '& .MuiSlider-mark': {
            borderRadius: '50%',
            width: 8,
            height: 8,
          },
        }}
      />
      <MapContainer
        style={{ height: '100vh', width: '100vw' }}
        center={[380, 306]}
        zoom={1}
        crs={CRS.Simple}
        maxZoom={4}
        minZoom={1}
        maxBoundsViscosity={1}
        maxBounds={[
          [0, 0],
          [628, 1024],
        ]}
      >
        <ImageOverlay
          url={image}
          bounds={[
            [0, 0],
            [628, 1024],
          ]}
          zIndex={10}
        />
        {markers.map((marker) => {
          if (marker[6] <= parseInt(timeLine)) {
            return (
              <Building
                marker={marker}
                name={setName}
                address={setAddress}
                description={setDesc}
                img={setImg}
                year={setYear}
                style={setArchStyle}
                links={setLinks}
                linkNames={setLinkNames}
                handleOpen={handleOpen}
              />
            )
          }
          // eslint-disable-next-line react/jsx-no-useless-fragment
          return <></>
        })}
        <MapRoute currentRoute={currentRoute} routes={routes} />
        {window.location.href.includes('admin') && (
          <MapEvents addLocation={addLocation} />
        )}
      </MapContainer>
      <InfoModal
        name={name}
        address={address}
        description={desc}
        img={img}
        year={year}
        style={archStyle}
        links={links}
        linkNames={linkNames}
        open={open}
        handleClose={handleClose}
      />
    </Grid>
  )
}

// used for click event that gets coordinates
const MapEvents = ({ addLocation }: MapEventsProps) => {
  useMapEvents({
    click(e) {
      // setState your coords here
      // coords exist in "e.latlng.lat" and "e.latlng.lng"
      console.log(e.latlng.lat + 20)
      console.log(e.latlng.lng - 10)

      // TODO change
      console.log(window.location.href.includes('admin'))
      addLocation({
        coords: [e.latlng.lat, e.latlng.lng],
        name: 'NAME',
        address: 'here',
        foundingYear: '1930',
        archiStyle: 'sand',
        description: 'freshmen housing',
        img: 'https://www.yummymummykitchen.com/wp-content/uploads/2022/12/long-hair-cow-1.jpg',
        additionalLinks: ['https://google.com', 'https://bing.com'],
        locationType: 'dorm',
      })
    },
  })
  return <div />
}

export { Map }
export type { RouteData }
