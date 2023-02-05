import L from 'leaflet'
import ReactDOMServer from 'react-dom/server'
import { Marker } from 'react-leaflet'

import pin from '../../assets/pin.ico'
import '../../styles/Building.css'

type BuildingProps = {
  marker: any[]
  name: React.Dispatch<React.SetStateAction<string>>
  address: React.Dispatch<React.SetStateAction<string>>
  description: React.Dispatch<React.SetStateAction<string>>
  handleOpen: () => void
}

const Building = ({
  marker,
  name,
  address,
  description,
  handleOpen,
}: BuildingProps) => (
  <Marker
    position={[marker[0], marker[1]]}
    icon={L.divIcon({
      className: 'custom icon',
      html: ReactDOMServer.renderToString(
        <img
          className="pin"
          alt="pin"
          src={pin}
          style={{ height: '50px', width: 'auto' }}
        />
      ),
    })}
    eventHandlers={{
      click: () => {
        name(marker[2])
        address(marker[3])
        description(marker[4])
        handleOpen()
      },
    }}
  />
)

export default Building
