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
  img: React.Dispatch<React.SetStateAction<string>>
  year: React.Dispatch<React.SetStateAction<number>>
  style: React.Dispatch<React.SetStateAction<string>>
  links: React.Dispatch<React.SetStateAction<string[]>>
  linkNames: React.Dispatch<React.SetStateAction<string[]>>
  visible: any
  handleOpen: () => void
}

const Building = ({
  marker,
  name,
  address,
  description,
  img,
  year,
  style,
  links,
  linkNames,
  handleOpen,
  visible,
}: BuildingProps) => (
  <Marker
    opacity={visible}
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
        img(marker[5])
        year(marker[6])
        style(marker[7])
        links(marker[8])
        linkNames(marker[9])
        handleOpen()
      },
    }}
  />
)
export default Building
