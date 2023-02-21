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
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

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
    <div>
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
    </div>
  )
}

export { Map }
export type { RouteData }
