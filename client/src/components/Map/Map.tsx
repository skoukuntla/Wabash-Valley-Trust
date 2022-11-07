import { CRS } from 'leaflet'
import { ImageOverlay, MapContainer, Marker, Popup } from 'react-leaflet'

import type { FC } from 'react'

type MapProps = {
  image: string
}

const Map: FC<MapProps> = ({ image }) => (
  <div>
    <MapContainer
      style={{ height: '500px' }}
      center={[500, 500]}
      zoom={2}
      crs={CRS.Simple}
    >
      <ImageOverlay
        url={image}
        bounds={[
          [0, 0],
          [1000, 1000],
        ]}
        zIndex={10}
      />
      <Marker position={[600, 600]}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </MapContainer>
  </div>
)

export default Map
