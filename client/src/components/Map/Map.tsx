import { CRS } from 'leaflet'
import { useState } from 'react'
import { ImageOverlay, MapContainer } from 'react-leaflet'

import InfoModal from 'components/Building/InfoModal'

import Building from '../Building/Building'

type MapProps = {
  image: string
  markers: Array<Array<any>>
}

function Map({ image, markers }: MapProps) {
  const [currentText, setCurrentText] = useState('')
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  return (
    <div>
      <MapContainer
        style={{ height: '100vh' }}
        center={[380, 306]}
        zoom={1}
        crs={CRS.Simple}
        maxZoom={4}
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
            marker={marker}
            setCurrentText={setCurrentText}
            handleOpen={handleOpen}
          />
        ))}
      </MapContainer>
      <InfoModal text={currentText} open={open} handleClose={handleClose} />
    </div>
  )
}

export default Map