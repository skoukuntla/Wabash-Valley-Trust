import { CRS } from 'leaflet'
import { ImageOverlay, MapContainer, Marker, Popup } from 'react-leaflet'

import type { FC } from 'react'

type MapProps = {
  image: string
  markers: Array<Array<any>>
}

const Map: FC<MapProps> = ({ image, markers }) => (
  <div>
    <MapContainer
      style={{ height: '500px' }}
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
        <Marker position={[marker[0], marker[1]]}>
          <Popup>{marker[2]}</Popup>
        </Marker>
      ))}
    </MapContainer>
  </div>
)

export default Map
