import L from 'leaflet'
import ReactDOMServer from 'react-dom/server'
import { Marker } from 'react-leaflet'

import pin from '../../assets/pin.jpg'
import '../../styles/Building.css'

type BuildingProps = {
  marker: any[]
  setCurrentText: React.Dispatch<React.SetStateAction<string>>
  handleOpen: () => void
}

const Building = ({ marker, setCurrentText, handleOpen }: BuildingProps) => (
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
        setCurrentText(marker[2])
        handleOpen()
      },
    }}
  />
)

export default Building
