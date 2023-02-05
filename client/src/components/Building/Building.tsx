import L from 'leaflet'
import ReactDOMServer from 'react-dom/server'
import { Marker } from 'react-leaflet'

import pin from '../../assets/pin.ico'
import '../../styles/Building.css'

type BuildingProps = {
  marker: any[]
  setCurrentText: React.Dispatch<React.SetStateAction<string>>
  handleOpen: () => void
}

const Building = ({
  marker: markerData,
  setCurrentText,
  handleOpen,
}: BuildingProps) => (
  <Marker
    position={[markerData[0], markerData[1]]}
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
        setCurrentText(markerData[2])
        handleOpen()
      },
    }}
  />
)

export default Building
