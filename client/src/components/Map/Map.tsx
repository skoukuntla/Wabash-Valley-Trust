import { Container, Grid, Slider } from '@mui/material'
import { style } from '@mui/system'
import { CRS } from 'leaflet'
import { useEffect, useState } from 'react'
import { ImageOverlay, MapContainer } from 'react-leaflet'

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
}
function Map({ image, markers }: MapProps) {
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
          await setTimeLine(target.value)
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
        style={{ height: '93vh', width: '100vw' }}
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
        {markers.map((marker) => (
          <Building
            key={marker[3]}
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
            visible={marker[7] > parseInt(timeLine)}
          />
        ))}
        <MapRoute currentRoute={currentRoute} routes={routes} />
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

export { Map }
export type { RouteData }
